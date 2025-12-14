# Inventory Dashboard Project - Planning Document

## Background and Motivation

The user has a Google Sheet-based master inventory system with the following structure:
- **Item ID Column**: Contains location information (area, bolded location name, regular font for shelf details like "Shelf 1 Row B")
- **Color coding**: Each location is filled with different colors for visual distinction
- **Item Name Column**: Name of the inventory item
- **Stock Column**: Current counted amount
- **Par Column**: Minimum threshold before reordering
- **Order Amount Column**: Calculated as (Par - Stock) to determine reorder quantity

**Goal**: Create a sophisticated, professional inventory dashboard hosted on Vercel that:
- Displays all inventory information in a beautiful, sensical way
- Features pie charts and graphs at the top
- Highlights important changes (stock dips, low inventory alerts)
- Allows updates to the Google Sheet
- Follows industry best practices for reliable inventory management systems

## Key Challenges and Analysis

### Technical Challenges:
1. **Google Sheets API Integration**: Need to securely connect and fetch data from Google Sheets
2. **Real-time Data Sync**: Ensuring dashboard reflects current Google Sheet state
3. **Data Parsing**: Handling the Item ID column format (bolded location + regular font shelf info)
4. **Color Mapping**: Preserving or translating the color coding from Google Sheets
5. **Performance**: Efficient data fetching and caching strategies
6. **Authentication**: Secure access to Google Sheets data

### Industry Best Practices (Research Findings):
1. **Real-Time Inventory Tracking**: Provide real-time visibility for proactive decision-making
2. **ABC Analysis**: Categorize items by value/impact (A = high value, B = medium, C = low)
3. **Safety Stock Optimization**: Balance risk mitigation with cost efficiency
4. **Visual Hierarchy**: Place critical alerts (stock dips, reorder points) prominently
5. **KPIs**: Track stock levels, order fulfillment rates, inventory turnover ratios
6. **Automation**: Leverage automation for predictive ordering
7. **Data Integrity**: Regular data quality checks and validation

### Design Considerations:
- Professional, modern UI using industry-standard design patterns
- Responsive design for mobile/tablet/desktop
- Clear visual hierarchy with alerts prominently displayed
- Intuitive navigation and filtering
- Fast loading times and smooth interactions

## High-level Task Breakdown

### Phase 1: Project Setup and Foundation
**Task 1.1: Initialize Next.js Project**
- Create Next.js 14+ project with TypeScript
- Set up Tailwind CSS for styling
- Configure project structure
- **Success Criteria**: Project runs locally, TypeScript compiles without errors, Tailwind works

**Task 1.2: Set Up Google Sheets API Integration**
- **Step-by-step guide for user to follow:**
  1. Find Google Sheet ID from the URL (explained below)
  2. Create Google Cloud Project (we'll guide through this)
  3. Enable Google Sheets API
  4. Create Service Account (recommended approach - simpler than OAuth)
  5. Download service account JSON key file
  6. Share Google Sheet with service account email
  7. Test API connection and data fetching
- **Success Criteria**: Can successfully fetch data from Google Sheet, credentials are secure

**Google Sheet ID Explanation:**
- The Google Sheet ID is found in the URL of your Google Sheet
- URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit#gid=0`
- Example: If your URL is `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`, then `1a2b3c4d5e6f7g8h9i0j` is your Sheet ID
- We'll need this ID to connect to your sheet

**Shareable Link Explanation:**
- A shareable link allows others (or our service account) to access your Google Sheet
- We'll need to share the sheet with a service account email (which we'll create)
- This is different from making it publicly viewable - it's a private share with our service account

**Task 1.3: Environment Configuration**
- Set up environment variables for API keys
- Configure Vercel deployment settings
- Create `.env.local` and `.env.example` files
- **Success Criteria**: Environment variables properly configured, no secrets in code

### Phase 2: Data Layer and Parsing
**Task 2.1: Data Fetching Service**
- Create service to fetch Google Sheets data
- Implement caching strategy (SWR or React Query)
- Handle API rate limits and errors
- **Success Criteria**: Data fetches reliably, proper error handling, caching works

