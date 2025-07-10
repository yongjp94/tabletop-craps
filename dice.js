document.addEventListener('DOMContentLoaded', () => {
    const dice = document.querySelectorAll(".die");

    window.rollDice = function() {
        dice.forEach((die) => {
            die.classList.add("shake");
        });

        setTimeout(() => {
            dice.forEach((die) => {
                die.classList.remove("shake");
            });

            const die1Value = Math.floor(Math.random() * 6) + 1;
            const die2Value = Math.floor(Math.random() * 6) + 1;

            document.querySelector("#die-1").innerHTML = getDiceHTML(die1Value);
            document.querySelector("#die-2").innerHTML = getDiceHTML(die2Value);

            // Update the game state
            updateGame(die1Value + die2Value);

        }, 1000);
    }

    function getDiceHTML(value) {
        let dots = '';
        for (let i = 0; i < value; i++) {
            dots += '<div class="dot"></div>';
        }
        return `<div class="dice-face face-${value}">${dots}</div>`;
    }
});