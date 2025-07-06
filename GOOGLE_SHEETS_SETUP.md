# 📊 GOOGLE SHEETS LEAD CAPTURE SETUP

## STEP 1: Create Google Sheet

1. **Go to**: https://sheets.google.com
2. **Create** new spreadsheet
3. **Name it**: "8 Mile Sniper SEO Leads"
4. **Add headers** in Row 1:
   - A1: Timestamp
   - B1: Full Name  
   - C1: Email
   - D1: Phone
   - E1: Company
   - F1: Website Analyzed
   - G1: SEO Score
   - H1: AI Readiness Score
   - I1: Voice Search Score
   - J1: E-E-A-T Score

## STEP 2: Create Google Apps Script

1. **In your sheet**, go to Extensions → Apps Script
2. **Delete** default code
3. **Paste this code**:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add new row with lead data
    sheet.appendRow([
      new Date(),
      data.fullName,
      data.email, 
      data.phone,
      data.company,
      data.websiteUrl,
      data.seoScore,
      data.aiReadinessScore,
      data.voiceSearchScore,
      data.eeAtScore
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. **Save** the script (Ctrl+S)
5. **Name it**: "SEO Lead Capture"

## STEP 3: Deploy Web App

1. **Click Deploy** → New Deployment
2. **Type**: Web app
3. **Execute as**: Me  
4. **Who has access**: Anyone
5. **Click Deploy**
6. **Copy the URL** - it looks like: `https://script.google.com/macros/s/ABC123.../exec`

## STEP 4: Test the Integration

I'll update your SEO tool to send leads to this URL automatically.

## STEP 5: View Your Leads

- **Access anytime**: Open your Google Sheet
- **Mobile friendly**: View on phone/tablet
- **Export options**: Download as CSV, Excel, etc.
- **Share access**: Give team members view/edit access

**Once you complete Steps 1-3, give me the Google Apps Script URL and I'll integrate it into your SEO tool!**
