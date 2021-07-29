// This function will delete an entire project.
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

// This function will delete an entire task.
async function deleteTask(event) {
  const id2 = event.target.getAttribute('data-id');
  const projectId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  const response = await fetch(`/api/tasks/delete/${id2}`, {
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
  const id3 = event.target.getAttribute('data-id');
  const projectId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  const response = await fetch(`/api/projects/remove/employee/${id3}`, {
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

const employeeBtns = document.querySelectorAll('.deleteEmployeeBtn');
employeeBtns.forEach((currentBtn) => {
  currentBtn.addEventListener('click', removeEmployee);
});

const taskBtns = document.querySelectorAll('.deleteTaskBtn');
taskBtns.forEach((currentBtn) => {
  currentBtn.addEventListener('click', deleteTask);
});

document.querySelector('#deleteProjectBtn').addEventListener('click', deleteProject);