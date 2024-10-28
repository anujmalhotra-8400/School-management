// Function to open the contact form popup 
function openPopup(){
    document.getElementById('contactForm').style.display = 'block';
}
// Function to close the contact form popup
function closePopup() {
    document.getElementById('contactForm').style.display = 'none';
}

// Optional: Close the popup if the user clicks outside of it
window.onclick = function (event) {
    var popup = document.getElementById('contactForm');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
};
// contact us form close

// login page form start
function openForm() {
    document.getElementById("myModal").style.display = "block";
    generateCaptcha();
}

function closeForm() {
    document.getElementById("myModal").style.display = "none";
}

function generateCaptcha() {
    var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        var index = Math.floor(Math.random() * charsArray.length);
        captcha.push(charsArray[index]);
    }
    var captchaString = captcha.join("");
    document.getElementById("captcha").innerText = captchaString;
}

function validateCaptcha() {
    var enteredCaptcha = document.getElementById("captchaInput").value;
    var generatedCaptcha = document.getElementById("captcha").innerText;
    if (enteredCaptcha === generatedCaptcha) {
        return true;
    } else {
        document.getElementById("error-message").style.display = "block";
        return false;
    }
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        closeForm();
    }
}

/* dashboard script start */
document.getElementById("menu-toggle").addEventListener("click", function() {
    let wrapper = document.getElementById("wrapper");
    wrapper.classList.toggle("toggled");
});

/* dashboard script end */



