// This function will create a new task.
async function newTask(event) {
  event.preventDefault();

  const name = document.querySelector('#newTaskInput').value.trim();
  const project_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  const employee_id = document.querySelector(':checked').value;

  const response = await fetch(`/api/tasks/new/${project_id}`, {
    method: 'POST',
    body: JSON.stringify({ name, employee_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/project/${project_id}`);
  } else {
    alert('Failed to create a new task.');
  }
};

document.querySelector('#newTaskForm').addEventListener('submit', newTask);