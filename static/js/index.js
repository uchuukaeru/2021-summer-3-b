function login() {
  alert("login!!");
  showPanel(1);
}
function showPanel(id) {
  switch (id) {
    case 0:
      $("#home-page").fadeOut(100);
      $("#login-page").delay(100).fadeIn(100);
      break;
    case 1:
      $("#login-page").fadeOut(100);
      $("#home-page").delay(100).fadeIn(100);
      break;
  }
}
