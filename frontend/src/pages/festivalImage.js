import React, { useState, useEffect } from "react";
import axios from "axios";

function FestivalImage() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrGenerateImage = async (month) => {
    setLoading(true);
    try {
      // Send month in body to backend to generate or get existing image
      const response = await axios.post("http://localhost:4000/generateAndGet", { month });
      setImageUrl(response.data.image);
    } catch (error) {
      console.error("Failed to get or generate image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const month = today.toISOString().slice(0, 7); // "YYYY-MM"
    fetchOrGenerateImage(month);
  }, []);

  return (
    <div className="image-container">
      {loading ? (
        <p>Loading...</p>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Festival"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}

export default FestivalImage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function FestivalImage() {
//   const [imageUrl, setImageUrl] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Fetch image from backend
//   const fetchImage = async (festival) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/api/image/${festival}`
//       );
//       setImageUrl(response.data.imageUrl);
//       console.log(imageUrl)
//     } catch (error) {
//       console.error("Failed to fetch image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-detect festival (simple example)
//   useEffect(() => {
//     const today = new Date();
//     const month = today.getMonth(); // 0=Jan, 11=Dec
//     const festival = month === 4 ? 'diwali' : 'christmas'; // Example
//     fetchImage(festival);
//   }, []);

//   return (
//     <div className="image-container">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <img 
//           src={imageUrl} 
//           alt="Festival" 
//           style={{ maxWidth: '100%', height: 'auto' }}
//         />
//       )}
//     </div>
//   );
// }

// export default FestivalImage;