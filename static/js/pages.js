const host = `ws://localhost:8002/ws`
const ws = new WebSocket(host)

//　ここにページを書き足していく。
const pages = [
  {
      pagename:"login-page",
      element: document.querySelector("#login-page")
  },
  {
      pagename:"main-page",
      element: document.querySelector("#main-page")
  },
]

/**
 * 行きたいページ以外を非表示
 * 例 login-page -> main-page
 * toggleHidden("main-page")
 * @param {string} pageName
 */
const changePage = (pageName) => {
    pages.forEach(({pagename, element}) => {
        if (pagename === pageName) {
            element.classList.remove("hidden")
        }
        if (!element.className.includes("hidden")) {
            element.classList.add('hidden')
        }
    })
}

export {
    changePage,
    ws
}