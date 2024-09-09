// Sample passages
const passages = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed is an important skill to improve.",
    "Coding challenges help you learn new techniques.",
    "Practice typing to increase your speed and accuracy.",
    "JavaScript is a popular language for web development."
];

let startTime, passageText;
const typedInput = document.getElementById("typedInput");
const passageElement = document.getElementById("passage");
const startButton = document.getElementById("startButton");
const timeTakenElement = document.getElementById("timeTaken");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

// Function to get a random passage
function getRandomPassage() {
    return passages[Math.floor(Math.random() * passages.length)];
}

// Start the typing test
startButton.addEventListener("click", function() {
    passageText = getRandomPassage();
    passageElement.textContent = passageText;
    typedInput.value = "";
    typedInput.disabled = false;
    typedInput.focus();
    startTime = new Date().getTime();  // Start timer
    timeTakenElement.textContent = "";
    wpmElement.textContent = "";
    accuracyElement.textContent = "";
});

// Detect when typing is complete and calculate results
typedInput.addEventListener("input", function() {
    if (typedInput.value === passageText) {
        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000;  // Time in seconds
        const wpm = calculateWPM(passageText, timeTaken);
        const accuracy = calculateAccuracy(passageText, typedInput.value);

        timeTakenElement.textContent = `Time taken: ${timeTaken.toFixed(2)} seconds`;
        wpmElement.textContent = `Words per minute (WPM): ${wpm.toFixed(2)}`;
        accuracyElement.textContent = `Accuracy: ${accuracy.toFixed(2)}%`;

        typedInput.disabled = true;  // Disable input after completion
    }
});

// Function to calculate WPM
function calculateWPM(text, timeTaken) {
    const words = text.split(" ").length;
    const wpm = (words / timeTaken) * 60;
    return wpm;
}

// Function to calculate accuracy
function calculateAccuracy(original, typed) {
    let correctChars = 0;
    for (let i = 0; i < original.length; i++) {
        if (typed[i] === original[i]) {
            correctChars++;
        }
    }
    const accuracy = (correctChars / original.length) * 100;
    return accuracy;
}
