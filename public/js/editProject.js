// This function will delete an entire project.
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

// This function will delete an entire task.
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

// This function will remove an employee from a project.
async function removeEmployee(event) {
  const id = event.target.getAttribute('data-id');
  const projectId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  const response = await fetch(`/api/projects/remove/employee/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ projectId }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`/project/${projectId}`);
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#deleteEmployeeBtn').addEventListener('click', removeEmployee);
document.querySelector('#deleteProjectBtn').addEventListener('click', deleteProject);
document.querySelector('#deleteTaskBtn').addEventListener('click', deleteTask);