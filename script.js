const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const customReplies = [
  {
    match: /halina is|is halina|halena is|is halena/i,
    reply: "BANGER AI.",
  },
  {
    match: /halina|halena/i,
    reply: "Bogan BANGER AI.",
  },
  { match: /mew is|is mew/i, reply: "Antisocial Furniture Builder!" },
  { match: /ratedrko/i, reply: "Oh, you mentioned that massive forehead" },
  { match: /is sleepy|sleepy is/i, reply: "Oh, we love Sleepy!" },
  {
    match: /fxplays/i,
    reply: "FX really is the goat, always win over me in Fortnut Festivals.",
  },
  {
    match: /is xera|xera is/i,
    reply: "Xerafena is a lovely streamer I barely have time to watch.",
  },
  {
    match: /xera/i,
    reply: "Xerafena is a lovely streamer!",
  },
  {
    match: /milo/i,
    reply:
      "Milo is the bestest boy on the whole planet. Also Mew's role model.",
  },
  {
    match: /what is pepsi|is pepsi good|pepsi/i,
    reply:
      "Pepsi is a poison and should be avoided, if you are not actively trying to grow your forehead.",
  },
  {
    match: /perth/i,
    reply:
      "I see you mentioned the city of Perth. Did you perhaps mean a reasonable place like Melbourne instead?",
  },
];

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

  for (const rule of customReplies) {
    if (rule.match.test(trimmed)) {
      return rule.reply;
    }
  }

  if (trimmed.endsWith("!")) return "BANGER!";
  if (trimmed.endsWith("?")) return "BANGER?";
  if (trimmed.endsWith(".")) return "BANGER.";
  return "BANGER";
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
