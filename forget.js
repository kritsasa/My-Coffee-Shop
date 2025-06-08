const userData = JSON.parse(localStorage.getItem("users")) || [];
const form = document.getElementById("form");
const email = document.getElementById("email");
const submit = document.getElementById("submit");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();

    if (submit.textContent === "Submit") {
        const checkEmail = userData.find(email => email.email === emailValue);
        if (!checkEmail) {
            alert("Email not found. Please register first.");
            form.reset();
            return;
        }

        const emailInput = document.querySelector(".input-group");
        emailInput.style.display = "none";

        const inputPassword = document.createElement("div")
        inputPassword.classList.add("input-group");
        inputPassword.innerHTML = `
            <label for="password"><i class="fa-solid fa-key" style="color: #ffffff; font-size: 15px;"></i>&nbsp;&nbsp;New Password</label><br>
            <input type="password" id="password">
        `
        form.insertBefore(inputPassword, submit);

        const inputConfirmPassword = document.createElement("div")
        inputConfirmPassword.classList.add("input-group");
        inputConfirmPassword.innerHTML = `
            <label for="confirmPassword"><i class="fa-solid fa-key" style="color: #ffffff; font-size: 15px;"></i>&nbsp;&nbsp;Confirm Password</label><br>
            <input type="password" id="confirmPassword">
        `
        form.insertBefore(inputConfirmPassword, submit);

        submit.textContent = "Change Password";
    }   
    else if (submit.textContent === "Change Password") {
        const passwordValue = document.getElementById("password").value.trim();
        const confirmPasswordValue = document.getElementById("confirmPassword").value.trim();

        if (passwordValue.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        if (passwordValue !== confirmPasswordValue) {
            alert("Passwords do not match");
            return;
        }

        const userIndex = userData.findIndex(user => user.email === emailValue);
        if (userIndex !== -1) {
            userData[userIndex].password = passwordValue;
            localStorage.setItem("users", JSON.stringify(userData));
            alert("Password changed successfully!");
            window.location.href = "login.html";
        } else {
            alert("Error updating password. Please try again.");
            form.reset();
        }
    }


})