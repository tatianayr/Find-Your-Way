
window.onload = async function () {
    try {
      let result = await checkAuthenticated(true);
      if (result.err) {  
        throw result.err;
      }
      window.user = user;
      document.getElementById("signin-btn").style.display = "none";
      document.getElementById("profile-btn").style.display = "block";
    } catch (err) {
      console.log(err);
      // alert("Something went wrong!")
    }

    document.getElementById("logoutLink").addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default hyperlink behavior
      logout(); // Call the logout function when the link is clicked
    });
  };
async function logout() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
      let result = await requestLogout();
      if (!result.successful || result.err)
        throw result.err || { err: "Not successful" };
      window.location.pathname = "public/index.html";
    } catch (err) {
      console.log(err);
      // alert("Something is not working");
    }
  }

  document.getElementById("logoutLink").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default hyperlink behavior
    logout(); // Call the logout function when the link is clicked
  });
