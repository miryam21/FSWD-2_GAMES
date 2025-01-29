document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // מניעת רענון הדף

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // בדיקה אם המשתמש חסום
        if (isUserBlocked()) {
            alert("ניסית להתחבר יותר מדי פעמים. נסה שוב מאוחר יותר.");
            return;
        }

        // שליפת המשתמשים מ- localStorage
        const existingUsers = JSON.parse(localStorage.getItem("users"));

        // חיפוש המשתמש לפי שם משתמש וסיסמה       
        const user = existingUsers.find(user => user.username === username && user.password === password);
        
        if (user) {
            alert("התחברת בהצלחה!");

            // איפוס הניסיונות לאחר התחברות מוצלחת
            setCookie("loginAttempts", 0, 1);

            // שמירת שם המשתמש המחובר ב-LocalStorage
            localStorage.setItem("loggedInUser", username);

            // מעבר לעמוד המשחקים
            window.location.href = "gamesPage.html";
        } else {
            handleFailedLoginAttempt();
        }
    });
});

// פונקציה לטיפול בניסיונות כניסה כושלים
function handleFailedLoginAttempt() {
    let attempts = getCookie("loginAttempts") ? parseInt(getCookie("loginAttempts")) : 0;
    attempts++;

    if (attempts >= 3) {
        setCookie("blockedUser", "true", 5); // חסימה ל-5 דקות
        alert("ניסית להתחבר יותר מדי פעמים. נסה שוב בעוד 5 דקות.");
    } else {
        setCookie("loginAttempts", attempts, 1); // שמירת מספר הניסיונות
        alert(`שם משתמש או סיסמה שגויים. ניסיונות שנותרו: ${3 - attempts}`);
    }
}

// פונקציה לבדוק אם המשתמש חסום
function isUserBlocked() {
    return getCookie("blockedUser") === "true";
}

// פונקציה לקביעת Cookie עם זמן תפוגה (בדקות)
function setCookie(name, value, minutes) {
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax; Secure`;
    console.log(`Cookie set: ${name}=${value}`);
}

// פונקציה לקריאת ערך Cookie
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        let cookiePair = cookies[i].split('=');
        if (cookiePair[0] === name) {
            console.log(`Cookie found: ${name}=${cookiePair[1]}`);
            return cookiePair[1];
        }
    }
    console.log(`Cookie not found: ${name}`);
    return null;
}
