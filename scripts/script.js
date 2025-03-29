// Theme Toggle and Wordle Game Logic
document.addEventListener('DOMContentLoaded', () => {
    console.log(localStorage);
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const board = document.getElementById('board');
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const newGame = document.getElementById('newGame');
    const message = document.getElementById('message');
    const usedLettersBox = document.getElementById('usedLetters');

    let stats = JSON.parse(localStorage.getItem('wordleStats')) || { wins: 0, losses: 0, attempts: [] }; // Statistics initialization
    let wordToGuess = "apple";
    let attempts = 0;
    const maxAttempts = 6;
    let debugMode = false;
    let usedLetters = new Set();

    // Update the Statistics Box display
    function updateStatisticsDisplay() {
        const statisticsBox = document.getElementById('statisticsBox');
        const totalGames = stats.wins + stats.losses;
        const averageAttempts = stats.attempts.length > 0 ?
            (stats.attempts.reduce((a, b) => a + b, 0) / stats.attempts.length).toFixed(2) : 0;

        statisticsBox.innerHTML = `
            <h3>Game Statistics</h3>
            <p>Total Wins: ${stats.wins}</p>
            <p>Total Losses: ${stats.losses}</p>
            <p>Average Attempts Per Win: ${averageAttempts}</p>
            <p>Total Games Played: ${totalGames}</p>
        `;
    }

    // Fetch a random word from the API
    async function fetchRandomWord() {
        try {
            const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
            const data = await response.json();
            return data[0];
        } catch (error) {
            console.error('Error fetching word:', error);
            return "apple"; // Fallback word
        }
    }

// Reset the game state
    async function resetGame() {
        attempts = 0;
        wordToGuess = await fetchRandomWord();
        usedLetters.clear();
        updateUsedLettersDisplay();
        board.innerHTML = "";
        message.innerHTML = "";
        guessInput.value = "";
        guessInput.disabled = false;
        submitGuess.disabled = false;
        renderBoard();

        if (debugMode) {
            debugWordDisplay.innerHTML = `<strong>${wordToGuess.toUpperCase()}</strong>`; // Display new word under the bug icon
        } else {
            debugWordDisplay.innerHTML = ""; // Clear debug word display if not in debug mode
        }
    }

    // Update the display of used letters
    function updateUsedLettersDisplay() {
        if (usedLetters.size === 0) {
            usedLettersBox.textContent = 'Used Letters: None Yet';
        } else {
            usedLettersBox.textContent = `Used Letters: ${Array.from(usedLetters).sort().join(', ')}`;
        }
    }

    // Render the game board
    function renderBoard() {
        board.innerHTML = "";
        for (let i = 0; i < maxAttempts; i++) {
            const row = document.createElement('div');
            row.className = 'row';

            for (let j = 0; j < 5; j++) {
                const square = document.createElement('div');
                square.className = 'square';
                row.appendChild(square);
            }
            board.appendChild(row);
        }
    }

    // Handle the player's guess
    function handleGuess() {
        const guess = guessInput.value.toLowerCase();
        if (guess.length !== 5) {
            message.innerHTML = "Please enter a 5-letter word.";
            return;
        }

        const currentRow = board.children[attempts];

        for (let i = 0; i < 5; i++) {
            const square = currentRow.children[i];
            const letter = guess[i];

            if (letter === wordToGuess[i]) {
                square.classList.add('correct');
            } else if (wordToGuess.includes(letter)) {
                square.classList.add('present');
            } else {
                square.classList.add('absent');
            }

            square.textContent = letter.toUpperCase();
            usedLetters.add(letter);
        }

        updateUsedLettersDisplay();
        attempts++;
        guessInput.value = "";

        if (guess === wordToGuess) {
            stats.wins++;
            stats.attempts.push(attempts);
            localStorage.setItem('wordleStats', JSON.stringify(stats));

            // Animate winning row
            currentRow.classList.add('animate__animated', 'animate__bounce');

            setTimeout(() => {
                message.innerHTML = "🎉 Congratulations! You've guessed the word! 🎉";
                guessInput.disabled = true;
                submitGuess.disabled = true;
                updateStatisticsDisplay(); // Update the stats display
            }, 500);
        } else if (attempts === maxAttempts) {
            stats.losses++;
            localStorage.setItem('wordleStats', JSON.stringify(stats));

            message.innerHTML = `Game Over! The word was: ${wordToGuess}`;
            guessInput.disabled = true;
            submitGuess.disabled = true;
            updateStatisticsDisplay(); // Update the stats display
        }
    }

    submitGuess.addEventListener('click', handleGuess);
    newGame.addEventListener('click', resetGame);

    // Debug Toggle Checkbox Handling
    const debugCheckbox = document.getElementById('debug-toggle');
    const debugIcon = document.getElementById('debug-icon');
    const debugWordDisplay = document.createElement('div'); // Create a div to show the word
    debugWordDisplay.style.fontSize = '14px';
    debugWordDisplay.style.textAlign = 'center';
    debugWordDisplay.style.color = 'var(--text-color)';
    debugWordDisplay.style.marginTop = '5px';
    debugIcon.parentElement.appendChild(debugWordDisplay); // Append the div under the bug icon

    debugCheckbox.addEventListener('change', async () => {
        debugMode = debugCheckbox.checked;

        if (debugMode) {
            debugIcon.innerHTML = "🐞"; // Show bug icon when in debug mode
            debugWordDisplay.innerHTML = `<strong>${wordToGuess.toUpperCase()}</strong>`; // Display the word under the bug icon
        } else {
            debugWordDisplay.innerHTML = ""; // Clear the word display when debug mode is off
        }
    });

    themeToggle.addEventListener('input', () => {
        let themeState = parseInt(themeToggle.value, 10);

        if (themeState === 0) {
            body.classList.remove('dark-mode', 'harvard-mode');
            themeIcon.innerHTML = '🌞';
        } else if (themeState === 1) {
            body.classList.add('dark-mode');
            body.classList.remove('harvard-mode');
            themeIcon.innerHTML = '🌙';
        } else {
            body.classList.add('harvard-mode');
            body.classList.remove('dark-mode');
            themeIcon.innerHTML = `<img src="../assets/harvard.png" alt="Harvard" class="harvard-icon">`;
        }
    });

    updateStatisticsDisplay();
    resetGame();
});
