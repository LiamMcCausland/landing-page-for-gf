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
        // Store the message and the current timestamp in localStorage
        localStorage.setItem('lastMessage', randomMessage);
        localStorage.setItem('lastFetchTime', Date.now().toString());
        document.getElementById('messageDiv').textContent = randomMessage + " :))";
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayMessage() {
    const lastMessage = localStorage.getItem('lastMessage');
    const lastFetchTime = localStorage.getItem('lastFetchTime');
    const currentTime = Date.now();
    const oneDayInMillis = 86400000;

    // Check if 24 hours have passed since the last fetch
    if (!lastMessage || !lastFetchTime || currentTime - parseInt(lastFetchTime) >= oneDayInMillis) {
        fetchMessage();
    } else {
        document.getElementById('messageDiv').textContent = lastMessage + " :))";
    }
}

// Fetch and display a random message when the page loads
window.onload = displayMessage;
