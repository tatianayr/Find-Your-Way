async function login() {
  let msgDOM = document.getElementById("msg");
  msgDOM.textContent = "";
  try {
    let name = document.getElementById("name").value;
    let pass = document.getElementById("password").value;
    let result = await requestLogin(name, pass);
    if (result.err) {
      msgDOM.textContent = "An error occurred";
    } else if (!result.successful) {
      msgDOM.textContent = "Wrong username or password";
    } else {
      msgDOM.textContent = "Login successful!";
      // Update the navigation bar state after successful login
      document.getElementById("signin-btn").style.display = "none";
      document.getElementById("profile-btn").style.display = "block";

      // Redirect to the desired page
      window.location.href = "perfil.html";
    }
  } catch (err) {
    console.log(err);
    msgDOM.textContent = "An error occurred";
  }
}


  