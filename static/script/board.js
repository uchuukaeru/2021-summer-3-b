"use strict";
/*
HTMLで呼び出し使うscriptファイル
<div id=board></div>:このdivエリアにコメントが表示される

<div class=writebox>
    名前：<input type=text id=inp_name><br>コメント<br>
    <textarea id=inp_body></textarea><br>
    <button id="write">書き込む</button>
</div>
:このdivでコメントを書き込む

*/

import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js"; //もしかしたら動かないかも。その場合はurlからデータをコピーして使う

const enc = (s) => {
  s = s.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/\n/g, "<br>");
  s = s.replace(/"/g, "&quot");
  s = s.replace(/'/g, "&#39");
  return s;
};

async function add_board() {
  console.log("call add-board");
  const item = {
    name: document.getElementById("inp_name").value,
    body: document.getElementById("inp_body").value,
    date: new Date().toString(),
  };
  console.log(item);
  if (await fetchJSON("api/add", item) == "ok") {
    window.location.reload();
  }
}

async function load_board() {
  console.log("call load_board");
  //const api_url="api/blist?"+item.toString();
  //console.log("api/blist",item);
  //const data=await fetchJSON("api/blist",item);
  const data = await fetchJSON("api/list");
  for (const d of data) {
    const div = document.createElement("div");
    div.className = "bbsitem-board";
    div.innerHTML = `<span class=date>${
      enc(d.date)
    }</span><hr><div class="comment-content"><p class=name>name : ${
      enc(d.name)
    }</p><p class=comment>comment : ${enc(d.body)}</p><hr size="5"></div>`;
    board.appendChild(div);
  }
}
