async function checkLoginStatus() {
    try {
        const response = await fetch('/api/users/auth');
        if (response.status === 200) {
            return;
        } else {
            window.location.href = 'login.html';
        }
    } catch (err) {
        console.log(err);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();
});

var currentQuestion = 1;
		var questionPages = document.querySelectorAll(".question");
		var season = 1;
		var histories = 1;
		var activity =1;
		var cost=1;
		var number=1;
		
        async function nextPage() {
			if (currentQuestion == 1) {
				let questions = document.getElementById("q1");
				questions.childNodes.forEach(element => {
					if (element.checked) season = element.value;
				});
				await question2();
			}
			
			else if (currentQuestion == 2) {
				let questions = document.getElementById("q2");
				questions.childNodes.forEach(element => {
					if (element.checked) histories = element.value;
				});
				await question3();
			}
			else if (currentQuestion == 3) {
				let questions = document.getElementById("q3");
				questions.childNodes.forEach(element => {
					if (element.checked) activity = element.value;
				});
				await question4();
			}
			else if (currentQuestion == 4) {
				let questions = document.getElementById("q4");
				questions.childNodes.forEach(element => {
					if (element.checked) cost = element.value;
				});
				await question5();
			}
			if (currentQuestion < questionPages.length) {
				questionPages[currentQuestion - 1].style.display = "none";
				currentQuestion++;
				questionPages[currentQuestion - 1].style.display = "block";
			}
		}
		
		function prevPage() {
			if (currentQuestion > 1) {
				questionPages[currentQuestion - 1].style.display = "none";
				currentQuestion--;
				questionPages[currentQuestion - 1].style.display = "block";
			}
		}

        document.addEventListener("DOMContentLoaded", function () {
            document.getElementById("myForm").addEventListener("submit", function (event) {
              event.preventDefault();
          
              getNameOfCitiesByForm()
                .then((response) => {
                  if (response.status === 200) {
                    var cities = response.result;
                    var queryParams = new URLSearchParams();
                    queryParams.append('cities', JSON.stringify(cities));
                    localStorage.setItem("params", queryParams);
                    console.log("local -> " + localStorage.getItem("params"));
                    window.location.href = "map.html";
                  } else {
                    console.error(response.result.msg);
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          });