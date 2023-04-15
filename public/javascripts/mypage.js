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





var currentQuestion = 1;
var questionPages = document.querySelectorAll(".question");

