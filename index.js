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


async function registerUser() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Add user to the client-side "database"
    const result = await createUser(name, password, email);
    if(result == 1)
    {
        toggle();
    }
    else if(result == 2)
    {
        console.log('ERROR MUTHA FUCKA');
    }
    
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the user exists in the client-side "database"
    const result = await Authlogin(email, password);

    if(result == 1)
    {
        console.log('Success');
        toggle();
    }
    else if(result == 2)
    {
        console.log('ERROR MUTHA FUCKA');

    }
}       





async function createUser(Username, Password, Email) {
    const userData = {
      Username: Username,
      Password: Password,
      Email: Email
    };
  
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      const accessToken = data.accessToken;
      console.log('User created. Access Token: ' + accessToken);
      
      //Store in local storage
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      console.log('TAEKA GET USER ID OPENING.... ' + Username);

      return 1;
      
    } catch (error) {
      console.error('Error creating user:', error);
      return 2;
      throw error; // Re-throw the error to be caught by the caller.
    }
  }

  async function Authlogin(Email, Password) {
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Email, Password }),
        });
    
        const data = await response.json();
        const accessToken = data.accessToken;
  
        if (accessToken === 'invalid') {
          // Display an error message to the user
        //   const errorMessage = document.getElementById('error-message');
        //   errorMessage.textContent = 'Invalid email or password';
        //   errorMessage.style.display = 'block';
            return 2;
          throw new Error('Invalid email or password');
        }
        else
        {

        console.log(accessToken);
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        return 1;
        }
        // Continue with further actions (e.g., navigating to protected pages, etc.)
        // ...
      } catch (error) {
        // Handle login errors
        console.error('Login failed:', error);
        return 2;
      }
    }
   
  