async function addEmployee(event) {
  event.preventDefault();

  console.log("-------------------------------");

  const employee_id = document.querySelector(':checked').value;
  const project_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  console.log(employee_id);
  const response = await fetch(`/api/projects/edit/${project_id}`, {
    method: 'PUT',
    body: JSON.stringify({ employee_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/project/${project_id}`);
  } else {
    alert('Failed to add employee.');
  }
};

document.querySelector('#newEmployeeForm').addEventListener('submit', addEmployee);