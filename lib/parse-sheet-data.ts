import { InventoryItem } from './types';

/**
 * Parse raw Google Sheets data into structured inventory items
 * Handles the Item ID column format: location (bolded) + shelf info (regular font)
 * Since we can't get formatting from the API easily, we'll parse based on content patterns
 */
export function parseSheetData(rawData: string[][]): InventoryItem[] {
  if (!rawData || rawData.length < 2) {
    return [];
  }

  const headers = rawData[0];
  const rows = rawData.slice(1);

  // Find column indices
  const itemIdIndex = headers.findIndex(h => h.toLowerCase().includes('item id') || h.toLowerCase().includes('itemid'));
  const itemNameIndex = headers.findIndex(h => h.toLowerCase().includes('item name') || h.toLowerCase().includes('itemname'));
  const stockIndex = headers.findIndex(h => h.toLowerCase() === 'stock');
  const parIndex = headers.findIndex(h => h.toLowerCase() === 'par');
  const orderAmountIndex = headers.findIndex(h => h.toLowerCase().includes('order') || h.toLowerCase().includes('order amount'));

  const items: InventoryItem[] = [];
  let currentLocation = '';
  let currentShelf = '';

  for (const row of rows) {
    // Skip completely empty rows
    if (!row || row.length === 0) {
      continue;
    }

    const itemId = String(row[itemIdIndex] || '').trim();
    const itemName = String(row[itemNameIndex] || '').trim();
    
    // Check if this row has shelf information
    // Shelf info typically contains "shelf" AND "row" (e.g., "Shelf 1 Row A")
    // OR just "row" with a number/letter pattern
    // But NOT location names that happen to contain "shelf" (e.g., "Events Shelf")
    const hasShelfInfo = itemId && (
      (itemId.toLowerCase().includes('shelf') && itemId.toLowerCase().includes('row')) ||
      (itemId.toLowerCase().includes('row') && /row\s+[a-z0-9]/i.test(itemId))
    );
    
    // Check if this is a location header row
    // Location headers typically:
    // - Have text in Item ID column
    // - Don't have an item name (or have empty item name)
    // - Don't match the shelf pattern (shelf + row together)
    // - May have empty or category-only values in other columns
    const isLocationHeader = itemId && 
                            !itemName && 
                            !hasShelfInfo &&
                            itemId.length > 0;

    if (isLocationHeader) {
      // This is a location header - update current location
      currentLocation = itemId;
      currentShelf = ''; // Reset shelf when we hit a new location
      continue; // Skip this row, it's just a header
    }

    // If this row has shelf info but no item name, it's a shelf header row
    // Update the current shelf and continue (items below will inherit this shelf)
    if (hasShelfInfo && !itemName) {
      currentShelf = itemId;
      continue; // Skip this row, it's just a shelf header
    }

    // Only process rows that have item names (actual inventory items)
    if (!itemName) {
      continue; // Skip rows without item names
    }

    // Determine location and shelf for this item
    let location = currentLocation;
    let shelf: string | undefined = undefined;

    // If the current row has shelf info, use it (overrides current shelf)
    if (hasShelfInfo) {
      shelf = itemId;
      currentShelf = itemId; // Update current shelf
    } else if (currentShelf) {
      // If no shelf in current row but we have a current shelf, use it
      shelf = currentShelf;
    }

    // If we still don't have a location, try to infer from itemId
    if (!location && itemId) {
      // If itemId doesn't contain shelf/row, it might be the location itself
      if (!hasShelfInfo) {
        location = itemId;
        currentLocation = itemId;
      } else {
        // If we have shelf info but no location, use a default
        location = 'Unknown';
      }
    }

    // If we still don't have a location, use default
    if (!location) {
      location = 'Unknown';
    }

    // Parse numeric values
    const stock = parseFloat(String(row[stockIndex] || '0')) || 0;
    const par = parseFloat(String(row[parIndex] || '0')) || 0;
    const orderAmount = parseFloat(String(row[orderAmountIndex] || '0')) || 0;

    // Add the item
    items.push({
      itemId: itemId || `${location}${shelf ? ` - ${shelf}` : ''}`,
      location,
      shelf: shelf || undefined,
      itemName,
      type: row[2] ? String(row[2]).trim() : undefined,
      stock,
      par,
      orderAmount,
      isBelowPar: stock < par,
      needsOrder: orderAmount > 0,
    });
  }

  return items;
}

/**
 * Calculate dashboard statistics from inventory items
 */
export function calculateStats(items: InventoryItem[]) {
  const stats = {
    totalItems: items.length,
    totalStock: items.reduce((sum, item) => sum + item.stock, 0),
    itemsBelowPar: items.filter(item => item.isBelowPar).length,
    totalOrderAmount: items.reduce((sum, item) => sum + item.orderAmount, 0),
    locations: [] as string[],
    stockByLocation: {} as Record<string, number>,
  };

  // Extract unique locations and calculate stock by location
  const locationSet = new Set<string>();
  items.forEach(item => {
    locationSet.add(item.location);
    stats.stockByLocation[item.location] = (stats.stockByLocation[item.location] || 0) + item.stock;
  });

  stats.locations = Array.from(locationSet).sort();

  return stats;
}

