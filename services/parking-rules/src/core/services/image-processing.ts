import { createWorker } from 'tesseract.js';
import * as fs from 'fs';

export const processImage = async (imagePath: string): Promise<string> => {
  const worker =await createWorker("swe");
  const { data: { text } } = await worker.recognize(imagePath);
  await worker.terminate();

  fs.unlinkSync(imagePath);
  return text;
};
