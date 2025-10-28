const body = document.querySelector("body");

const divEl = document.createElement("div");

const input1 = document.createElement("input");
input1.type = "number";
input1.placeholder = "Enter first number";

const input2 = document.createElement("input");
input2.type = "number";
input2.placeholder = "Enter second number";

divEl.appendChild(input1);
divEl.appendChild(input2);
divEl.style.backgroundColor = "lightblue";
divEl.style.padding = "20px";

const resultLabel = document.createElement("h1");
resultLabel.innerText = "Result";

const calculateButton = document.createElement("button");
calculateButton.innerText = "Calculate Sum";
calculateButton.onclick = () => {
    resultLabel.innerText = "Result: " + (parseFloat(input1.value) + parseFloat(input2.value));
}

body.appendChild(divEl);
body.appendChild(calculateButton);
body.appendChild(resultLabel);

/*import { sum, subtract } from "./math.js";

function sumAndDisplay() {
    const num1 = parseFloat(input1.value);
    const num2 = parseFloat(input2.value);
    const result = sum(num1, num2);
    resultLabel.textContent = `Result: ${result}`;
}

function subtractAndDisplay() {
    const num1 = parseFloat(input1.value);
    const num2 = parseFloat(input2.value);
    const result = subtract(num1, num2);
    resultLabel.textContent = `Result: ${result}`;
}

calculateButton.addEventListener("click", sumAndDisplay);
subtractButton.addEventListener("click", subtractAndDisplay);*/