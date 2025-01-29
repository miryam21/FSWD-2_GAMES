document.addEventListener('DOMContentLoaded', () => {
    const balloonArea = document.getElementById('balloonArea');
    const scoreElement = document.getElementById('score');

    
    const gameOverPopup = document.createElement('div'); // יצירת אלמנט פופאפ לסיום המשחק
    const highScoreElement = document.getElementById('highScore'); // תצוגת שיא אישי
    let score = 0;
    let highScore = 0; // ברירת מחדל אם אין שיא אישי

    let gameStarted = false; // משתנה לבדיקה אם המשחק התחיל
    let gameOver = false; // משתנה לבדיקה אם המשחק נגמר
    let balloonSpeed = 20; // מהירות התחלתית
    let balloonInterval = 1000; // תדירות התחלתית
    let addBalloonInterval; // מזהה של ה-setInterval להוספת בלונים

    // יצירת פופאפ מותאם לסיום המשחק
    gameOverPopup.id = 'game-over-popup';
    gameOverPopup.classList.add('popup'); // שימוש במחלקה מה-CSS

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content'); // שימוש במחלקה מה-CSS
    popupContent.innerHTML = `
        <h1>GAME OVER</h1>
        <p>Your score: <span id="final-score">0</span></p>
        <button id="restart-button" class="popup-button">Try Again</button>
    `;
    gameOverPopup.appendChild(popupContent);
    document.body.appendChild(gameOverPopup);

    // פונקציה להוסיף בלון למסך
    function addBalloon() {
        if (gameOver) return; // אם המשחק נגמר, לא להוסיף בלונים

        const balloon = document.createElement('div');
        balloon.classList.add('balloon'); // שימוש במחלקה מה-CSS
        balloon.style.left = `${Math.random() * 90}%`; // מיקום אופקי רנדומלי
        balloon.style.bottom = '0px'; // מתחיל למטה
        balloonArea.appendChild(balloon);

        // תנועה כלפי מעלה
        let position = 0;
        const moveUp = setInterval(() => {
            if (gameOver) {
                clearInterval(moveUp);
                balloon.remove();
                return;
            }

            position += 2; // מהירות
            balloon.style.bottom = `${position}px`;
            if (position > window.innerHeight) {
                clearInterval(moveUp);
                balloon.remove();
                if (!gameOver) {
                    endGame(); // סיום המשחק אם בלון יוצא מהמסך
                }
            }
        }, balloonSpeed);

        // קליק על הבלון
        balloon.addEventListener('click', () => {
            if (gameOver) return; // מניעת פיצוץ לאחר סיום המשחק

            clearInterval(moveUp); // עצירת התנועה
            balloon.classList.add('exploding-balloon'); // שימוש במחלקה לפיצוץ
            setTimeout(() => {
                balloon.remove(); // הסרה אחרי האפקט
            }, 300); // זמן מתאים לאנימציה
            score += 10; // עדכון ניקוד
            updateScore(); // עדכון הניקוד על המסך

            // בדיקה להעלאת רמת קושי
            if (score % 100 === 0) {
                increaseDifficulty();
            }
        });
    }

 // פונקציה לעדכון הניקוד ושמירת שיא אישי
function updateScore() {
    scoreElement.textContent = score;

    // אם השחקן שבר שיא אישי
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        saveHighScore(highScore);
    }
}
// פונקציה לשמירת השיא האישי ב-LocalStorage
function saveHighScore(highScore) {
    if (!loggedInUser) return;

    let userScores = JSON.parse(localStorage.getItem("userScores")) || {};
    userScores[loggedInUser] = highScore;
    localStorage.setItem("userScores", JSON.stringify(userScores));
}

    // פונקציה לסיום המשחק
    function endGame() {
        gameOver = true; // עדכון מצב המשחק
        document.getElementById('final-score').textContent = score; // עדכון הניקוד בפופאפ
        gameOverPopup.style.display = 'flex'; // הצגת הפופאפ
    // שמירת שיא אישי אם השחקן עבר את הקודם
     if (score > highScore) {
        highScore = score;
        saveHighScore(highScore);
     }

        // האזנה ללחיצה על כפתור Restart
        const restartButton = document.getElementById('restart-button');
        restartButton.addEventListener('click', () => {
            location.reload(); // רענון המשחק
        });
    }

    // פונקציה להעלאת רמת קושי
    function increaseDifficulty() {
        if (balloonSpeed > 5) balloonSpeed -= 2; // הפחתת זמן האנימציה (מהירות עולה)
        if (balloonInterval > 300) balloonInterval -= 100; // הפחתת זמן בין הבלונים

        clearInterval(addBalloonInterval); // עצירת ה-Interval הנוכחי
        addBalloonInterval = setInterval(addBalloon, balloonInterval); // יצירת Interval חדש
    }

    // התחלת המשחק אחרי השהיה
    setTimeout(() => {
        gameStarted = true; // מסמן שהמשחק התחיל
        addBalloonInterval = setInterval(addBalloon, balloonInterval); // הוספת בלונים כל שנייה
    }, 1000); // התחלה אחרי 1 שניות
});
