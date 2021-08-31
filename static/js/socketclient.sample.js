import { ws } from './socket.js';

let name = "anonymous"

nameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    name = nameForm.nickname.value

    nameForm.classList.add("hidden")
    chatroom.classList.remove("hidden")
})

// チャットを送信
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const msg = chatForm.msg.value

    const sessionId = localStorage.getItem("session_id") || ""
    ws.send(JSON.stringify({
        event: "message",
        data: {
            message: msg,
            name: name,
        }
    }))
    chatForm.reset()
})

const outputMessage = ({ data }) => {
    console.log(data)
    const { name, message } = JSON.parse(data)

    const template = `
    <li>
        <div class="name">${name}</div>
        <div class="msg">${message}</div>
    </li>
    `

    chatList.innerHTML += template
}

ws.addEventListener("message", outputMessage)
