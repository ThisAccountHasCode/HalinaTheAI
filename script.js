const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessageBlock(username, text, isUser, isTyping = false) {
  const block = document.createElement("div");
  block.className = `message-block ${isUser ? "user-block" : "bot-block"}`;

  const name = document.createElement("div");
  name.className = "username";
  name.textContent = username;

  const bubble = document.createElement("div");
  bubble.className = `message ${isUser ? "user" : "bot"}`;
  if (isTyping) bubble.classList.add("typing-indicator");
  bubble.textContent = text;

  block.appendChild(name);
  block.appendChild(bubble);
  chat.appendChild(block);
  chat.scrollTop = chat.scrollHeight;

  return block;
}

function getBangerResponse(inputText) {
  const trimmed = inputText.trim();
  if (trimmed.endsWith("!")) return "Banger!";
  if (trimmed.endsWith("?")) return "Banger?";
  if (trimmed.endsWith(".")) return "Banger.";
  return "Banger";
}

function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessageBlock("You", userText, true);
  input.value = "";

  const typingBlock = addMessageBlock(
    "Halina the AI",
    "typing...",
    false,
    true
  );

  setTimeout(() => {
    chat.removeChild(typingBlock);
    const reply = getBangerResponse(userText);
    addMessageBlock("Halina the AI", reply, false);
  }, 1000);
}

// Submit with Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Submit with Send button
sendBtn.addEventListener("click", sendMessage);
