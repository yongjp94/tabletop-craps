document.addEventListener('DOMContentLoaded', () => {
    // Game state
    let firstRoll = true;
    let losingNumber = null;

    // DOM elements
    const statusDisplay = document.getElementById('status');
    const losingNumberDisplay = document.getElementById('losing-number');
    const rollButton = document.getElementById('roll-button');
    const newGameButton = document.getElementById('new-game-button');
    const howToPlayButton = document.getElementById('how-to-play-button');
    const howToPlayModal = document.getElementById('how-to-play-modal');
    const closeButton = document.querySelector('.close-button');
    const diceContainer = document.getElementById('dice-container');

    // Hide modal on load
    howToPlayModal.style.display = 'none';

    // Game logic
    rollButton.addEventListener('click', () => {
        rollDice();
        howToPlayButton.style.display = 'none'; // Hide how to play button after first roll
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
                losingNumberDisplay.textContent = `Losing number is ${losingNumber}`;
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
    }
});
