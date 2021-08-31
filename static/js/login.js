import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
import { changePage } from "./pages.js"
import {
  login,
} from './services/services.js'

const loginPage = () => {
  const loginPage = document.querySelector("#login-page")

  const loginForm = document.createElement("form")
  loginForm.classList.add("login-form")

  const idInput = document.createElement("input")
  idInput.setAttribute("type", "text")
  idInput.setAttribute("name", "id")
  idInput.setAttribute("placeholder", "IDを入力")
  idInput.setAttribute("required", "required")

  const passInput = document.createElement("input")
  passInput.setAttribute("type", "password")
  passInput.setAttribute("name", "pass")
  passInput.setAttribute("placeholder", "passを入力")
  passInput.setAttribute("required", "required")

  const submitBtn = document.createElement("button")
  submitBtn.innerHTML = "送信"

  const loginFormWrapper = document.createElement("div")
  loginFormWrapper.setAttribute("id", "login-form-wrapper")

  loginForm.appendChild(idInput)
  loginForm.appendChild(passInput)
  loginForm.appendChild(submitBtn)

  loginFormWrapper.appendChild(loginForm)
  loginPage.appendChild(loginFormWrapper)

  submitBtn.onclick = async (e) => {
    e.preventDefault()

    const id = loginForm.id.value
    const password = loginForm.pass.value

    await login(id, password)

    changePage("main-page")
  }
}

export { loginPage }