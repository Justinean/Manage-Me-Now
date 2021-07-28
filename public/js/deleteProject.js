async function deleteProject(event) {
  const id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/projects/delete/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#deleteProjectBtn').addEventListener('click', deleteProject);