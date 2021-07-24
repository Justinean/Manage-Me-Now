const logIn = async (event) => {
    event.preventDefault();
      const username = document.querySelector('#logInUsername').value.trim();
      const password = document.querySelector('#logInPassword').value.trim();
    
      if (username && password) {
        const response = await fetch('/api/employee/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response.ok) {
            document.location.replace('/dashboard');
            console.log("You logged in!");
        } else {
            alert(response.statusText);
        }
      } else {
          alert("Please fill in all feilds")
      }
    }
    
    document.querySelector('#logInForm').addEventListener('submit', logIn);
