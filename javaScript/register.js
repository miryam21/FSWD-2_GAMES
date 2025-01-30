// פונקציה לטיפול ברישום משתמשים
function registerUser(event) {
    // שליפת הערכים שהוזנו
    const username = document.getElementById("username").value; 
    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value; 
    const confirmPassword = document.getElementById("confirmPassword").value; 

   
    if (password !== confirmPassword) {
        alert("הסיסמאות אינן תואמות. אנא נסה שוב.");
        return; // עצירת ביצוע הפונקציה אם הסיסמאות לא תואמות
    }

    // שליפת משתמשים קיימים מה-Local Storage
    const existingUsersStr = localStorage.getItem("users");
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];

 
    if (existingUsers.some(user => user.username === username)) {
        alert("שם המשתמש כבר תפוס. אנא בחר שם אחר.");
        return;
    }

    // יצירת אובייקט משתמש עם הפרטים שהוזנו
    const user = {
        username: username,
        email: email,
        password: password,
        maxScoreBaloon: 0,
        maxScoreXO: 0
    };
    console.log("משתמש נרשם:", user);

    // שמירת נתוני המשתמש ב-Local Storage
    saveUserToLocalStorage(user);

    alert("הרישום בוצע בהצלחה! כעת תוכל להתחבר.");
    window.location.href = "login.html";
}


function saveUserToLocalStorage(user) {
    
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
