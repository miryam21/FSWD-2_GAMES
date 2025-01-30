document.addEventListener('DOMContentLoaded', () => {
    const balloonArea = document.getElementById('balloonArea');
    const scoreElement = document.getElementById('score');
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    
    const gameOverPopup = document.createElement('div'); 
    const highScoreElement = document.getElementById('highScore'); 
    let score = 0;
    let highScore = 0; 

    let gameStarted = false; 
    let gameOver = false; 
    let balloonSpeed = 20; 
    let balloonInterval = 1000; 
    let addBalloonInterval; // מזהה של ה-setInterval להוספת בלונים

   
    gameOverPopup.id = 'game-over-popup';
    gameOverPopup.classList.add('popup'); 

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content'); 
    popupContent.innerHTML = `
        <h1>GAME OVER</h1>
        <p>Your score: <span id="final-score">0</span></p>
        <button id="restart-button" class="popup-button">Try Again</button>
    `;
    gameOverPopup.appendChild(popupContent);
    document.body.appendChild(gameOverPopup);

  
    function addBalloon() {
        if (gameOver) return; 

        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 90}%`; 
        balloon.style.bottom = '0px'; 
        balloonArea.appendChild(balloon);

       
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
            if (gameOver) return; // 

            clearInterval(moveUp); // עצירת התנועה
            balloon.classList.add('exploding-balloon'); 
            setTimeout(() => {
                balloon.remove();
            }, 300); 
            score += 10; 
            updateScore(); 

            // בדיקה להעלאת רמת קושי
            if (score % 100 === 0) {
                increaseDifficulty();
            }
        });
    }


function updateScore() {
    scoreElement.textContent = score;

    //אם השחקן שבר שיא 
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        saveHighScore(highScore);
    }
}
// פונקציה לשמירת השיא האישי ב-LocalStorage
function saveHighScore(highScore) {       
    if (!loggedInUser) return;

    let userScores = JSON.parse(localStorage.getItem("users"));
    let currentUserIndex = userScores.findIndex(x=>x.username == loggedInUser)
    userScores[currentUserIndex].maxScoreBaloon = highScore;
    localStorage.setItem("users", JSON.stringify(userScores));
    
}

    function endGame() {
        gameOver = true; 
        document.getElementById('final-score').textContent = score; // עדכון הניקוד בפופאפ
        gameOverPopup.style.display = 'flex'; // הצגת הפופאפ
    // שמירת שיא אם השחקן עבר את הקודם
     if (score > highScore) {
        highScore = score;
        saveHighScore(highScore);
     }

        // האזנה ללחיצה על כפתור Restart
        const restartButton = document.getElementById('restart-button');
        restartButton.addEventListener('click', () => {
            location.reload();
        });
    }

   
    function increaseDifficulty() {
        if (balloonSpeed > 5) balloonSpeed -= 2; 
        if (balloonInterval > 300) balloonInterval -= 100; // הפחתת זמן בין הבלונים

        clearInterval(addBalloonInterval); // עצירת ה-Interval הנוכחי
        addBalloonInterval = setInterval(addBalloon, balloonInterval); // יצירת Interval חדש
    }

    // התחלת המשחק אחרי השהיה
    setTimeout(() => {
        gameStarted = true; 
        addBalloonInterval = setInterval(addBalloon, balloonInterval); // הוספת בלונים כל שנייה
    }, 1000);
});
