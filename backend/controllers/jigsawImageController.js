import https from "https";
import axios from 'axios'; 
import jigsawImageModel from "../models/jigsawImageModel.js";


class JigsawImageController {
  static async generateAndGetImage(req, res) {
    // const prompt = req.body.prompt || req.params.festival;
    // console.log(prompt)

    // if (!prompt) {
    //   return res.status(400).json({ error: "Prompt is required" });
    // }

    const now = new Date();
    const month = now.toISOString().slice(0, 7); // "YYYY-MM"

    // Define default monthly prompts (can extend)
    const monthPrompts = {
      "01": "Colorful Sankranti/Pongal festival with kites and rangoli",
      "02": "Valentine’s Day theme with hearts and roses",
      "03": "Holi festival with vibrant colors and joy",
      "04": "Eid al-Fitr celebration with families, food, and festive lights",
      "05": "Buddha Purnima with serene Buddha statues and lotus flowers",
      "06": "International Yoga Day with people doing yoga outdoors",
      "07": "Rath Yatra festival with chariots and crowds celebrating",
      "08": "Independence Day celebration with flags and parades",
      "09": "Ganesh Chaturthi with idol and decorations",
      "10": "Dussehra with effigy and festive setup",
      "11": "Children’s Day with joyful kids playing",
      "12": "Christmas with tree, snow, and decorations"
    };

    const monthKey = now.toISOString().slice(5, 7); // "MM"
    const prompt = monthPrompts[monthKey] || "Beautiful festival or seasonal scene";

    try {
      const existing = await jigsawImageModel.findOne({ month });
      if (existing) {
        return res.json({ image: `data:image/png;base64,${existing.imageBase64}` });
      }

      const response = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        { prompt },
        {
          headers: {
            "x-api-key": process.env.CLIPDROP_API_KEY,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      const base64Image = Buffer.from(response.data, "binary").toString("base64");
    
      // Save to DB
      const newImage = new jigsawImageModel({ month, prompt, imageBase64: base64Image });
      await newImage.save();
      
      // res.json({ image: `data:image/png;base64,${base64Image}` });
      const justGenerated = await jigsawImageModel.findOne({ month });
      return res.json({ image: `data:image/png;base64,${justGenerated.imageBase64}` })

    } catch (error) {
      console.error("Clipdrop API error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to generate image" });
    }
  }
}

export default JigsawImageController;



// // Create HTTPS agent that bypasses SSL verification (for development only)
// const agent = new https.Agent({  
//   rejectUnauthorized: false
// });

// const PEXELS_API_KEY = 'SpbfPI9yHPhE2RkBqgv0ihkbmKEJcm2PNf1TDmYXBSDHAwqgoGUleiI8';

// class ImageController {
//   async getFestivalImage(req, res) {
//     const { festival } = req.params; // e.g., "diwali"
//     console.log(festival)
//     try {
//       // Make request to Pexels API with the custom agent
//       const response = await axios.get(
//         `https://api.pexels.com/v1/search`,
//         {
//           params: {
//             // query: `${festival} india colorful`,
//             query: "march month india festival colorful decorations",
//             per_page: 1
//           },
//           headers: { 
//             Authorization: PEXELS_API_KEY 
//           },
//           httpsAgent: agent // Use the custom agent to bypass SSL verification
//         }
//       );

//       // Check if photos were found
//       if (!response.data.photos || response.data.photos.length === 0) {
//         return res.status(404).json({ 
//           error: "No images found for this festival." 
//         });
//       }

//       // Return the image URL
//       res.json({
//         imageUrl: response.data.photos[0].src.large2x,
//         photographer: response.data.photos[0].photographer,
//         photographerUrl: response.data.photos[0].photographer_url
//       });

//     } catch (error) {
//       console.error('Error fetching image:', error);
      
//       // More specific error handling
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         res.status(error.response.status).json({ 
//           error: "Pexels API error",
//           details: error.response.data 
//         });
//       } else if (error.request) {
//         // The request was made but no response was received
//         res.status(503).json({ 
//           error: "No response from Pexels API",
//           details: "Service might be unavailable" 
//         });
//       } else {
//         // Something happened in setting up the request
//         res.status(500).json({ 
//           error: "Failed to process request",
//           details: error.message 
//         });
//       }
//     }
//   }
// }

// export default new ImageController();

