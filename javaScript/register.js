// פונקציה לטיפול ברישום משתמשים
function registerUser(event) {
    // שליפת הערכים שהוזנו בטופס
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // בדיקה אם הסיסמאות תואמות
    if (password !== confirmPassword) {
        alert("הסיסמאות אינן תואמות. אנא נסה שוב.");
        return; // עצירת ביצוע הפונקציה אם הסיסמאות לא תואמות
    }

    // יצירת אובייקט משתמש עם הפרטים שהוזנו
    const user = {
        name: username,
        phone: phone,
        email: email,
        password: password // הערה: בעולם אמיתי יש לשמור סיסמאות בפורמט מוצפן (hash)
    };
    console.log("משתמש נרשם:", user);

    // שמירת נתוני המשתמש ב-Local Storage
    saveUserToLocalStorage(user);

    // הצגת הודעת הצלחה וניתוב במידת הצורך
    alert("הרישום בוצע בהצלחה! כעת תוכל להתחבר.");
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
