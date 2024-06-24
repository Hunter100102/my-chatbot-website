// script.js
document.addEventListener('DOMContentLoaded', function () {
    const chatContainer = document.getElementById('chat-container');
    const apiUrl = 'https://my-chatbot-backend.herokuapp.com/query'; // Replace with your Heroku app URL

    async function sendMessage(message) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        appendMessage(data.reply);
    }

    function appendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        chatContainer.appendChild(messageElement);
    }

    // Example: Triggering a message
    sendMessage('Hello, ChatGPT!');
});
