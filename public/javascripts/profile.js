
window.onload = async function () {
    try {
      let result = await checkAuthenticated(true, false);
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

    
  };
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

  
