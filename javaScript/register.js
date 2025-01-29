// פונקציה לטיפול ברישום משתמשים
function registerUser(event) {
    // שליפת הערכים שהוזנו בטופס
    const username = document.getElementById("username").value; // שם משתמש
    const email = document.getElementById("email").value; // אימייל
    const password = document.getElementById("password").value; // סיסמה
    const confirmPassword = document.getElementById("confirmPassword").value; // אישור סיסמה

    // בדיקה אם הסיסמאות תואמות
    if (password !== confirmPassword) {
        alert("הסיסמאות אינן תואמות. אנא נסה שוב.");
        return; // עצירת ביצוע הפונקציה אם הסיסמאות לא תואמות
    }

    // שליפת משתמשים קיימים מה-Local Storage
    const existingUsersStr = localStorage.getItem("users");
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];

    // בדיקה אם שם המשתמש כבר קיים
    if (existingUsers.some(user => user.username === username)) {
        alert("שם המשתמש כבר תפוס. אנא בחר שם אחר.");
        return;
    }

    // יצירת אובייקט משתמש עם הפרטים שהוזנו
    const user = {
        username: username,
        email: email,
        password: password // הערה: בעולם אמיתי יש לשמור סיסמאות בפורמט מוצפן (hash)
    };
    console.log("משתמש נרשם:", user);

    // שמירת נתוני המשתמש ב-Local Storage
    saveUserToLocalStorage(user);

    // הצגת הודעת הצלחה וניווט לעמוד ההתחברות
    alert("הרישום בוצע בהצלחה! כעת תוכל להתחבר.");
    window.location.href = "login.html"; // מעבר לעמוד ההתחברות
}

// פונקציה לשמירת נתוני משתמש ב-Local Storage
function saveUserToLocalStorage(user) {
    // שליפת משתמשים קיימים מהאחסון המקומי
    const existingUsersStr = localStorage.getItem("users");
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
    
    // הוספת המשתמש החדש לרשימה
    existingUsers.push(user);
    
    // שמירת הרשימה המעודכנת בחזרה לאחסון המקומי
    localStorage.setItem("users", JSON.stringify(existingUsers));
}

// הצמדת פונקציית הרישום לאירוע שליחת הטופס
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // מונע רענון הדף בעת שליחת הטופס
    registerUser(event);
});
