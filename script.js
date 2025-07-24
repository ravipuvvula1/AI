const apiKey = "PASTE_YOUR_OPENAI_API_KEY_HERE";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;
  appendMessage("You", message);
  input.value = "";

  const reply = await getAIResponse(message);
  appendMessage("AI", reply);
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const message = document.createElement("p");
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful, creative, and supportive AI assistant. You can help with schoolwork, generate memes, stories, recipes, business names, and be a fun chatbot."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
