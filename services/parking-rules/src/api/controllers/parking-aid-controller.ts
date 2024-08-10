import { Request, Response } from 'express';
import fs from "fs";
import path from "node:path";
import { processImage } from '../../core/services/image-processing';
import { parseParkingRules } from '../../core/services/rules';

export async function processParkingRules(req: Request, res: Response): Promise<any> {
  const imagePath = path.join(__dirname,'../../..', req.file!.path);

  try {
    const text = await processImage(imagePath);
    console.log("test",text);
    const parkingRules = parseParkingRules(text);
    res.json({ rules: parkingRules });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image');
  }
}
