var currentQuestion = 1;
var questionPages = document.querySelectorAll(".question");

function nextPage() {
	if (currentQuestion < questionPages.length) {
		questionPages[currentQuestion - 1].style.display = "none";
		currentQuestion++;
    }}