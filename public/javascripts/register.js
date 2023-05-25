async function register() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let name = document.getElementById("name").value;
        let pass = document.getElementById("password").value;
        let res = await requestRegister(name,pass);
        if (res.successful) {
            msgDOM.textContent = "Account created. Go to login page";
            window.location.href = "login.html";
        } else {
            msgDOM.textContent = "Was not able to register";
        }      
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";   
    }
}