// Function to append messages to the chat body
function appendMessage(content, className) {
  const chatBody = document.getElementById("chatBody");
  const messageElement = document.createElement("div");
  messageElement.className = className;
  messageElement.textContent = content;
  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
}

// Function to handle sending user message and bot response
function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim();
  
  if (userInput === "") return; // Ignore empty input

  appendMessage(userInput, "user-message");
  document.getElementById("userInput").value = ""; // Clear input

  setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      appendMessage(botResponse, "bot-message");
  }, 500); // Simulated delay for bot response
}

// Function to generate bot responses based on user input
function getBotResponse(input) {
  const responses = {
      "hello": "Hi there! How can I help you?",
      "hi": "Hello! What would you like to know?",
      "how are you": "I'm just a bot, but thanks for asking!",
      "help": "Sure, I'm here to assist you. Ask me anything!",
  };

  // Convert input to lowercase to make responses case-insensitive
  const lowerInput = input.toLowerCase();

  // Find a keyword-based response
  for (const key in responses) {
      if (lowerInput.includes(key)) {
          return responses[key];
      }
  }

  return "Sorry, I didn't understand that. Could you try rephrasing?";
}

// Allow Enter key to send the message
document.getElementById("userInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
      sendMessage();
  }
});
// chatbot.js
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);

  // Optional: Change the icon of the toggle button
  const toggleButton = document.querySelector('.theme-toggle');
  toggleButton.textContent = newTheme === 'light' ? '🌞' : '🌙';
}

// Set initial theme
document.documentElement.setAttribute('data-theme', 'dark');
