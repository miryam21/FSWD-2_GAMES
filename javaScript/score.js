const loggedInUser = localStorage.getItem('loggedInUser')


document.addEventListener("DOMContentLoaded", function () {
    // שליפת רשימת המשתמשים מ-Local Storage
    const users = JSON.parse(localStorage.getItem("users"));

    // בדיקה אם יש משתמשים
    if (loggedInUser) {

        let userScores = JSON.parse(localStorage.getItem("users"));
        let currentUserIndex = userScores.findIndex(x=>x.username == loggedInUser)
        let user = userScores[currentUserIndex];

        // הצגת הנתונים בעמוד
        document.getElementById("userName").textContent = user.username || "לא ידוע";
        document.getElementById("userEmail").textContent = user.email || "לא ידוע";

        // בדיקה אם יש נתוני ניצחונות
        document.getElementById("userWinsXO").textContent = user.maxScoreXO || 0;
        document.getElementById("userWinsBaloon").textContent = user.maxScoreBaloon || 0;
    } else {
        // אם אין נתונים, להציג הודעה מתאימה
        document.getElementById("userInfo").innerHTML = "<p> אין משתמש מחובר</p>";
    }


    let scoresTable = document.getElementById("scoresTable");
   
    for (let index = 0; index < users.length; index ++){
        console.log("user:", users[index]);
        
        scoresTable.innerHTML +=`<tr>
            <td>${users[index].username}</td>
            <td>${users[index].maxScoreXO}</td>
            <td>${users[index].maxScoreBaloon}</td>
        </tr>`
    }

});
