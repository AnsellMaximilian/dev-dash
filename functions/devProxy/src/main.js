import { Client, Users, Account, Databases } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);


    const databases = new Databases(client);

    const DEVTO_API_URL = 'https://dev.to/api';
  
    const userId = req.headers['x-appwrite-user-id'];
  
    const method = req.method;
    
    const { pathname, queryParams } = req.body; 
  
    const url = `${DEVTO_API_URL}${pathname}`; 
  
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is missing from the request.',
        });
      }

      log("DB_ID", process.env.DB_ID)
      log("API_KEY_COLLECTION_ID", process.env.API_KEY_COLLECTION_ID)
      log("USER ID", userId)
  
      const userDoc = await databases.getDocument(
        process.env.DB_ID, 
        process.env.API_KEY_COLLECTION_ID, 
        userId
      );
  
      const apiKey = userDoc.key; 
      if (!apiKey) {
        return res.status(400).json({
          success: false,
          error: 'API key not found for the user.',
        });
      }
  
      headers['api-key'] = apiKey;
  
      let devToResponse;
  
      if (method === 'GET') {
        const queryString = new URLSearchParams(queryParams).toString(); 
        const fullUrl = `${url}?${queryString}`; 
        log(fullUrl)
        devToResponse = await fetch(fullUrl, {
          method: 'GET',
          headers: headers,
        });
      } else if (method === 'POST') {
        devToResponse = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(req.body), 
        });
      } else {
        return res.status(405).json({ error: `Method ${method} not allowed` });
      }
  
      if (!devToResponse.ok) {
        throw new Error(`Error: ${devToResponse.status} - ${devToResponse.statusText}`);
      }
  
      const result = await devToResponse.json();
  
      return res.json({
        success: true,
        data: result,
      });
  
    } catch (e) {

      error(e);
      error("Error forwarding request to Dev.to API: " + e.message);
  
      return res.json({
        success: false,
        error: e.message,
      });
    }
  
};
