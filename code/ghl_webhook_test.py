#!/usr/bin/env python3
"""
Test webhook integration with GoHighLevel CRM
Sends a test lead from the SEO audit tool
"""

import requests
import json
from datetime import datetime

def send_test_webhook():
    """Send test lead data to GoHighLevel webhook"""
    
    webhook_url = "https://services.leadconnectorhq.com/hooks/nuzoOfptmhoZ1HewKPkJ/webhook-trigger/215201d6-2e96-48d1-8b02-0e27ee3530c4"
    
    # Test payload with the exact format Joe specified
    test_payload = {
        "firstName": "Test",
        "lastName": "Lead",
        "email": "testlead@example.com",
        "phone": "0400123456"
    }
    
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "8MileSniper-SEO-Tool/1.0"
    }
    
    try:
        print(f"🚀 Sending test webhook to GoHighLevel...")
        print(f"URL: {webhook_url}")
        print(f"Payload: {json.dumps(test_payload, indent=2)}")
        
        response = requests.post(
            webhook_url,
            json=test_payload,
            headers=headers,
            timeout=30
        )
        
        print(f"\n✅ Response Status: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.text:
            print(f"Response Body: {response.text}")
        
        if response.status_code == 200:
            print("\n🎯 SUCCESS: Test webhook sent successfully!")
            print("Joe can now map the fields in GoHighLevel and set up automation.")
        else:
            print(f"\n⚠️  Webhook sent but got status code: {response.status_code}")
            
        return response.status_code == 200
        
    except requests.exceptions.RequestException as e:
        print(f"\n❌ Error sending webhook: {e}")
        return False

if __name__ == "__main__":
    send_test_webhook()
