import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import express from "express";
import cors from "cors";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = 5000;

const HF_API_KEY = process.env.HF_API_KEY;
if (!HF_API_KEY) {
  console.error("Hugging Face API key is missing!");
  process.exit(1);
}

app.use(express.json());
app.use(cors());  

app.post("/api/proxy", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing 'text' in request body" });
    }

    // Send request to Hugging Face model
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/unitary/toxic-bert",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extracting predictions from response
    const predictions = response.data[0]; // Model returns an array of predictions
    console.log("Model Response:", predictions);

    // Checking the toxic score to determine if the message is offensive or not
    const toxicScore = predictions[0]?.score || 0;
    
    // Setting a threshold for considering the text offensive
    const isOffensive = toxicScore > 0.5;  // You can adjust the threshold as needed

    // Respond back with the result
    res.json({ isOffensive });
  } catch (error) {
    console.error("Error in proxy server:", error.response?.data || error.message);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
