// script.js
document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.querySelector(".game-area");
    const levelText = document.getElementById("level-text");
    const finalMessage = document.getElementById("final-message");
    const timerElement = document.getElementById("timer");
    const timeLeftElement = document.getElementById("time-left");

    let level = 1;
    let foundHearts = 0;
    let timeLeft = 30;

    // Start Timer
    timerElement.classList.remove("hidden");
    const timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Try again!");
            location.reload(); // Restart the game
        }
    }, 1000);

    // Level 1: Find Hearts
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach(heart => {
        heart.addEventListener("click", () => {
            heart.classList.add("hidden");
            foundHearts++;

            if (foundHearts === hearts.length) {
                if (level === 1) {
                    proceedToLevel2();
                }
            }
        });
    });

    // Transition to Level 2
    function proceedToLevel2() {
        level = 2;
        foundHearts = 0;
        timeLeft += 20; // Give extra time for the next level
        levelText.textContent = "Level 2: Pop the balloons!";
        gameArea.innerHTML = ""; // Clear hearts from Level 1

        // Add balloons for Level 2
        for (let i = 0; i < 5; i++) {
            const balloon = document.createElement("div");
            balloon.classList.add("balloon");
            balloon.style.left = `${Math.random() * 90}%`;
            balloon.style.top = `${Math.random() * 60}%`;

            balloon.addEventListener("click", () => {
                balloon.classList.add("hidden");
                foundHearts++;

                if (foundHearts === 5) {
                    clearInterval(timer);
                    timerElement.classList.add("hidden");
                    finalMessage.classList.remove("hidden");
                }
            });

            gameArea.appendChild(balloon);
        }
    }
});
