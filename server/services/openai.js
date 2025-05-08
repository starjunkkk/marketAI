import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCaptions(productName, price, category) {
  const prompt = `Saya adalah pelaku UMKM yang menjual ${productName} seharga ${price} dalam kategori ${category}. Buatkan saya 3 caption promosi menarik untuk media sosial (Instagram/WhatsApp) dengan gaya santai dan cocok untuk pembeli di Indonesia.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
    n: 1,
    temperature: 0.7,
  });

  const text = response.choices[0].message.content;

  // Split captions by line breaks or numbers
  const captions = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !/^\d+[\.\)]/.test(line));

  return captions;
}
