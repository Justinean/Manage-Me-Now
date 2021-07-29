// This function will log you out of the application.
async function logOut() {
  const response = await fetch('/api/employees/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert("Could not log out, try again.");
  }
};

document.querySelector('#logout').addEventListener('click', logOut);