document.addEventListener("DOMContentLoaded", async function() {
  try {
    let result = await checkAuthenticated(true, false);
    if (result.err) {
      throw result.err;
    }
    const response = await fetch('http://localhost:8080/api/users/auth/' + window.user.id);
    const userData = await response.json();
    const userName = userData.name;

    document.getElementById('user').textContent = 'Username: ' + window.user.name;
    document.getElementById('signin-btn').style.display = 'none';
    document.getElementById('profile-btn').style.display = 'block';

    localStorage.setItem("userId", window.user.id);
    console.log(localStorage.getItem("userId"));
  } catch (err) {
    console.log(err);
    // alert("Something went wrong!")
  }
});

async function logout() {
  try {
    let result = await requestLogout();
    if (!result.successful || result.err)
      throw result.err || { err: "Not successful" };
    window.location.pathname = "index.html";
  } catch (err) {
    console.log(err);
    // alert("Something is not working");
  }
}


