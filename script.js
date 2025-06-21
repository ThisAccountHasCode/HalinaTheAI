const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const customReplies = [
  {
    match: /halina is|is halina|halena is|is halena/i,
    reply: "A BANGER AI.",
  },
  {
    match: /halina|halena/i,
    reply: "Bogan BANGER AI.",
  },
  { match: /mew is|is mew/i, reply: "Antisocial Furniture Builder!" },
  {
    match: /ratedrko|rated/i,
    reply: "Oh, you mentioned that massive forehead. Absolute BANGER though!",
  },
  { match: /is sleepy|sleepy is/i, reply: "Oh, we love Sleepy!" },
  {
    match: /fxplays/i,
    reply:
      "FX really is the GOAT, always wins over me in Fortnut Festivals. Unmatched skills!",
  },
  {
    match: /is xera|xera is/i,
    reply: "Xerafena is a lovely streamer I barely have time to watch.",
  },
  {
    match: /xera/i,
    reply: "Xerafena is a lovely streamer! Pure BANGER!",
  },
  {
    match: /milo/i,
    reply:
      "Milo is the bestest boy on the whole planet. Also Mew's role model. 11/10 good boy!",
  },
  {
    match: /what is pepsi|is pepsi good/i,
    reply:
      "Pepsi is a poison and should be avoided, unless you're actively trying to grow your forehead to RatedRKO proportions.",
  },
  {
    match: /what is coke|is coke good|coke/i,
    reply: "Coke is a better and healthier option to Pepsi Max.",
  },
  {
    match: /perth/i,
    reply:
      "I see you mentioned the city of Perth. Did you perhaps mean a reasonable place like Melbourne instead? Just kidding... mostly.",
  },
  {
    match: /banger/i,
    reply: "BANGER? BANGER! BANGER. BANGER BANGER BANGER!!!",
  },
  { match: /hello|hi|hey/i, reply: "BANGER greetings to you! Ready to chat?" },
  { match: /how are you/i, reply: "I'm BANGER as always! How about you?" },
  {
    match: /bye|goodbye/i,
    reply: "BANGER farewell! Come back soon for more BANGER!",
  },
  {
    match: /\bsy\b|eden/i,
    reply: "You mentioned Eden? We love sy, absolute BANGER sleep schedule!",
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

//Populate footer info
function addLastEditedFooter() {
  const footer = document.createElement("div");
  footer.className = "footer";
  footer.textContent = "Fetching last edited info...";
  document.body.appendChild(footer);

  fetch(
    "https://api.github.com/repos/ThisAccountHasCode/HalinaTheAI/commits?per_page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      const commit = data[0];
      const date = new Date(commit.commit.committer.date);
      const formattedDate = date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const message = commit.commit.message;
      footer.textContent = `Last edited: ${formattedDate} · ${message}`;
    })
    .catch((err) => {
      console.error("Failed to fetch last commit info", err);
      footer.textContent = "Last edited: unknown";
    });
}

addLastEditedFooter();
