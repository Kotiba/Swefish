import type { ImageMetadata } from 'astro';

// *Grilled*
import grilledLemonGarlic from "../images/products/Grilled With Lemon Garlic Butter Sauce.jpg";
import shrimpGrilledLemonGarlic from "../images/products/shrimp grilled lemon garlic.jpg";
import grilledOliveOil from "../images/products/Grilled With Olive Oil & Lemon.jpg";
import shrimpGrilledOliveOil from "../images/products/Shrimp Grilled With Olive Oil and Lemon.jpg";

// *The Fish/Shrimp & Chips Meals*
import fishAndChips from "../images/products/The Fish & Chips.jpg";
import shrimpAndChips from "../images/products/Shrimp and Chips.jpg";

// *The Fried*
import friedFish from "../images/products/Fried Fish Fillet.jpg";
import friedShrimpButterfly from "../images/products/Fried Butterfly Shrimp.jpg";

// *Soup*
import shrimpBisque from "../images/products/Shrimp Bisque Soup.jpg";

// *Sandwiches*
import crispyFishSandwich from "../images/products/Crispy Fish Fillet Sandwich.jpg";

// *Offers*
import specialOffer from "../images/products/special offer.jpg";

// *Extras*
import fries from "../images/products/Fries Packet.jpg";
import specialBread from "../images/products/Swefish Special Bread.jpg";
import specialRice from "../images/products/Special Rice.jpg";
import specialVeggies from "../images/products/Swefish Special Vegetables.jpg";

// *Sauces*
import lemonGarlicSauce from "../images/products/Lemon Garlic Butter Sauce Large.jpg";
import sweetChili from "../images/products/Sweet Chili.jpg";
import srirachaTahini from "../images/products/Sriracha Tahini.jpg";
import roquefortSauce from "../images/products/Roquefort Sauce.jpg";
import cheddarSauce from "../images/products/Cheddar Sauce.jpg";
import honeyMustard from "../images/products/Honey Mustard.jpg";
import tartarSauce from "../images/products/Capers Tartar Sauce.jpg";
import barbecueSauce from "../images/products/Barbecue Sauce.jpg";

// *Salads*
import coleslaw from "../images/products/Coleslaw.jpg";
import greenSalad from "../images/products/Green Salad WIth Mustard Vinaigrette Dressing.jpg";

// *Kids Meal*
import kidsMeal from "../images/products/Kids Meal.jpg";

// *Drinks*
import pepsi from "../images/products/Pepsi.jpg";
import mirinda from "../images/products/Mirinda Orange.jpg";
import mineralWater from "../images/products/Mineral Water.jpg";
import birell from "../images/products/Birell Malt Drink Can.jpg";

// Additional items not in categories
import pepsiDiet from "../images/products/Pepsi Diet.jpg";
import sevenUp from "../images/products/7UP.jpg";

// Create a map of image references to imported images
const imageMap: Record<string, ImageMetadata> = {
  // *Grilled*
  grilledLemonGarlic,
  shrimpGrilledLemonGarlic,
  grilledOliveOil,
  shrimpGrilledOliveOil,
  
  // *The Fish/Shrimp & Chips Meals*
  fishAndChips,
  shrimpAndChips,
  
  // *The Fried*
  friedFish,
  friedShrimpButterfly,
  
  // *Soup*
  shrimpBisque,
  
  // *Sandwiches*
  crispyFishSandwich,
  
  // *Offers*
  specialOffer,
  
  // *Extras*
  fries,
  specialBread,
  specialRice,
  specialVeggies,
  
  // *Sauces*
  lemonGarlicSauce,
  sweetChili,
  srirachaTahini,
  roquefortSauce,
  cheddarSauce,
  honeyMustard,
  tartarSauce,
  barbecueSauce,
  
  // *Salads*
  coleslaw,
  greenSalad,
  
  // *Kids Meal*
  kidsMeal,
  
  // *Drinks*
  pepsi,
  mirinda,
  mineralWater,
  birell,
  
  // Additional items
  pepsiDiet,
  sevenUp
};

export function getImage(imageRef: string): ImageMetadata {
  const image = imageMap[imageRef];
  if (!image) {
    throw new Error(`Image reference "${imageRef}" not found in image map`);
  }
  return image;
} 