**Task 2.2: Data Parsing and Transformation**
- Parse Item ID column (extract location and shelf info)
- Handle bold formatting from Google Sheets
- Map color information if possible
- Transform data into structured format
- Calculate derived metrics (order amounts, stock status)
- **Success Criteria**: All data correctly parsed, location info extracted properly

**Task 2.3: Data Models and Types**
- Define TypeScript interfaces for inventory items
- Create data validation schemas
- Handle edge cases (missing data, invalid formats)
- **Success Criteria**: Type-safe data models, validation catches errors

### Phase 3: Dashboard UI Components
**Task 3.1: Layout and Navigation**
- Create main dashboard layout
- Implement responsive navigation
- Set up routing structure
- **Success Criteria**: Layout works on all screen sizes, navigation is intuitive

**Task 3.2: KPI Cards and Summary Section**
- Display total items, total stock value
- Show items below par (critical alerts)
- Display total order amount needed
- Create visually appealing KPI cards
- **Success Criteria**: KPIs display correctly, numbers are accurate

**Task 3.3: Chart Components (Top Section)**
- Pie chart: Stock distribution by location
- Bar chart: Items below par
- Line chart: Stock trends over time (if historical data available)
- Stock vs Par comparison chart
- Use Recharts or Chart.js library
- **Success Criteria**: Charts render correctly, data is accurate, responsive

**Task 3.4: Alert System**
- Highlight items with stock dips (below par)
- Visual indicators for critical items
- Sort/filter by alert priority
- **Success Criteria**: Alerts are visible and accurate, filtering works

**Task 3.5: Inventory Table/Grid**
- Display all inventory items in sortable table
- Show location, item name, stock, par, order amount
- Implement filtering by location, item name
- Implement sorting by various columns
- Color code rows by location (if possible)
- **Success Criteria**: Table displays all data, sorting/filtering works, responsive

### Phase 4: Advanced Features
**Task 4.1: Search and Filtering**
- Global search across all columns
- Filter by location, stock status, item name
- Advanced filter combinations
- **Success Criteria**: Search is fast and accurate, filters work correctly

**Task 4.2: Data Refresh and Updates**
- Manual refresh button
- Auto-refresh interval (configurable)
- Loading states during refresh
- **Success Criteria**: Data updates correctly, loading states work

**Task 4.3: Export Functionality**
- Export filtered data to CSV
- Print-friendly view
- **Success Criteria**: Exports work correctly, data format is correct

### Phase 5: Polish and Optimization
**Task 5.1: Styling and Design Polish**
- Apply consistent color scheme
- Ensure professional appearance
- Add animations and transitions
- Optimize for accessibility
- **Success Criteria**: Dashboard looks professional, accessible, smooth interactions

**Task 5.2: Performance Optimization**
- Optimize data fetching
- Implement proper caching
- Code splitting and lazy loading
- Optimize bundle size
- **Success Criteria**: Dashboard loads quickly, smooth interactions

**Task 5.3: Error Handling and Edge Cases**
- Handle API failures gracefully
- Show user-friendly error messages
- Handle empty states
- Handle malformed data
- **Success Criteria**: Errors are handled gracefully, user experience is good

### Phase 6: Deployment and Testing
**Task 6.1: Vercel Deployment Setup**
- Configure Vercel project
- Set up environment variables in Vercel
- Configure build settings
- Test deployment
- **Success Criteria**: Dashboard deploys successfully to Vercel

**Task 6.2: Testing**
- Test all features end-to-end
- Test on different devices/browsers
- Test with various data scenarios
- User acceptance testing
- **Success Criteria**: All features work correctly, no critical bugs

**Task 6.3: Documentation**
- Create README with setup instructions
- Document Google Sheets setup requirements
- Document environment variables
- **Success Criteria**: Clear documentation for setup and usage

## Technology Stack

- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui (optional, for professional components)
- **Charts**: Recharts or Chart.js
- **Data Fetching**: SWR or TanStack Query (React Query)
- **Google Sheets API**: @googleapis/sheets
- **Deployment**: Vercel
- **Authentication**: Google OAuth 2.0 or Service Account

## Project Status Board

- [ ] Phase 1: Project Setup and Foundation
  - [ ] Task 1.1: Initialize Next.js Project
  - [ ] Task 1.2: Set Up Google Sheets API Integration
  - [ ] Task 1.3: Environment Configuration
