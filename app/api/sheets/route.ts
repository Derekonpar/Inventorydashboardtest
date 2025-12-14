import { NextResponse } from 'next/server';
import { fetchSheetData } from '@/lib/google-sheets';
import { parseSheetData, calculateStats } from '@/lib/parse-sheet-data';

export async function GET() {
  try {
    const rawData = await fetchSheetData();
    const items = parseSheetData(rawData);
    const stats = calculateStats(items);
    
    return NextResponse.json({ 
      items,
      stats,
      rawData // Include raw data for debugging
    }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sheet data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

