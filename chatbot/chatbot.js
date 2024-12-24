let chatbotResponses = [];

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


let userContext = {};

function getBotResponse(userInput) {
    const input = userInput.toLowerCase();

    
    if (input.includes("my name is")) {
        const namePart = input.split("my name is")[1]?.trim(); // Extract the part after "my name is"
        if (namePart && namePart.length > 0) {
            const name = namePart.split(" ")[0]; // Extract only the first word as the name
            userContext.name = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
            return `Nice to meet you, ${userContext.name}!`;
        } else {
            return "Sorry, I didn't catch your name. Could you repeat it?";
        }
    }

    
    if (input.includes("what's my name")) {
        return userContext.name
            ? `Your name is ${userContext.name}!`
            : "I don't know your name yet. Can you tell me?";
    }

    
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
                return num2 !== 0
                    ? `The result is ${num1 / num2}.`
                    : "Division by zero is not allowed.";
            default:
                return "I couldn't understand the math operation.";
        }
    }

    // Check for recipe-related queries
    if (input.includes("recipe")) {
        for (const entry of chatbotResponses) {
            if (
                entry.keywords.includes("recipe") &&
                entry.keywords.some(keyword => input.includes(keyword))
            ) {
                return entry.response;
            }
        }
        return "I couldn't find a recipe for that dish. Can you try something else?";
    }

    
    for (const entry of chatbotResponses) {
        if (entry.keywords.some(keyword => input.includes(keyword))) {
            return entry.response;
        }
    }

    // Default response for unrecognized input
    return "I don't know how to respond to that.";
}


function appendMessage(content, className) {
    const chatBody = document.getElementById("chatBody");
    const messageElement = document.createElement("div");
    messageElement.className = className;
    messageElement.textContent = content;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
}

function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();

    if (userInput === "") return;

    appendMessage(userInput, "user-message");
    document.getElementById("userInput").value = "";

    const botResponse = getBotResponse(userInput);
    appendMessage(botResponse, "bot-message");
}

document.getElementById("userInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);

  // Optional: Change the icon of the toggle button
  const toggleButton = document.querySelector('.theme-toggle');
  toggleButton.textContent = newTheme === 'light' ? '🌞' : '🌙';
}

document.documentElement.setAttribute('data-theme', 'dark');
