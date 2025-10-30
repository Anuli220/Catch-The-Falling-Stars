---

HTML Commands

1. Declare the document as HTML5.


2. Start <html> tag with language attribute set to English.


3. Start <head> section.


4. Set character encoding to UTF-8.


5. Set viewport for responsive design.


6. Add page <title> “Catch the Falling Stars”.


7. Start <style> section for CSS.


8. End <style> section.


9. End <head> section.


10. Start <body> section.


11. Add <h1> for the game title.


12. Add <div> with unique ID for displaying score.


13. Add <div> with unique ID for displaying lives.


14. Add <div> for game area with class and ID.


15. Add <div> inside game area for basket with class and ID.


16. Add <div> for control buttons.


17. Add Start <button> calling startGame().


18. Add Reset <button> calling resetGame().


19. Add <div> to display messages like “Game Over”.


20. Start <script> section for JavaScript.


21. End <script> section.


22. End <body> section.


23. End <html> section.




---

CSS Commands

1. Style body: set background color, text color, font, center content, padding.


2. Style h1: add bottom margin.


3. Style .game-area: width, height, background color, border, position relative, overflow hidden.


4. Style .basket: width, height, color, position absolute, bottom, left, border radius.


5. Style .star: width, height, color, make circular, position absolute, top 0.


6. Style button: padding, margin, font size, background color, text color, border radius, cursor pointer.


7. Style button:hover: change background color and scale slightly.


8. Style button:disabled: gray background, remove pointer cursor, remove scale.


9. Style #score and #lives: font size, margin spacing.


10. Style #message: font size, color, margin top.


11. Add media query for small screens: adjust game area, basket, star sizes.




---



JavaScript Commands

1. Get game area element by ID.


2. Get basket element by ID.


3. Get score display element by ID.


4. Get lives display element by ID.


5. Get message display element by ID.


6. Initialize score to 0.


7. Initialize lives to 3.


8. Initialize gameActive to false.


9. Initialize basket position and basket width.


10. Add keyboard listener for arrow keys.


11. Move basket left when left arrow is pressed, ensuring it doesn’t go outside game area.


12. Move basket right when right arrow is pressed, ensuring it doesn’t go outside game area.


13. Create function createStar() to generate new stars.


14. Set random horizontal position for each star.


15. Add star to game area.


16. Animate star falling at random speed using interval.


17. Check collision between star and basket.


18. If collision occurs, increase score, update score display, remove star.


19. If star reaches bottom, decrease lives, update lives display, remove star.


20. If lives reach 0, call endGame().


21. Create function startGame() to initialize game variables and start creating stars at intervals.


22. Create function endGame() to stop game, stop creating stars, and show final message.


23. Create function resetGame() to stop game, reset score and lives, remove all stars, reset basket position.


24. Use setInterval inside createStar() to make stars fall continuously.





Basket Movement Control

Add a keyboard event listener that listens for any key press (like ArrowLeft or ArrowRight).

Inside the event, first check if the game is active; if not, ignore any movement.

When the left arrow key is pressed, move the basket left by a few pixels (for example, 20px).

When the right arrow key is pressed, move the basket right by a few pixels.

Before updating the position, make sure the basket doesn’t move beyond the edges of the game area.

Update the basket’s position visually on screen by changing its style.left value.



Basket Movement Control



Add a keyboard event listener that listens for any key press (like ArrowLeft or ArrowRight).

Inside the event, first check if the game is active; if not, ignore any movement.

When the left arrow key is pressed, move the basket left by a few pixels (for example, 20px).

When the right arrow key is pressed, move the basket right by a few pixels.

Before updating the position, make sure the basket doesn’t move beyond the edges of the game area.

---

Creating and Dropping Stars

Write a function named createStar() to make and drop a new star.

Inside it, create a new div element using document.createElement("div").

Give the new element a class name “star”, so it gets the star design from CSS.

Choose a random horizontal position (between 0 and game area width minus star width).

Set its top position to 0px, so it starts at the top of the screen.

Add this new star element inside the game area using .appendChild().
Create a variable for current top position (starting at 0).

Create another variable for fall speed, using a random number so some stars fall faster.

---

Star Falling Movement

Use setInterval() to move the star downward repeatedly every few milliseconds.

Inside the interval:
 • If the game is no longer active, stop moving this star using clearInterval.
 • Otherwise, increase the top position by the fall speed to make it fall.
 • Update the star’s style.top to show the new position visually.

---

Collision Detection (Catching Stars)

Get the star’s position on screen using .getBoundingClientRect().

Get the basket’s position using the same method.

Check if the star’s bottom is near or touching the top of the basket and both are horizontally overlapping.

If they overlap, it means the basket caught the star:
 • Increase score by 1.
 • Update the score display text on the screen.
 • Remove the star from the game area using .remove().
 • Stop its falling movement with clearInterval().

---

When a Star Misses

If the star’s top position becomes greater than the game area height, it means it missed the basket.

Decrease lives by 1 and update the lives display.

Remove the missed star from the game area and stop its interval.

If lives become 0, call the endGame() function to stop everything and show “Game Over”.

---

Starting the Game

Write a function named startGame().

Inside it:
 • Check if game is already active; if yes, do nothing.
 • Reset score to 0 and lives to 3.
 • Change gameActive to true.
 • Update both score and lives on the screen.
 • Clear any old message and show “Catch the Stars!”.
 • Move basket back to the center.
 • Use setInterval() to call createStar() every second to keep creating stars.

---

Ending the Game

Write a function named endGame().

Inside it:
 • Change gameActive to false.
 • Stop the repeating star creation timer using clearInterval().
 • Show message “Game Over! Final Score: X”.

---

Resetting the Game

Write a function named resetGame().

Inside it:
 • Stop any ongoing intervals.
 • Set score back to 0 and lives back to 3.
 • Update both displays.
 • Clear the message area.
 • Remove all existing star elements from the game area.
 • Move the basket back to its center position.
 • Set gameActive to false.
 • Message should say “Press Start to Play”.