const resultLabel = document.getElementById("resultLabel");

const input1 = document.getElementById("firstNumber");
const input2 = document.getElementById("secondNumber");
const calculateButton = document.getElementById("calculateButton");
const subtractButton = document.getElementById("subtractButton");

import { sum, subtract } from "./math.js";

function checkResultAndOpen(result) {
    if (result === 67) {
        // Open the 67 result page in a new tab/window
        window.open('result67.html', '_blank');
    } else if (result === -67) {
        // Open the Monday cat meme page for -67
        window.open('monday-cat-meme.html', '_blank');
    }
}

function sumAndDisplay() {
    const num1 = parseFloat(input1.value);
    const num2 = parseFloat(input2.value);
    const result = sum(num1, num2);
    resultLabel.textContent = `Result: ${result}`;
    checkResultAndOpen(result);
}

function subtractAndDisplay() {
    const num1 = parseFloat(input1.value);
    const num2 = parseFloat(input2.value);
    const result = subtract(num1, num2);
    resultLabel.textContent = `Result: ${result}`;
    checkResultAndOpen(result);
}

calculateButton.addEventListener("click", sumAndDisplay);
subtractButton.addEventListener("click", subtractAndDisplay);