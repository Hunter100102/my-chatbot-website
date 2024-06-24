// script.js
document.addEventListener('DOMContentLoaded', function () {
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const apiUrl = 'https://my-chatbot-backend.herokuapp.com/query'; // Replace with your Heroku app URL

    sendButton.addEventListener('click', function () {
        const message = messageInput.value.trim();
        if (message === '') return;

        appendMessage(message, true); // Show user message in the chat

        sendMessage(message).then(response => {
            appendMessage(response.reply, false); // Show bot's reply in the chat
        });

        messageInput.value = '';
    });

    async function sendMessage(message) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        return data;
    }

    function appendMessage(message, isUser) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.innerText = message;
        chatContainer.appendChild(messageElement);

        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
