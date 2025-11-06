    const gameArea = document.getElementById("game-area");
    const basket = document.getElementById("basket");
    const scoreDisplay = document.getElementById("score");
    const livesDisplay = document.getElementById("lives");
    const message = document.getElementById("message");

    let score = 0;
    let lives = 3;
    let gameActive = false;
    let starInterval;
    let basketPosition = 130; // initial position
    const basketWidth = 100;

    // 🎮 Move basket with arrow keys
    document.addEventListener("keydown", e => {
      if (!gameActive) return;
      const step = 20;
      if (e.key === "ArrowLeft") {
        basketPosition = Math.max(0, basketPosition - step);
      } else if (e.key === "ArrowRight") {
        basketPosition = Math.min(gameArea.clientWidth - basketWidth, basketPosition + step);
      }
      basket.style.left = basketPosition + "px";
    });

    // 🌟 Create a new falling star
    function createStar() {
      const star = document.createElement("div");
      star.classList.add("star");
      const x = Math.floor(Math.random() * (gameArea.clientWidth - 30));
      star.style.left = x + "px";
      star.style.top = "0px";
      gameArea.appendChild(star);

      let top = 0;
      const fallSpeed = Math.random() * 3 + 2; // speed between 2–5 px per frame

      // Drop the star smoothly
      const fall = setInterval(() => {
        if (!gameActive) {
          clearInterval(fall);
          star.remove();
          return;
        }

        top += fallSpeed;
        star.style.top = top + "px"; // move star down

        // 🎯 Collision detection (star touching basket)
        const starRect = star.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();
        if (
          starRect.bottom >= basketRect.top &&
          starRect.left + starRect.width >= basketRect.left &&
          starRect.left <= basketRect.right
        ) {
          score++;
          scoreDisplay.textContent = "Score: " + score;
          star.remove();
          clearInterval(fall);
        }

        // 💥 If the star hits bottom, lose a life
        if (top >= gameArea.clientHeight - 30) {
          lives--;
          livesDisplay.textContent = "Lives: " + lives;
          star.remove();
          clearInterval(fall);
          if (lives <= 0) {
            endGame();
          }
        }
      }, 20); // smooth fall speed
    }

    // ▶️ Start the game
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

    // 🛑 End the game
    function endGame() {
      gameActive = false;
      clearInterval(starInterval);
      message.textContent = "Game Over! Final Score: " + score;
    }

    // 🔁 Reset game
    function resetGame() {
      endGame();
      score = 0;
      lives = 3;
      scoreDisplay.textContent = "Score: 0";
      livesDisplay.textContent = "Lives: 3";
      message.textContent = "";
      document.querySelectorAll(".star").forEach(star => star.remove());
      basketPosition = (gameArea.clientWidth - basketWidth) / 2;
      basket.style.left = basketPosition + "px";
    }
