import { Request, Response } from 'express';
import Tesseract from 'tesseract.js';
import cv from "opencv4nodejs";
import path from "node:path";
import fs from "fs";

export async function processParkingRules(req: Request, res: Response): Promise<any> {
  const imagePath = path.join(__dirname, req.file.path);
  const processedImagePath = path.join(__dirname, 'uploads', 'processed.png');

  // Preprocess image using OpenCV
  const image = cv.imread(imagePath);
  const grayImage = image.bgrToGray();
  const thresholdedImage = grayImage.threshold(0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU);
  cv.imwrite(processedImagePath, thresholdedImage);

  // Use Tesseract to extract text from the processed image
  Tesseract.recognize(
    processedImagePath,
    'eng', // Assuming most signs have some English text, switch to 'swe' for Swedish
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    const parkingRules = parseParkingRules(text);
    res.json({ rules: parkingRules });

    // Clean up the uploaded and processed files
    fs.unlinkSync(imagePath);
    fs.unlinkSync(processedImagePath);
  }).catch(error => {
    console.error(error);
    res.status(500).send('Error processing image');
  });
}
const parseParkingRules = (text) => {
  // Implement rule parsing logic here based on the Swedish parking sign details
  const rules = {
    "Parkering förbjuden": "No parking",
    "Avgift": "Fee required",
    "P-skiva": "Parking disc required",
    "Mån": "Monday",
    "Tis": "Tuesday",
    "Ons": "Wednesday",
    "Tor": "Thursday",
    "Fre": "Friday",
    "Lör": "Saturday",
    "Sön": "Sunday"
  };

  let result = '';
  for (const [key, value] of Object.entries(rules)) {
    if (text.includes(key)) {
      result += `${value}\n`;
    }
  }

  return result || 'Parking rules not identified';
};
