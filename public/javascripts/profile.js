const imgDiv= document.querySelector('.user-img');
const img=document.querySelector('#photo');
const file=document.querySelector('#file');
const uploadbtn =document.querySelector('#uploadbtn');

window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if (result.err) {  throw result.err; }
        window.user = user;
        document.getElementById('name').textContent = "Hello "+window.user.name;
     } catch (err) {
        console.log(err);
       // alert("Something went wrong!")
    }
}

file.addEventListener('change', function(){
    const chosedfile = this.file(0);

    if(chosedfile){
        const reader = new FileReader();

        reader.readAsDataURL('load', function(){
            img.setAttribute('scr', reader.result);
        });
        reader.readAsDataURL(chosedfile);
    }
})



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