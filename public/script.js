const form = document.querySelector('form');
const input = document.querySelector('#message');
const chatbox = document.querySelector('#chatbox');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  input.value = '';

  const response = await sendMessage(userMessage);
  displayMessage('You', userMessage);
  displayMessage('Bot', response);
});

async function sendMessage(message) {
  try {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    });

    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error('Error:', error);
    return 'Error: Unable to get response from server.';
  }
}

function displayMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(messageElement);
}
