// משתנים למשחק
const board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = "X"; // השחקן תמיד משחק כ-X

// מזהים את כל התאים
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");

// מאזינים ללחיצה על כל תא
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    if (board[cellIndex] !== "" || !gameActive) return;

    board[cellIndex] = "X";
    cell.textContent = "X";

    if (checkWinner("X")) {
        statusDisplay.textContent = "🎉 השחקן ניצח!";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusDisplay.textContent = "🤝 תיקו!";
        gameActive = false;
        return;
    }

    // עדכון תור למחשב
    currentPlayer = "O";
    updateTurnIndicator(); 

    setTimeout(computerMove, 500);
}


// פונקציה שמבצעת את התור של המחשב (O)
function computerMove() {
    if (!gameActive) return;

    const bestMove = findBestMove();
    board[bestMove] = "O";
    cells[bestMove].textContent = "O";

    if (checkWinner("O")) {
        statusDisplay.textContent = "💻 המחשב ניצח!";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusDisplay.textContent = "🤝 תיקו!";
        gameActive = false;
        return;
    }

    // עדכון תור חזרה לשחקן
    currentPlayer = "X";
    updateTurnIndicator();
}

// פונקציה למציאת מהלך רנדומלי
function getRandomMove() {
    let availableMoves = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// פונקציה למציאת המהלך החכם של המחשב
function findBestMove() {
    // 1. בדיקה אם המחשב יכול לנצח
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "O";
            if (checkWinner("O")) {
                board[i] = "";
                return i;
            }
            board[i] = "";
        }
    }

    // 2. חסימת ניצחון של השחקן
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "X";
            if (checkWinner("X")) {
                board[i] = "";
                return i;
            }
            board[i] = "";
        }
    }

    // 3. אם אין מהלך מיידי לניצחון או חסימה, לבחור רנדומלית משבצת פנויה
    return getRandomMove();
}

// פונקציה לבדיקה אם יש מנצח
function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // שורות
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // עמודות
        [0, 4, 8], [2, 4, 6]  // אלכסונים
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function updateTurnIndicator() {
    statusDisplay.textContent = `תור נוכחי: ${currentPlayer === "X" ? "שחקן" : "מחשב"}`;
}


// פונקציה לאיפוס המשחק
resetButton.addEventListener("click", () => {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = "תור נוכחי: X";
    cells.forEach(cell => cell.textContent = "");
});
