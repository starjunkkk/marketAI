import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateCaptions } from "./services/openai.js";
import { sendMessage, sendSmsMessage } from "./services/twilioWhatsApp.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint to generate captions and send WhatsApp and SMS messages
app.post("/generate-and-send", async (req, res) => {
  const { productName, price, category, numbers } = req.body;

  if (!productName || !price || !category || !Array.isArray(numbers)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const captions = await generateCaptions(productName, price, category);

    // Send each caption to each number via WhatsApp and SMS
    for (const number of numbers) {
      for (const caption of captions) {
        await sendMessage(number, caption);
        await sendSmsMessage(number, caption);
        console.log(`Sent caption to ${number} via WhatsApp and SMS`);
      }
    }

    res.json({ captions });
  } catch (error) {
    console.error("Error in /generate-and-send:", error);
    if (error.response) {
      console.error("OpenAI response error data:", error.response.data);
    }

    // Prepare error message placeholder for WhatsApp and SMS
    const errorCode = error.status || error.code || "Error";
    const errorMessage = `AI prompt error: ${errorCode}`;

    // Send placeholder message to each number via WhatsApp and SMS
    for (const number of numbers) {
      try {
        await sendMessage(number, errorMessage);
        await sendSmsMessage(number, errorMessage);
        console.log(`Sent error placeholder message to ${number} via WhatsApp and SMS`);
      } catch (sendError) {
        console.error(`Failed to send error message to ${number}:`, sendError);
      }
    }

    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// New endpoint to send a WhatsApp message with prompt result on button press
app.post("/send-message", async (req, res) => {
  const { number, prompt } = req.body;

  if (!number || !prompt) {
    return res.status(400).json({ error: "Missing number or prompt in request body" });
  }

  try {
    // Send the prompt as the message directly without generating captions
    await sendMessage(number, prompt);
    console.log(`Sent message to ${number}`);

    res.json({ success: true, message: prompt });
  } catch (error) {
    console.error("Error in /send-message:", error);

    // Send error message to the number
    const errorMessage = error.message || "Internal server error";
    try {
      await sendMessage(number, `Error: ${errorMessage}`);
      console.log(`Sent error message to ${number}`);
    } catch (sendError) {
      console.error(`Failed to send error message to ${number}:`, sendError);
    }

    res.status(500).json({ error: errorMessage });
  }
});

app.post("/send-sms", async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: "Missing number or message in request body" });
  }

  try {
    const { sendSmsMessage } = await import("./services/twilioWhatsApp.js");
    await sendSmsMessage(number, message);
    console.log(`Sent SMS message to ${number}`);
    res.json({ success: true, message });
  } catch (error) {
    console.error("Error in /send-sms:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
