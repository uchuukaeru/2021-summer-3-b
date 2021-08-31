const host = `ws://localhost:8002/ws`;
const ws = new WebSocket(host);

const nameForm = document.querySelector(".name-form");
const chatroom = document.querySelector(".chatroom");
const chatList = document.querySelector(".chat-list");
const chatForm = document.querySelector(".chat-form");

// name
let nickname = "anonymous";

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  name = nameForm.nickname.value;

  nameForm.classList.add("hidden");
  chatroom.classList.remove("hidden");
});

// チャットを送信
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = chatForm.msg.value;

  const sessionId = localStorage.getItem("session_id") || "";
  ws.send(
    JSON.stringify({
      event: "message",
      data: {
        message: msg,
        name: name,
      },
    })
  );
  chatForm.reset();
});

const outputMessage = ({ data }) => {
  console.log(data);
  const { name, message } = JSON.parse(data);

  const template = `
    <li>
        <div class="name">${name}</div>
        <div class="msg">${message}</div>
    </li>
    `;

  chatList.innerHTML += template;
};

ws.addEventListener("message", outputMessage);
