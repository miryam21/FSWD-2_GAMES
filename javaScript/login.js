document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // מניעת טעינה מחדש של הדף

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // קבלת המשתמשים מ- localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // חיפוש המשתמש המתאים
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert("Login successful!");
            window.location.href = "gamesPage.html"; // מעבר לעמוד הראשי לאחר התחברות
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});
