const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
})

function checkInputs() {
    const userNameValue = userName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    if (userNameValue === "") {
        alert("Username cannot be empty");
    }
    else if (!emailValue.includes("@") || !emailValue.includes(".")) {
        alert("Email is not valid");
    }
    else if (passwordValue.length < 6) {
        alert("Password must be at least 6 characters long");
    }
    else if (passwordValue !== confirmPasswordValue) {
        alert("Passwords do not match");
    }
    else {
        const userData = {
            name: userNameValue,
            email: emailValue,
            password: passwordValue,
        };

        // ดึงข้อมูลเดิมจาก localStorage
        const existing = JSON.parse(localStorage.getItem("users")) || [];

        if (existing.some(user => user.email === emailValue)) {
            alert("Email already exists. Please use a different email.");
            return;
        }
        alert("Registration successful!");

        // เพิ่มคนใหม่เข้าไป
        existing.push(userData);

        // เซฟกลับ
        localStorage.setItem("users", JSON.stringify(existing));

        form.reset();
    }
}