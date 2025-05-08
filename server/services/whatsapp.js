import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }
});

client.on("ready", () => {
  console.log("WhatsApp client is ready!");
});

client.on("auth_failure", (msg) => {
  console.error("Authentication failure:", msg);
});

client.on("disconnected", (reason) => {
  console.log("WhatsApp client disconnected:", reason);
});

client.initialize();

export async function sendMessage(number, message) {
  const chatId = number.includes("@c.us") ? number : number + "@c.us";
  try {
    await client.sendMessage(chatId, message);
    console.log(`Message sent to ${number}`);
  } catch (error) {
    console.error(`Failed to send message to ${number}:`, error);
    throw error;
  }
}

export { client };
