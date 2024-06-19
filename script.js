async function fetchMessage() {
    try {
        const response = await fetch('messages.txt');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        const messages = data.split('\n');
        const randomIndex = Math.floor(Math.random() * messages.length);
        const randomMessage = messages[randomIndex].trim();
        document.getElementById('messageDiv').textContent = randomMessage + " :))";
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Fetch and display a random message when the page loads
window.onload = fetchMessage;