const newProject = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#newProjectName').nodeValue.trim();

  if (name) {
    const response = await fetch('api/projects/new', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project.');
    }
  }
};

document.querySelector('newProjectForm').addEventListener('submit', newProject);