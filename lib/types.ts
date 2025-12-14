// Inventory item data structure
export interface InventoryItem {
  itemId: string; // Location/shelf info from Item ID column
  location: string; // Extracted location (e.g., "Trailer")
  shelf?: string; // Extracted shelf info (e.g., "Shelf 1 Row A")
  itemName: string;
  type?: string;
  stock: number;
  par: number;
  orderAmount: number;
  isBelowPar: boolean; // Calculated: stock < par
  needsOrder: boolean; // Calculated: orderAmount > 0
}

// Dashboard statistics
export interface DashboardStats {
  totalItems: number;
  totalStock: number;
  itemsBelowPar: number;
  totalOrderAmount: number;
  locations: string[];
  stockByLocation: Record<string, number>;
}

