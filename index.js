function showPopupForm() {
    var popupForm = document.getElementById("popupForm");
    popupForm.style.display = "block";
}

function closePopupForm() {
    var popupForm = document.getElementById("popupForm");
    popupForm.style.display = "none";
}

// JavaScript to toggle the dropdown content
document.addEventListener("click", function(event) {
    var dropdown = document.querySelector(".dropdown");
    var dropdownContent = document.querySelector(".dropdown-content");
    
    if (event.target.matches(".dropdown-button")) {
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    } else if (!dropdown.contains(event.target)) {
        dropdownContent.style.display = "none";
    }
});