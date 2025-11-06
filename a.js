const gameArea = document.getElementById("game-area");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const message = document.getElementById("message");

let score = 0;
let lives = 3;
let gameActive = false;
let starInterval;
let basketPosition = 130;
const basketWidth = 100;

// We are trying to move the basket with the arrow keys

document.addEventListener("keydown", e => {
    if (!gameActive) return;
    const step = 20;
    if (e.key === "ArrowLeft") {
        basketPosition = Math.max(0, basketPosition - step);
    }
    else if (e.key === "ArrowRight") {
        // gameArea.clientWidth is the width of the gamebox. Suppose it is 360px, the basketWidth is the width of the basket for example it is 100px.
        // basketPosition.step is the new position of the basket where we want to move the basket, and it can be any number.
        basketPosition = Math.min(gameArea.clientWidth - basketWidth, basketPosition + step);
        //               Math.min(360 - 100, 130 + 20) m(260,150)
    }
    basket.style.left = basketPosition + "px";
});

function createStar() {
    let star = document.createElement("div");
    star.classList.add("star");
    const x = Math.floor(Math.random() * (gameArea.clientWidth - 30));
    star.style.left = x + "px";
    // it means "move the star so that its left edge is x pixels away from the left border of the game area" so that means if x = 125, the star will appear 125 away from the left.
    star.style.top = "0px";
    gameArea.appendChild(star);
    let top = 0;
    const fallSpeed = Math.random() * 3 + 2;
    // Math.random gives you a random number, a decimal number between 0 and 1, and the 0 is inclusive, but the 1 is exclusive, so it won't give you 1, but 0
    // i.e 0.17 * 3 = 0.51 + 2 = 2.51, so every new star will fall at a random speed between 2-5 pixel per interval

    const fall = setInterval(() => {
        if (!gameActive) {
            clearInterval(fall);
            star.remove();
            return;
        }
        top += fallSpeed;
        star.style.top = top + "px";

        // check collision with basket, if it's colliding then it will work

        const starRect = star.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();
        if (starRect.bottom > basketRect.top &&
            starRect.left + starRect.width > basketRect.left &&
            starRect.left < basketRect.right) {
            score++;
            scoreDisplay.textContent = "score:" + score;
            star.remove();
            clearInterval(fall);
        }
        // if the star hits bottom

        if (top >= gameArea.clientWidth - 30) {
            lives--;
            livesDisplay.textContent = "Lives: " + lives;
            star.remove;
            clearInterval(fall);

            if (lives <= 0) {
                endGame();
            }
        }

    }, 20)
}

function startGame() {
    if (gameActive) return;
    score = 0;
    lives = 3;
    gameActive = true;
    scoreDisplay.textContent = "Score: 0";
    livesDisplay.textContent = "Lives: 3";
    message.textContent = "Catch the Stars!";
    basketPosition = (gameArea.clientWidth - basketWidth) / 2;
    basket.style.left = basketPosition + "px";
    
    starInterval = setInterval(createStar, 800);
}

function endGame() {
    gameActive = false;
    clearInterval(starInterval);
    message.textContent = "Game Over! Final Score:" + score;
}

function resetGame() {
    endGame();
    score = 0;
    lives = 3;
    scoreDisplay.textContent = "score: 0";
    livesDisplay.textContent = "lives: 3";
    message.textContent = "";
    document.querySelectorAll(".star").forEach(star => star.remove());
    basketPosition = (gameArea.clientWidth - basketWidth) / 2;
    basket.style.left = basketPosition + "px";
}