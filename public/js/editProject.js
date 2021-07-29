async function deleteProject(event) {
  const id1 = event.target.getAttribute('data-id');
  const response = await fetch(`/api/projects/delete/${id1}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

async function deleteTask(event) {
  const id2 = event.target.getAttribute('data-id');
  const projectId1 = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  const response = await fetch(`/api/tasks/delete/${id2}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/project/${projectId1}`);
  } else {
    alert(response.statusText);
  }
};

async function removeEmployee(event) {
  const id3 = event.target.getAttribute('data-id');
  const project_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  const response = await fetch(`/api/projects/remove/employee/${id3}`, {
    method: 'DELETE',
    body: JSON.stringify({ project_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`/project/${project_id}`);
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteEmployeeBtn').addEventListener('click', removeEmployee);
document.querySelector('#deleteProjectBtn').addEventListener('click', deleteProject);
document.querySelector('#deleteTaskTrash').addEventListener('click', deleteTask);