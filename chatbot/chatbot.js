let chatbotResponses = [];

// Fetch the JSON data
fetch("responses.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load responses.json");
        }
        return response.json();
    })
    .then(data => {
        chatbotResponses = data;
    })
    .catch(error => {
        console.error("Error loading responses:", error);
    });

// Function to find a bot response
function getBotResponse(userInput) {
  const input = userInput.toLowerCase();
  
  // Check for basic math operations
  const mathRegex = /(\d+)\s*([\+\-\*\/])\s*(\d+)/;
  const match = input.match(mathRegex);
  if (match) {
      const num1 = parseFloat(match[1]);
      const operator = match[2];
      const num2 = parseFloat(match[3]);
      switch (operator) {
          case "+":
              return `The result is ${num1 + num2}.`;
          case "-":
              return `The result is ${num1 - num2}.`;
          case "*":
              return `The result is ${num1 * num2}.`;
          case "/":
              return num2 !== 0 ? `The result is ${num1 / num2}.` : "Division by zero is not allowed.";
      }
  }

  if (input.includes("recipe")) {
    for (const entry of chatbotResponses) {
        if (entry.keywords.includes("recipe") && entry.keywords.some(keyword => input.includes(keyword))) {
            return entry.response;
        }
    }
    return "I couldn't find a recipe for that dish. Can you try something else?";
}

  // Match keywords in JSON data
  for (const entry of chatbotResponses) {
      if (entry.keywords.some(keyword => input.includes(keyword))) {
          return entry.response;
      }
  }

  return "I don't know how to respond to that.";
}


// Function to append messages to the chat body
function appendMessage(content, className) {
    const chatBody = document.getElementById("chatBody");
    const messageElement = document.createElement("div");
    messageElement.className = className;
    messageElement.textContent = content;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
}

// Function to handle user message and bot response
function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();

    if (userInput === "") return;

    appendMessage(userInput, "user-message");
    document.getElementById("userInput").value = "";

    const botResponse = getBotResponse(userInput);
    appendMessage(botResponse, "bot-message");
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
