// Select elements
const questionSections = document.querySelectorAll('section.question');
const nextButton = document.createElement('button');
const submitButton = document.createElement('button');
const timerElement = document.createElement('div');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20; // 20 seconds per question

// Initialize buttons and timer
nextButton.textContent = 'Next';
submitButton.textContent = 'Submit';
submitButton.style.display = 'none';
timerElement.id = 'timer';
document.querySelector('main').prepend(timerElement);
document.querySelector('main').appendChild(nextButton);
document.querySelector('main').appendChild(submitButton);

// Correct answers array (update these values with the correct options)
const correctAnswers = ['A', 'A', 'B', 'B', 'B', 'A', 'C', 'C', 'B', 'C', 'A', 'C', 'A', 'B', 'B', 'C', 'C', 'A', 'B', 'C'];

// Function to display a question
function showQuestion(index) {
    questionSections.forEach((section, i) => {
        section.style.display = i === index ? 'flex' : 'none';
    });

    // Show or hide buttons based on question index
    if (index === questionSections.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
    } else {
        nextButton.style.display = 'block';
        submitButton.style.display = 'none';
    }

    resetTimer();
    const feedbackElement = getOrCreateFeedbackElement(questionSections[index]);
    feedbackElement.textContent = ''; // Clear feedback for new question
}

// Function to get or create a feedback element
function getOrCreateFeedbackElement(section) {
    let feedbackElement = section.querySelector('#feedback');
    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'feedback';
        feedbackElement.style.marginTop = '10px';
        feedbackElement.style.fontWeight = 'bold';
        section.appendChild(feedbackElement);
    }
    return feedbackElement;
}

// Function to start/reset timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = 20;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

// Function to check the selected answer
function checkAnswer() {
    const currentSection = questionSections[currentQuestionIndex];
    const selectedOption = currentSection.querySelector('input[type=radio]:checked');
    const feedbackElement = getOrCreateFeedbackElement(currentSection);

    if (selectedOption) {
        const correctAnswer = correctAnswers[currentQuestionIndex];
        if (selectedOption.value === correctAnswer) {
            feedbackElement.textContent = 'Correct!';
            feedbackElement.style.color = 'green';
            alert('Correct answer!');
            score += 5; // Each correct answer gives 5 points
        } else {
            feedbackElement.textContent = 'Wrong answer!';
            feedbackElement.style.color = 'red';
            alert('Wrong answer!');
        }
        return true; // Answer was selected
    } else {
        feedbackElement.textContent = 'Please select an answer!';
        feedbackElement.style.color = 'orange';
        alert('Please select an answer before proceeding.');
        return false; // No answer selected
    }
}

// Function to move to the next question
function nextQuestion() {
    if (!checkAnswer()) return; // Stop if no answer is selected

    clearInterval(timer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questionSections.length) {
        showQuestion(currentQuestionIndex);
    } else {
        displayResult();
    }
}

// Function to display final result
function displayResult() {
    document.querySelector('main').innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} / ${questionSections.length * 5} points</p>
        <p>You got ${score / 5} out of ${questionSections.length} questions correct.</p>
    `;
    alert(`Quiz Completed! Your score is ${score} points.`);
}

// Event listeners for buttons
nextButton.addEventListener('click', nextQuestion);
submitButton.addEventListener('click', () => {
    if (checkAnswer()) {
        clearInterval(timer);
        displayResult();
    }
});

// Initial setup
showQuestion(currentQuestionIndex);




