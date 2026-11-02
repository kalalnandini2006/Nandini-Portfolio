
"use strict";

console.log("Portfolio JavaScript is working!");

// 1. DARK / LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
        themeToggle.textContent = isDark
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
    }

    localStorage.setItem(
        "portfolioTheme",
        isDark ? "dark" : "light"
    );
}

// First visit: Light Mode
// Restore previously selected theme
const savedTheme = localStorage.getItem("portfolioTheme");

applyTheme(savedTheme === "dark");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const isDark = !document.body.classList.contains("dark-mode");
        applyTheme(isDark);
    });
}


// 2. CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const status = document.getElementById("formStatus");

    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }

    function clearFormErrors() {
        showError("nameError", "");
        showError("emailError", "");
        showError("messageError", "");

        status.textContent = "";
        status.className = "";
    }

    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateForm(event) {

        event.preventDefault();
        clearFormErrors();

        let isValid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Name validation
        if (name.length < 2) {
            showError(
                "nameError",
                "Please enter your name (at least 2 characters)."
            );
            isValid = false;
        }

        // Email validation
        if (!emailPattern.test(email)) {
            showError(
                "emailError",
                "Please enter a valid email address."
            );
            isValid = false;
        }

        // Message validation
        if (message.length < 10) {
            showError(
                "messageError",
                "Message must contain at least 10 characters."
            );
            isValid = false;
        }

        // Form result
        if (isValid) {

            status.textContent =
                "Validation successful! Your form is ready.";

            status.className = "success";

            contactForm.reset();

        } else {

            status.textContent =
                "Please correct the errors above.";

            status.className = "error";
        }
    }

    contactForm.addEventListener("submit", validateForm);


    // 3. REAL-TIME ERROR CLEARING

    nameInput.addEventListener("input", function () {

        if (nameInput.value.trim().length >= 2) {
            showError("nameError", "");
        }
    });

    emailInput.addEventListener("input", function () {

        if (emailPattern.test(emailInput.value.trim())) {
            showError("emailError", "");
        }
    });

    messageInput.addEventListener("input", function () {

        if (messageInput.value.trim().length >= 10) {
            showError("messageError", "");
        }
    });
}

console.log("Portfolio JavaScript loaded successfully!");
