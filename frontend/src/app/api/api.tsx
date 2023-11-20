"use server"
import { promises as fs } from 'fs';

export default async function loadData(): Promise<any> {
  //Read the json data file data.json
  const res = await fs.readFile(process.cwd() + '/src/data/color-rings.json', 'utf8');
  const restaurants = JSON.parse(res.toString());
  //Return the content of the data file in json format
  return restaurants;  
}