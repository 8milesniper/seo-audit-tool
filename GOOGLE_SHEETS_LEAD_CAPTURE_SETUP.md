# 📊 Google Sheets Lead Capture Setup Guide

## Overview
This temporary solution captures all SEO audit leads into a Google Sheet until your GoHighLevel account is ready for API integration (in 3 weeks).

## 🚀 Quick Setup Instructions

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "8 Mile Sniper - SEO Audit Leads"
4. Set up headers in Row 1:
   - A1: **Timestamp**
   - B1: **First Name** 
   - C1: **Last Name**
   - D1: **Full Name**
   - E1: **Email**
   - F1: **Phone**
   - G1: **Company**
   - H1: **Website Analyzed**
   - I1: **Source**

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Format timestamp for better readability
    var timestamp = new Date(data.timestamp);
    var formattedTime = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");
    
    // Append new row with lead data
    sheet.appendRow([
      formattedTime,
      data.firstName || '',
      data.lastName || '',
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.websiteAnalyzed || '',
      data.source || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', message: 'Lead captured successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy the Script
1. Click **Deploy > New deployment**
2. Set **Type** to "Web app"
3. Set **Execute as** to "Me"
4. Set **Who has access** to "Anyone"
5. Click **Deploy**
6. **COPY THE WEB APP URL** - you'll need this!

### Step 4: Update SEO Tool
Send Joe the Web App URL to replace the placeholder in the SEO tool code.

## 📧 Optional: Email Notifications
To get notified of new leads:
1. Add this line after `sheet.appendRow([...]);` in the script:
```javascript
GmailApp.sendEmail(
  'your-email@example.com',
  '🎯 New SEO Lead Captured!',
  `New lead from SEO Audit Tool:\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}\nWebsite: ${data.websiteAnalyzed}\n\nCheck the Google Sheet for full details.`
);
```

## 🔄 Migration to GoHighLevel (In 3 Weeks)
1. Export the Google Sheet as CSV
2. Import leads into GoHighLevel
3. Update SEO tool to use GHL API
4. Archive the Google Sheet

## 📊 Benefits of This Solution
✅ **Real-time lead capture** - See leads instantly  
✅ **No data loss** - All leads safely stored  
✅ **Easy access** - Check from any device  
✅ **Professional** - Clean data format  
✅ **Email alerts** - Optional notifications  
✅ **Easy export** - Ready for GHL import  

## 🛠️ Next Steps
1. Set up the Google Sheet and Apps Script
2. Send Joe the Web App URL
3. Test the integration
4. Start capturing leads immediately!

This solution will perfectly bridge the gap until GoHighLevel is ready for full integration.