- [ ] Phase 2: Data Layer and Parsing
  - [ ] Task 2.1: Data Fetching Service
  - [ ] Task 2.2: Data Parsing and Transformation
  - [ ] Task 2.3: Data Models and Types
- [ ] Phase 3: Dashboard UI Components
  - [ ] Task 3.1: Layout and Navigation
  - [ ] Task 3.2: KPI Cards and Summary Section
  - [ ] Task 3.3: Chart Components (Top Section)
  - [ ] Task 3.4: Alert System
  - [ ] Task 3.5: Inventory Table/Grid
- [ ] Phase 4: Advanced Features
  - [ ] Task 4.1: Search and Filtering
  - [ ] Task 4.2: Data Refresh and Updates
  - [ ] Task 4.3: Export Functionality
- [ ] Phase 5: Polish and Optimization
  - [ ] Task 5.1: Styling and Design Polish
  - [ ] Task 5.2: Performance Optimization
  - [ ] Task 5.3: Error Handling and Edge Cases
- [ ] Phase 6: Deployment and Testing
  - [ ] Task 6.1: Vercel Deployment Setup
  - [ ] Task 6.2: Testing
  - [ ] Task 6.3: Documentation

## Current Status / Progress Tracking

**Current Phase**: Phase 1 - Project Setup and Foundation (IN PROGRESS)

**Last Updated**: Starting implementation

**Credentials Obtained**:
- ✅ Google Sheet ID: `16Fdfq1MOLVZ1FCVpl06qfcSce83GTMQtk2d9_eCQO9U`
- ✅ Service Account JSON: `inventory-dashboar-481203-3c0b6aae8a7a.json`
- ✅ Google Sheet shared with service account email

**Notes**: 
- Research completed on industry best practices
- Technology stack selected
- Task breakdown created with clear success criteria
- User has completed Google Sheets API setup
- Starting implementation in Executor mode

## Executor's Feedback or Assistance Requests

**Completed:**
- ✅ Task 1.1: Next.js project initialized with TypeScript and Tailwind CSS
- ✅ Basic project structure created
- ✅ Google Sheets API library installed (@googleapis/sheets, swr, recharts)
- ✅ Created Google Sheets service functions in lib/google-sheets.ts
- ✅ Created API route for fetching sheet data

**Completed:**
- ✅ Task 1.3: Environment Configuration
  - Created `.env.local` file with Google Sheet ID and Service Account JSON
  - Environment variables properly configured
- ✅ API Connection Tested Successfully!
  - Google Sheets API is working
  - Data is being fetched correctly
  - Sheet structure identified:
    - Column 1: Item ID (location info - "Trailer", "Shelf 1 Row A", etc.)
    - Column 2: Item name
    - Column 3: Type
    - Column 4: Stock
    - Column 5: Par
    - Column 6: Order Amount

**Completed:**
- ✅ Phase 1: Project Setup and Foundation - COMPLETE
- ✅ Phase 2: Data Layer and Parsing - COMPLETE
- ✅ Phase 3: Dashboard UI Components - COMPLETE
  - ✅ Layout and Navigation
  - ✅ KPI Cards (Total Items, Total Stock, Items Below Par, Total Order Amount)
  - ✅ Charts Section (Pie chart for stock distribution, Bar chart for items below par)
  - ✅ Alert System (highlights items below par)
  - ✅ Inventory Table (sortable, searchable, filterable)

**Current Status:**
- Dashboard is fully functional and displaying data
- All core features implemented
- Ready for testing and refinement

**Next Steps:**
- Test dashboard with user
- Refine data parsing if needed based on actual sheet structure
- Polish UI/UX
- Prepare for Vercel deployment

**Action Required:**
- Executor will provide detailed step-by-step instructions during Task 1.2
- Will guide user through Google Cloud Console setup
- Will explain how to find Sheet ID from URL
- Will explain service account approach (simpler than OAuth)

## Google Sheets API Setup Guide (For User Reference)

