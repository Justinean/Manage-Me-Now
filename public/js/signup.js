const signUp = async (event) => {
  event.preventDefault();

  console.log("signup js");

  const email = document.querySelector('#signUpEmail').value.trim();
  const username = document.querySelector('#signUpUsername').value.trim();
  const manager = document.querySelector('#managerCheck').value;
  const password = document.querySelector('#signUpPassword').value.trim();

  if (email && username && manager !== undefined && password) {
    const response = await fetch('/api/employee/signup', {
      method: 'POST',
      body: JSON.stringify({ email, username, manager, password }),
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

document.addEventListener("DOMContentLoaded", () => {
  let object = document.querySelector("#managerCheck")
  object.addEventListener("click", () => {
    console.log(document.querySelector(":checked"))
    if (document.querySelector(":checked") === null) {
      object.value = false
    } else {
      object.value = true
    }
  });
});

document.querySelector('#signUpForm').addEventListener('submit', signUp);