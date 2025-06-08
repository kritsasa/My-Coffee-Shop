const userData = JSON.parse(localStorage.getItem("users")) || [];
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (emailValue === "" || passwordValue === "") {
        alert("Email and Password cannot be empty");
        return
    }

    const user = userData.find(user => user.email === emailValue && user.password === passwordValue);

    if (user) {
        alert(`Welcome back, ${user.name}!`);
        window.location.href = "shop.html";
        form.reset();
    } else {
        alert("Invalid email or password. Please try again.");
    }
})
