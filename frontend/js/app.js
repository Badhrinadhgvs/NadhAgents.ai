document.addEventListener('DOMContentLoaded', () => {
  const agentForm = document.getElementById('agent-form');
  const taskInput = document.getElementById('task');
  const agentList = document.getElementById('agents');

  // Load agents from backend
  async function loadAgents() {
    try {
      const response = await fetch('http://localhost:5000/api/agents');
      const agents = await response.json();
      agentList.innerHTML = '';
      agents.forEach((agent, index) => {
        const li = document.createElement('li');
        li.className = 'agent-item';
        li.innerHTML = `
          <span>${agent.task} (Status: ${agent.status})</span>
          <button class="delete-btn" data-id="${agent.id}" data-index="${index}">Delete</button>
        `;
        agentList.appendChild(li);
      });

      // Add delete event listeners
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-id');
          await deleteAgent(id);
        });
      });
    } catch (error) {
      console.error('Error loading agents:', error);
    }
  }

  // Handle form submission
  agentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
      try {
        const response = await fetch('http://localhost:5000/api/agents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ task })
        });
        if (response.ok) {
          taskInput.value = '';
          await loadAgents();
        } else {
          console.error('Error creating agent:', await response.text());
        }
      } catch (error) {
        console.error('Error creating agent:', error);
      }
    }
  });

  // Delete an agent
  async function deleteAgent(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/agents/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await loadAgents();
      } else {
        console.error('Error deleting agent:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  }

  // Initial load
  loadAgents();
});