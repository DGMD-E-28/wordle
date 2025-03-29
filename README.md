# Wordle Game

## Assignment Overview
This project is part of **DGMD E-28: Developing Single Page Web Applications** and focuses on building a simple Wordle game using JavaScript, HTML, and CSS. The purpose of this assignment is to demonstrate the use of JavaScript objects and fetching data from an API to create an engaging game application.

## Requirements
You may use the following technologies:
- **HTML** for structure
- **CSS** for styling and layout
- **JavaScript** for functionality (using objects and fetch API)

### 🚨 Ground Rules
- **Do not look up solutions online.** Use techniques covered in class.
- **Do not use React for this assignment.**
- **Use an API for the vocabulary of words or to check user’s guesses.**
- **Enhancements are welcome,** but first, meet the basic requirements.

---

## 📌 Tasks
### 🔹 Part 1: Create the Game Board
- Dynamically generate a 6x5 grid representing the Wordle game board.
- Style the board with CSS for a clean, modern look.

### 🔹 Part 2: Handle User Input
- Capture user guesses via text input.
- Validate input to ensure it’s a five-letter word.
- Check validity of words using an API call.

### 🔹 Part 3: Implement Guess Feedback
- Provide feedback for each guess by highlighting:
  - **Green**: Correct letter and position.
  - **Yellow**: Correct letter, wrong position.
  - **Grey**: Letter not in the word.
- Display a message when the user wins or loses.

### 🔹 Part 4: Multiple Games & Debug Mode
- Allow user to play multiple games.
- Include a debug mode to display the answer for testing purposes.

### 🔹 Part 5: Responsive Design
- Ensure the game is responsive down to a tablet size (700px).
- Optional: Improve responsiveness to 600px.

### 🔹 Part 6: Optional Enhancements
- Track statistics of wins and losses.
- Add animations when the user wins.

---

## 🚀 Deliverables
- **Files to submit:** `index.html`, `script.js`, `styles.css`
- **Live Deployment URL** (if hosted online)
- **Answer the questions:**
  1. What was the API you used – and why (include the URL to the source)?
  2. What was the most satisfying part of this assignment?

---

## 📌 Rubric
| Criteria | Points |
|----------|--------|
| Works to spec online | 60% |
| Code quality | 20% |
| UI quality | 20% |
| **Total** | **100%** |

---

## 🔗 Useful Resources
- [JavaScript Basics](https://www.w3schools.com/js/)
- [DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [CSS Styling](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Project Details
- **Author:** Elizabeth Koch
- **Date:** Fri Mar 28, 2025 10:39 PM
- **Live Deployment URL:** [Wordle Game](https://dgmd-e-28.github.io/wordle/)

### What was the API you used – and why?
- The API used was the **Random Word API** ([https://random-word-api.herokuapp.com/word?length=5](https://random-word-api.herokuapp.com/word?length=5)).
- This API was chosen because it provides a simple and straightforward way to fetch random words of a specified length, which is essential for creating new words for the Wordle game. It returns data in JSON format, making it easy to integrate with the JavaScript `fetch()` function.

### What was the most satisfying part of this assignment?
- The most satisfying part of this assignment was having my family play the game. Seeing them enjoy the interactive gameplay, test the different themes, and laugh while trying to guess the words made all the effort feel worthwhile. It was rewarding to see them engage with the project and appreciate the features I implemented.

Happy Coding! 🎉
