import fs from 'fs/promises';
import path from 'path';

async function fetchMenuData() {
  const SHEET_ID = "1q1XigLb1Z_WM1z_a_0-ISqPvkyG9VmsJmD-IlpCWBVk";
  const SHEET_NAME = "menu";
  const API_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;
  const OUTPUT_FILE = path.resolve(process.cwd(), 'src/data_files/menu.json');
  
  console.log('Fetching menu data at build time...');
  
  try {
    // Check if menu.json already exists (for fallback)
    let existingData = null;
    try {
      const existingContent = await fs.readFile(OUTPUT_FILE, 'utf8');
      existingData = JSON.parse(existingContent);
      console.log('Existing menu.json found as fallback');
    } catch (err) {
      console.log('No existing menu.json found, will create a new one');
    }
    
    // Try to fetch new data
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('API did not return an array. Please check your spreadsheet setup.');
    }
    
    // Process the data into our final menu structure
    const processedData = processMenuData(data);
    
    // Ensure the data directory exists
    const dataDir = path.resolve(process.cwd(), 'src/data_files');
    await fs.mkdir(dataDir, { recursive: true });
    
    // Save the processed data to menu.json
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(processedData, null, 2));
    
    console.log('Menu data processed and saved successfully to menu.json!');
    
  } catch (error) {
    console.error('Failed to fetch menu data:', error);
    console.error('Keeping existing menu.json as fallback');
    
    // If no existing menu.json and fetch failed, create a basic message
    // Only do this if we couldn't find an existing file earlier
    try {
      await fs.access(OUTPUT_FILE);
      // File exists, do nothing
    } catch (err) {
      // File doesn't exist, create a basic one with a message
      console.log('Creating a basic menu.json since none exists');
      const dataDir = path.resolve(process.cwd(), 'src/data_files');
      await fs.mkdir(dataDir, { recursive: true });
      
      await fs.writeFile(
        OUTPUT_FILE,
        JSON.stringify({
          menuCategories: [{
            id: "info",
            title: "Our Menu",
            items: [{
              title: "Menu Coming Soon",
              description: "We're updating our menu. Please check back later!",
              price: 0,
              image: "menuPlaceholder",
              fullWidth: true
            }]
          }]
        }, null, 2)
      );
    }
  }
}

function processMenuData(items) {
  // Create a map to store categories
  const categoryMap = new Map();
  
  // Process each item and organize by category
  items.forEach(item => {
    const { categoryId, categoryTitle } = item;
    
    // Create or get the category
    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, {
        id: categoryId,
        title: categoryTitle,
        items: []
      });
    }
    
    const category = categoryMap.get(categoryId);
    
    // Process the weight options
    const weightOptions = parseWeightOptions(item.weightOptions);
    
    // Calculate minimum price from weight options if available
    let itemPrice = null;
    
    if (item.price === "Price on Selection" && weightOptions.length > 0) {
      // Find the minimum price from weight options
      itemPrice = Math.min(...weightOptions.map(option => option.price));
    } else {
      itemPrice = item.price === "Price on Selection" ? null : parseFloat(item.price) || null;
    }
    
    // Create the menu item
    const menuItem = {
      title: item.title,
      description: item.description,
      price: itemPrice,
      image: item.image,
      fullWidth: item.fullWidth === "true",
      isTopRated: item.isTopRated === "true",
      ...(weightOptions.length > 0 && { weightOptions }),
      ...(item.allergens && { allergens: item.allergens.split(',').map(a => a.trim()) }),
      ...(item.oldPrice && { oldPrice: parseFloat(item.oldPrice) || null }),
      hasMultiplePrices: item.hasMultiplePrices === "true" || weightOptions.length > 0
    };
    
    // Add the item to its category
    category.items.push(menuItem);
  });
  
  // Convert the map to an array of categories
  const menuCategories = Array.from(categoryMap.values());
  
  return { menuCategories };
}

function parseWeightOptions(optionsString) {
  if (!optionsString) return [];
  
  return optionsString.split(',').map(optionStr => {
    const [weight, price] = optionStr.split(':');
    return {
      weight,
      price: parseFloat(price)
    };
  });
}

// Run the function
fetchMenuData(); 