import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface StoredContact extends ContactFormData {
  id: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: ContactFormData = await request.json();
    
    // Validate the data
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required fields' },
        { status: 400 }
      );
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Create a contact object with additional metadata
    const contactData: StoredContact = {
      ...body,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    // Define the path to the JSON file
    const dataFilePath = path.join(process.cwd(), 'app/data/contacts/contacts.json');
    
    // Read existing contacts or initialize with empty array
    let contacts: StoredContact[] = [];
    try {
      const fileContent = await fs.readFile(dataFilePath, 'utf-8');
      contacts = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet or is empty, initialize with an empty array
      contacts = [];
    }
    
    // Add the new contact to the array
    contacts.push(contactData);
    
    // Write the updated contacts array back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
    
    // Return a success response
    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}
