async function sendMessage() {
    const inputElement = document.getElementById('chat-input');
    const outputElement = document.getElementById('chat-output');

    const userMessage = inputElement.value;
    if (!userMessage) return;

    // Display the user's message
    outputElement.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    inputElement.value = '';

    // Send the user's message to the backend
    const response = await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userMessage })
    });

    const data = await response.json();

    // Display the bot's response
    const botMessage = data.choices && data.choices.length > 0 ? data.choices[0].text : 'Sorry, I didn\'t understand that.';
    outputElement.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
}
