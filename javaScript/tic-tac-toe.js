document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell"); // כל התאים של הלוח
    const statusText = document.getElementById("status"); // האלמנט שמציג את תור המשחק
    const resetButton = document.getElementById("reset"); // כפתור האיפוס
    let board = ["", "", "", "", "", "", "", "", ""]; // מצב הלוח
    let currentPlayer = "X"; // מי מתחיל
    let gameActive = true; // האם המשחק פעיל

    // פונקציה לבדוק אם יש מנצח
    // בלה
    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // שורות
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // עמודות
            [0, 4, 8], [2, 4, 6]             // אלכסונים
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                statusText.textContent = `המשחק נגמר! המנצח: ${board[a]}`;
                return;
            }
        }

        // אם כל התאים מלאים ואין מנצח – תיקו
        if (!board.includes("")) {
            gameActive = false;
            statusText.textContent = "תיקו!";
        }
    };

    // פונקציה שמטפלת בלחיצה על תא
    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (!gameActive || board[index] !== "") return; // אם המשחק נגמר או שהתא תפוס - לא עושים כלום

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWin(); // בדיקה אם יש מנצח

        // מעבירים תור לשחקן הבא
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) {
            statusText.textContent = `תור נוכחי: ${currentPlayer}`;
        }
    };

    // פונקציה לאיפוס המשחק  
    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""]; // מאפסים את הלוח
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = "תור נוכחי: X";
        cells.forEach(cell => cell.textContent = ""); // מוחקים את ה-X וה-O מהלוח
    };

    // מאזינים ללחיצה על כל תא
    cells.forEach(cell => cell.addEventListener("click", handleClick));
    // מאזינים ללחיצה על כפתור האיפוס
    resetButton.addEventListener("click", resetGame);
});
