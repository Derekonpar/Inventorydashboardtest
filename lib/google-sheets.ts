import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Initialize Google Sheets API client
export async function getSheetsClient() {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey && !serviceAccountPath) {
    throw new Error('Google Service Account credentials not found. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_KEY');
  }

  let credentials;
  if (serviceAccountKey) {
    // Parse JSON string from environment variable
    try {
      credentials = typeof serviceAccountKey === 'string' 
        ? JSON.parse(serviceAccountKey) 
        : serviceAccountKey;
    } catch (error) {
      throw new Error('Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON. Make sure it\'s valid JSON.');
    }
  } else if (serviceAccountPath) {
    // Read from file path (for local development)
    const fs = await import('fs');
    const path = await import('path');
    const keyFile = fs.readFileSync(path.resolve(process.cwd(), serviceAccountPath), 'utf8');
    credentials = JSON.parse(keyFile);
  }

  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// Fetch all data from the Google Sheet
export async function fetchSheetData() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not set');
  }

  const sheets = await getSheetsClient();
  
  try {
    // Get the first sheet (or you can specify a sheet name)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'A:Z', // Adjust range as needed
    });

    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

// Get sheet metadata to understand structure
export async function getSheetMetadata() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not set');
  }

  const sheets = await getSheetsClient();
  
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching sheet metadata:', error);
    throw error;
  }
}

