document.addEventListener('DOMContentLoaded', () => {
    // Game state
    let firstRoll = true;
    let losingNumber = null;
    let rollCount = 0;
    let topRollCount = 0;

    // DOM elements
    const statusDisplay = document.getElementById('status');
    const losingNumberDisplay = document.getElementById('losing-number');
    const rollButton = document.getElementById('roll-button');
    const newGameButton = document.getElementById('new-game-button');
    const howToPlayButton = document.getElementById('how-to-play-button');
    const howToPlayModal = document.getElementById('how-to-play-modal');
    const closeButton = document.querySelector('.close-button');
    const diceContainer = document.getElementById('dice-container');
    const currentRollCountSpan = document.getElementById('current-roll-count');
    const topRollCountSpan = document.getElementById('top-roll-count');

    // Hide modal on load
    howToPlayModal.style.display = 'none';

    // Initial display for roll count
    updateRollCountDisplay();

    // Game logic
    rollButton.addEventListener('click', () => {
        rollDice();
        howToPlayButton.style.display = 'none'; // Hide how to play button after first roll
        rollCount++;
        updateRollCountDisplay();
    });

    howToPlayButton.addEventListener('click', () => {
        howToPlayModal.style.display = 'flex'; // Use flex to show and center
    });

    closeButton.addEventListener('click', () => {
        howToPlayModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === howToPlayModal) {
            howToPlayModal.style.display = 'none';
        }
    });

    window.updateGame = function(roll) {

        statusDisplay.textContent = `You rolled a ${roll}`;

        if (firstRoll) {
            if (roll === 7) {
                statusDisplay.textContent += ' - You win!';
                endGame();
            } else {
                losingNumber = roll;
                losingNumberDisplay.textContent = `Don't roll a ${losingNumber} or 7!`;
                firstRoll = false;
            }
        } else {
            if (roll === losingNumber) {
                statusDisplay.textContent += ' - You lose!';
                endGame();
            } else if (roll === 7) {
                statusDisplay.textContent += ' - You lose!';
                endGame();
            } else {
                statusDisplay.textContent += ' - Roll again';
            }
        }
    }

    newGameButton.addEventListener('click', () => {
        firstRoll = true;
        losingNumber = null;
        rollCount = 0; // Reset roll count
        updateRollCountDisplay(); // Update display after reset
        statusDisplay.textContent = 'Roll the dice to start!';
        losingNumberDisplay.textContent = '';
        rollButton.style.display = 'inline-block';
        newGameButton.style.display = 'none';
        howToPlayButton.style.display = 'inline-block'; // Show how to play button on new game
        document.querySelector("#die-1").innerHTML = '';
        document.querySelector("#die-2").innerHTML = '';
    });

    function endGame() {
        rollButton.style.display = 'none';
        newGameButton.style.display = 'inline-block';
        howToPlayButton.style.display = 'none'; // Hide how to play button when game ends
        if (rollCount > topRollCount) {
            topRollCount = rollCount;
        }
        updateRollCountDisplay(); // Update display to show top score
    }

    function updateRollCountDisplay() {
        let colorIntensity = Math.min(rollCount * 20, 255); // Max out at 255 for red
        let fontSize = 48 + (rollCount * 4); // Increase font size by 4px per roll
        let shakeFrequency = Math.max(0, rollCount - 5); // Start shaking after 5 rolls

        currentRollCountSpan.style.color = `rgb(255, ${255 - colorIntensity}, ${255 - colorIntensity})`;
        currentRollCountSpan.style.fontSize = `${fontSize}px`;

        if (shakeFrequency > 0) {
            currentRollCountSpan.style.animation = `shake ${0.1 + (1 / shakeFrequency)}s infinite`;
        } else {
            currentRollCountSpan.style.animation = 'none';
        }

        currentRollCountSpan.textContent = rollCount;
        topRollCountSpan.textContent = topRollCount;
    }
});
