window.onload = async function () {
    try {
        let result;
        if (result.err) throw result.err;
        // window.user -> Tem o objecto de profile do user (criado no checkAuthenticated)
        document.getElementById("name").textContent = window.user.name;
        
    } catch (err) {
        console.log(err);
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
  




var currentQuestion = 1;
var questionPages = document.querySelectorAll(".question");

