// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get all the elements
    const resultlabel = document.getElementById("resultlabel");
    const firstNumberInput = document.getElementById("firstNumber");
    const secondNumberInput = document.getElementById("secondNumber");
    const calculateBtn = document.getElementById("calculateBtn");

    // Function to create animated colorful result
    function displayAnimatedResult(result) {
        // Add celebration class for animation
        resultlabel.classList.add('celebration');
        
        // Create colorful animated HTML content
        const colorfulEmojis = ['🎉', '🌈', '✨', '🎊', '🌟', '💫', '🎨', '🔥'];
        const randomEmoji1 = colorfulEmojis[Math.floor(Math.random() * colorfulEmojis.length)];
        const randomEmoji2 = colorfulEmojis[Math.floor(Math.random() * colorfulEmojis.length)];
        
        resultlabel.innerHTML = `
            <span class="sparkle">
                ${randomEmoji1} Výsledok: 
                <span class="result-number">${result}</span> 
                ${randomEmoji2}
            </span>
        `;
        
        // Remove celebration class after animation
        setTimeout(() => {
            resultlabel.classList.remove('celebration');
        }, 800);
    }

    // Function to create loading animation
    function showLoadingAnimation() {
        const loadingFrames = ['⏳', '⌛', '💫', '✨'];
        let frameIndex = 0;
        
        const loadingInterval = setInterval(() => {
            resultlabel.innerHTML = `
                <span class="sparkle">
                    ${loadingFrames[frameIndex]} Počítam... ${loadingFrames[frameIndex]}
                </span>
            `;
            frameIndex = (frameIndex + 1) % loadingFrames.length;
        }, 200);
        
        // Stop loading after 1 second
        setTimeout(() => {
            clearInterval(loadingInterval);
        }, 1000);
        
        return loadingInterval;
    }

    // Function to perform calculation
    function calculate() {
        const firstNum = parseFloat(firstNumberInput.value);
        const secondNum = parseFloat(secondNumberInput.value);
        
        // Check if inputs are valid numbers
        if (isNaN(firstNum) || isNaN(secondNum)) {
            resultlabel.innerHTML = `
                <span class="sparkle">
                    ❌ Zadajte platné čísla! ❌
                </span>
            `;
            return;
        }
        
        // Show loading animation first
        showLoadingAnimation();
        
        // Calculate the sum (you can change this to any operation)
        const result = firstNum + secondNum;
        
        // Show result after loading animation
        setTimeout(() => {
            displayAnimatedResult(result);
        }, 1000);
    }

    // Add click event listener to the button
    calculateBtn.addEventListener('click', calculate);

    // Also allow Enter key to trigger calculation
    firstNumberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });

    secondNumberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });

    console.log('Calculator loaded successfully! 🎉');

    // Create 100 spinning "add" texts
    function create100SpinningTexts() {
        const container = document.getElementById('spinning-texts-container');
        const spinClasses = ['spin-fast', 'spin-medium', 'spin-slow'];
        
        for (let i = 0; i < 100; i++) {
            const addText = document.createElement('div');
            addText.textContent = 'add';
            addText.className = 'spinning-add-text';
            
            // Random position on screen
            const randomX = Math.random() * (window.innerWidth - 60); // 60px margin
            const randomY = Math.random() * (window.innerHeight - 40); // 40px margin
            
            addText.style.left = randomX + 'px';
            addText.style.top = randomY + 'px';
            
            // Random spinning speed
            const randomSpinClass = spinClasses[Math.floor(Math.random() * spinClasses.length)];
            addText.classList.add(randomSpinClass);
            
            // Random delay for staggered animation
            addText.style.animationDelay = (Math.random() * 2) + 's';
            
            // Random font size variation
            const randomSize = 15 + Math.random() * 15; // 15px to 30px
            addText.style.fontSize = randomSize + 'px';
            
            container.appendChild(addText);
        }
    }

    // Create the spinning texts after DOM is loaded
    create100SpinningTexts();

    // Recreate texts on window resize to maintain distribution
    window.addEventListener('resize', () => {
        const container = document.getElementById('spinning-texts-container');
        container.innerHTML = ''; // Clear existing texts
        create100SpinningTexts(); // Create new ones
    });
});