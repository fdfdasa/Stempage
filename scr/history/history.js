document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('messageList');

    // Fetch message history from the server
    fetch('http://localhost:3000/get-messages')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display each message in the message list
            Object.entries(data).forEach(([timestamp, message]) => {
                const messageItem = document.createElement('div');
                messageItem.classList.add('message-item');

                const icon = document.createElement('i');
                icon.classList.add('fas', 'fa-comment', 'message-icon');

                const content = document.createElement('div');
                content.classList.add('message-content');
                content.textContent = message;

                const timestampElement = document.createElement('div');
                timestampElement.classList.add('message-timestamp');
                timestampElement.textContent = new Date(timestamp).toLocaleString();

                messageItem.appendChild(icon);
                messageItem.appendChild(content);
                messageItem.appendChild(timestampElement);
                messageList.appendChild(messageItem);
            });
        })
        .catch(error => {
            console.error('Error fetching message history:', error);
        });
});