### What You Need to Provide:
1. **Google Sheet ID**: Found in your Google Sheet URL
   - Open your inventory Google Sheet
   - Look at the URL in your browser
   - The ID is the long string between `/d/` and `/edit`
   - Example: `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
   - The ID is: `1a2b3c4d5e6f7g8h9i0j`

### Step-by-Step Setup Instructions:

**Step 1: Create Google Cloud Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Select a project" → "New Project"
4. Enter project name (e.g., "Inventory Dashboard")
5. Click "Create"
6. Wait for project creation, then select it

**Step 2: Enable Google Sheets API**
1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and click "Enable"
4. Wait for it to enable (may take a minute)

**Step 3: Create Service Account (IMPORTANT - Not OAuth!)**
1. Go to "APIs & Services" → "Credentials"
2. **Make sure you're on the "Credentials" page, NOT "OAuth consent screen"**
3. Click "Create Credentials" → **"Service Account"** (NOT "OAuth client ID")
   - If you see options like "User data" vs "Firebase data", you're in the wrong place - go back to Credentials
   - Service Account is a different option - look for it in the dropdown
4. Enter a name (e.g., "inventory-dashboard-service")
5. Click "Create and Continue"
6. Skip optional steps (Role and Grant Access), click "Done"
7. You should now see your service account in the list

**Step 4: Create and Download Key**
1. In the Service Accounts list, click on the service account you just created
2. Go to "Keys" tab (at the top of the service account details page)
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create" - this downloads a JSON file
6. **IMPORTANT**: Save this file securely - we'll need it for the project
7. **What the JSON should contain**: Look for `client_email` field (not `client_id`)
   - Service Account JSON has: `type`, `project_id`, `private_key_id`, `private_key`, `client_email`, `client_id`, `auth_uri`, `token_uri`
   - OAuth JSON has: `client_id`, `client_secret`, `redirect_uris` (this is NOT what we need)
8. If your JSON doesn't have `client_email`, you created OAuth credentials instead - go back to Step 3

**Step 5: Share Google Sheet with Service Account**
1. Open the downloaded JSON file
2. Find the `client_email` field (looks like: `inventory-dashboard-service@project-name.iam.gserviceaccount.com`)
3. Copy that email address
4. Open your inventory Google Sheet
5. Click "Share" button (top right)
6. Paste the service account email
7. Give it "Viewer" access (read-only is fine for now)
8. Click "Send" (you can uncheck "Notify people" if you want)

**Important Security Note:**
- ✅ **This works perfectly with private/restricted sheets!** The service account is just another user you're sharing with
- The service account email will appear in your sheet's sharing list alongside your other users
- Your sheet can remain private - only shared with you, your team members, and the service account
- The service account only has the permissions you give it (Viewer = read-only, Editor = can modify)
- This is the standard, secure way to connect applications to private Google Sheets

**Step 6: Provide Information to Executor**
- Google Sheet ID (from URL)
- The downloaded JSON key file (or its contents - we'll add it to environment variables)

**Troubleshooting: OAuth vs Service Account**

**If you created OAuth 2.0 credentials by mistake:**
- OAuth JSON contains: `client_id`, `client_secret`, `redirect_uris` - this is for user login flows
- Service Account JSON contains: `client_email`, `private_key` - this is what we need
- **Solution**: Go back to "Credentials" → "Service Accounts" tab → Create a Service Account
- You can ignore/delete the OAuth credentials you created

**Why Service Account is better for this project:**
- Service Account = automated access (no user login required)
- OAuth = requires users to log in with Google account
- For a dashboard that just reads your sheet, Service Account is simpler and more appropriate

**Alternative: If you prefer OAuth approach:**
- We can implement OAuth, but it requires users to log in to Google
- More complex implementation, but works if you want user authentication
- Executor can discuss this option if preferred

## Lessons

*This section will be updated as we learn from implementation*

### Implementation Lessons
- **Always import Link from 'next/link'**: When using the Link component in any file, ensure the import statement is present at the top. Fixed in AlertsSection.tsx, Sidebar.tsx, and KPICard.tsx.
- **Next.js build cache**: When clearing .next directory, restart the dev server to regenerate required manifest files.
- **usePathname hook**: Must be called unconditionally at the top level of client components. Cannot be called conditionally or in try-catch blocks.

### User Specified Lessons
- Include info useful for debugging in the program output
- Read the file before you try to edit it
- If there are vulnerabilities that appear in the terminal, run npm audit before proceeding
- Always ask before using the -force git command

