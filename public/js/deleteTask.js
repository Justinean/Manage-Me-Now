async function deleteTask(event) {
  const id = event.target.getAttribute('data-id');
  const projectId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  const response = await fetch(`/api/tasks/delete/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/project/${projectId}`);
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#deleteTaskTrash').addEventListener('click', deleteTask);