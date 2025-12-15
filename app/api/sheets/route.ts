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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Log more details for debugging
    console.error('Error details:', {
      message: errorMessage,
      stack: errorStack,
      hasSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasServiceAccount: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
      serviceAccountLength: process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.length || 0,
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch sheet data', 
        details: errorMessage,
        hint: errorMessage.includes('parse') 
          ? 'Check that GOOGLE_SERVICE_ACCOUNT_JSON is valid JSON. Make sure to paste the entire JSON file content, including all quotes and brackets.'
          : undefined
      },
      { status: 500 }
    );
  }
}

