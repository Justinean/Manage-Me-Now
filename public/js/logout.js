const logOut = async () => {
  const response = await fetch('/api/employees/logout', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logOut);