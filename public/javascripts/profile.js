window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if (result.err) {  throw result.err; }
        window.user = user;
        document.getElementById('user').textContent = "Hello "+window.user.name;
     } catch (err) {
        console.log(err);
       // alert("Something went wrong!")
    }
}

async function logout() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let result = await requestLogout();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        window.location.pathname = "/perfil.html"
    } catch (err) {
        console.log(err);
       // alert("Something is not working");
    }
}