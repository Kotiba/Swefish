import type { ImageMetadata } from 'astro';

// Import all product images
import srirachaTahini from "../images/products/Sriracha Tahini.jpg";
import sweetChili from "../images/products/Sweet Chili.jpg";
import specialBread from "../images/products/Swefish Special Bread.jpg";
import specialVeggies from "../images/products/Swefish Special Vegetables.jpg";
import fishAndChips from "../images/products/The Fish & Chips.jpg";
import tartarSauce from "../images/products/Capers Tartar Sauce.jpg";
import cheddarSauce from "../images/products/Cheddar Sauce.jpg";
import coleslaw from "../images/products/Coleslaw.jpg";
import friedFish from "../images/products/Fried Fish Fillet.jpg";
import fries from "../images/products/Fries Packet.jpg";
import greenSalad from "../images/products/Green Salad WIth Mustard Vinaigrette Dressing.jpg";
import grilledLemonGarlic from "../images/products/Grilled With Lemon Garlic Butter Sauce.jpg";
import grilledOliveOil from "../images/products/Grilled With Olive Oil & Lemon.jpg";
import honeyMustard from "../images/products/Honey Mustard.jpg";
import kidsMeal from "../images/products/Kids Meal.jpg";
import lemonGarlicSauce from "../images/products/Lemon Garlic Butter Sauce Large.jpg";
import mineralWater from "../images/products/Mineral Water.jpg";
import mirinda from "../images/products/Mirinda Orange.jpg";
import pepsiDiet from "../images/products/Pepsi Diet.jpg";
import pepsi from "../images/products/Pepsi.jpg";
import roquefortSauce from "../images/products/Roquefort Sauce.jpg";
import shrimpBisque from "../images/products/Shrimp Bisque Soup.jpg";
import specialRice from "../images/products/SWEFISH Special Rice Large.jpg";
import sevenUp from "../images/products/7UP.jpg";
import barbecueSauce from "../images/products/Barbecue Sauce.jpg";
import birell from "../images/products/Birell Malt Drink Can.jpg";

// Create a map of image references to imported images
const imageMap: Record<string, ImageMetadata> = {
  srirachaTahini,
  sweetChili,
  specialBread,
  specialVeggies,
  fishAndChips,
  tartarSauce,
  cheddarSauce,
  coleslaw,
  friedFish,
  fries,
  greenSalad,
  grilledLemonGarlic,
  grilledOliveOil,
  honeyMustard,
  kidsMeal,
  lemonGarlicSauce,
  mineralWater,
  mirinda,
  pepsiDiet,
  pepsi,
  roquefortSauce,
  shrimpBisque,
  specialRice,
  sevenUp,
  barbecueSauce,
  birell
};

export function getImage(imageRef: string): ImageMetadata {
  const image = imageMap[imageRef];
  if (!image) {
    throw new Error(`Image reference "${imageRef}" not found in image map`);
  }
  return image;
} 