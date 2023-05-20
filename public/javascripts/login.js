async function login() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let name = document.getElementById("name").value;
        let pass = document.getElementById("password").value;
        let result = await requestLogin(name,pass);
        if (result.err) {
            msgDOM.textContent = "An error occurred";
        } else if (!result.successful) {
            msgDOM.textContent = "Wrong username or password";    
        } else {
            msgDOM.textContent = "Login successful!";    
            window.location.pathname = "public\teste.html"
            
        }
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";
    }
}
function signIn() {
    // Perform the sign-in logic here
    
    // Show the "Profile" button and hide the "Sign In" button
    document.getElementById("signin-btn").style.display = "none";
    document.getElementById("profile-btn").style.display = "block";
  }
  
  // Check if the user is already signed in (you can modify this condition as per your actual authentication logic)
  if (userIsSignedIn) {
    document.getElementById("signin-btn").style.display = "none";
    document.getElementById("profile-btn").style.display = "block";
  }
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
        window.location.pathname = "/"
        signIn(); // Call the signIn function to update the UI
        // Redirect to the profile page or update the current page accordingly
        // window.location.pathname = "/profile.html";
        // Or update the content of the current page with the profile information
        // updateProfileContent();
      }
    } catch (err) {
      console.log(err);
      msgDOM.textContent = "An error occurred";
    }
  }
  
  function signIn() {
    // Perform the sign-in logic here
    
    // Show the "Profile" button and hide the "Sign In" button
    document.getElementById("signin-btn").style.display = "none";
    document.getElementById("profile-btn").style.display = "block";
  }
  
  // Check if the user is already signed in (you can modify this condition as per your actual authentication logic)
  if (userIsSignedIn) {
    document.getElementById("signin-btn").style.display = "none";
    document.getElementById("profile-btn").style.display = "block";
  }
  