// Format the date to a string
function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
  
    return new Date(date).toLocaleDateString(undefined, options);
  }
  // Capitalize the first letter
function capitalize(str:string): string {
  if ( typeof str !== 'string' || str.length === 0 ) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format price to have 2 decimal places only when needed
function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return 'Price on Selection';
  return Number.isInteger(price) ? price.toString() : price.toFixed(2);
}

export { formatDate, capitalize, formatPrice };