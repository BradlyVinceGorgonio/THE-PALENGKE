// Get references to the circle and popup-form elements
const circle = document.getElementById('circle');
const popupForm = document.getElementById('popupForm');

// Add a click event listener to the circle element
circle.addEventListener('click', () => {
    // Toggle the display property of the popup-form element
    if (popupForm.style.display === 'block') {
        popupForm.style.display = 'none';
    } else {
        popupForm.style.display = 'block';
    }
});

// Function to close the popup form
function closePopupForm() {
    popupForm.style.display = 'none';
}
// Filter
document.addEventListener("click", function(event) {
    var dropdown = document.querySelector(".dropdown");
    var dropdownContent = document.querySelector(".dropdown-content");
    
    if (event.target.matches(".dropdown-button")) {
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    } else if (!dropdown.contains(event.target)) {
        dropdownContent.style.display = "none";
    }
});
function toggle()
{
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    

    var popup = document.getElementById('popup');
    popup.classList.toggle('active');


}
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");

});


