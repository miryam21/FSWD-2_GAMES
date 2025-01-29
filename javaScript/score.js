document.addEventListener("DOMContentLoaded", function () {
    // שליפת רשימת המשתמשים מ-Local Storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // בדיקה אם יש משתמשים
    if (users.length > 0) {
        // שליפת המשתמש האחרון שנרשם
        const user = users[users.length - 1];

        // הצגת הנתונים בעמוד
        document.getElementById("userName").textContent = user.name || "לא ידוע";
        document.getElementById("userEmail").textContent = user.email || "לא ידוע";

        // בדיקה אם יש נתוני ניצחונות
        const winsData = JSON.parse(localStorage.getItem("userWins")) || { XO: 0, Balloon: 0 };
        document.getElementById("userWinsXO").textContent = winsData.XO || 0;
        document.getElementById("userWinsBaloon").textContent = winsData.Balloon || 0;
    } else {
        // אם אין נתונים, להציג הודעה מתאימה
        document.getElementById("userInfo").innerHTML = "<p>❌ אין מידע על המשתמש.</p>";
    }
});
