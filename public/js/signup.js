const signUp = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#signUpEmail').value.trim();
  const username = document.querySelector('#signUpUsername').value.trim();
  let is_manager;
  if (document.querySelector(":checked") === null) {
    is_manager = false
  } else {
    is_manager = true
  }
  const password = document.querySelector('#signUpPassword').value.trim();

  if (email && username /* &&  *//* is_manager */ /* !== undefined */ && password) {
    const response = await fetch('/api/employees/signup', {
      method: 'POST',
      body: JSON.stringify({ email, username, is_manager, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
      console.log("Created User");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Please fill in all feilds")
  }
}

document.querySelector('#signUpForm').addEventListener('submit', signUp);