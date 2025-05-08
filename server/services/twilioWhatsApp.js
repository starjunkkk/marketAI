import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // e.g. 'whatsapp:+14155238886'
const fromSmsNumber = process.env.TWILIO_SMS_NUMBER; // e.g. '+1234567890'

export async function sendMessage(to, message) {
  const toWhatsAppNumber = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
  try {
    const messageInstance = await client.messages.create({
      from: fromWhatsAppNumber,
      to: toWhatsAppNumber,
      body: message,
    });
    console.log(`WhatsApp message sent to ${to}: SID ${messageInstance.sid}`);
  } catch (error) {
    console.error(`Failed to send WhatsApp message to ${to}:`, error);
    throw error;
  }
}

export async function sendSmsMessage(to, message) {
  try {
    const messageInstance = await client.messages.create({
      from: fromSmsNumber,
      to: to,
      body: message,
    });
    console.log(`SMS message sent to ${to}: SID ${messageInstance.sid}`);
  } catch (error) {
    console.error(`Failed to send SMS message to ${to}:`, error);
    throw error;
  }
}
