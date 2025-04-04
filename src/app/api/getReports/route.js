// import fs from "fs";
// import path from "path";

// export async function GET() {
//   const reportsDir = path.join(process.cwd(), "public/market-reports/2025");

//   try {
//     const files = fs.readdirSync(reportsDir);
//     const reports = files
//       .filter((file) => file.endsWith(".pdf"))
//       .map((file) => ({
//         name: file,
//         path: `/market-reports/2025/${file}`,
//       }));

//     return Response.json(reports);
//   } catch (error) {
//     return Response.json({ error: "Failed to load reports" }, { status: 500 });
//   }
// }



// // src/app/api/getReports/route.js
// import fs from "fs";
// import path from "path";
// import {validateToken} from '../middleware';
// import { NextResponse } from 'next/server';

// export const GET = validateToken(async (request) => {
//   const reportsDir = path.join(process.cwd(), "public/market-reports/2025");

//   try {
//     const files = fs.readdirSync(reportsDir);
//     const reports = files
//       .filter((file) => file.endsWith(".pdf"))
//       .map((file) => ({
//         name: file,
//         path: `/market-reports/2025/${file}`,
//         lastModified: fs.statSync(path.join(reportsDir, file)).mtime
//       }));

//     return NextResponse.json(reports);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to load reports" }, 
//       { status: 500 }
//     );
//   }
// });



// export async function GET() {
//   const FOLDER_ID = "1_4zc-LekCBSxSRoSR9KAugwU7Hj7QVHg";
//   const API_KEY = process.env.GOOGLE_API_KEY;

//   const noCacheHeaders = {
//     'Cache-Control': 'no-store, max-age=0',
//     'Pragma': 'no-cache'
//   };

//   try {
//     // 1. Get files with cache-busting timestamp
//     const timestamp = Date.now();
//     const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,modifiedTime,createdTime)&timestamp=${timestamp}`;

//     const response = await fetch(url, { cache: 'no-store' });
    
//     if (!response.ok) {
//       throw new Error(`Drive API error: ${response.status}`);
//     }

//     const data = await response.json();

//     // 2. Process files with enhanced validation
//     const reports = data.files?.filter(file => {
//       // Strict filename pattern check
//       return file.mimeType === 'application/pdf' && 
//              /^MPBL Tea Market Report - Sale No\. \d{3}\.pdf$/i.test(file.name);
//     }).map(file => {
//       const saleNo = parseInt(file.name.match(/Sale No\. (\d{3})/i)[1]);
//       return {
//         id: file.id,
//         name: file.name,
//         saleNumber: saleNo,
//         formattedSaleNo: String(saleNo).padStart(3, '0'),
//         createdTime: file.createdTime,
//         modifiedTime: file.modifiedTime,
//         previewUrl: `https://drive.google.com/file/d/${file.id}/preview?timestamp=${timestamp}`,
//         downloadUrl: `https://drive.google.com/uc?id=${file.id}&export=download&timestamp=${timestamp}`
        
//       };
//     }).sort((a, b) => b.saleNumber - a.saleNumber) || [];

//     // 3. Add debug information in development
//     if (process.env.NODE_ENV === 'development') {
//       console.debug('Fetched reports:', {
//         count: reports.length,
//         newest: reports[0]?.name,
//         oldest: reports[reports.length - 1]?.name,
//         timestamp: new Date().toISOString()
//       });
//     }

//     return Response.json(reports, { headers: noCacheHeaders });

//   } catch (error) {
//     console.error('Report fetch error:', error);
//     return Response.json(
//       { 
//         error: "Failed to load reports",
//         details: process.env.NODE_ENV === 'development' ? error.message : null
//       },
//       { 
//         status: 500,
//         headers: noCacheHeaders 
//       }
//     );
//   }
// } 



// const noCacheHeaders = {
//   'Cache-Control': 'no-store, max-age=0',
//   'Pragma': 'no-cache'
// };

// try {
//   const timestamp = Date.now();
//   const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,modifiedTime,createdTime,size)&timestamp=${timestamp}`;

//   const response = await fetch(url, { cache: 'no-store' });

//   if (!response.ok) {
//     throw new Error(`Drive API error: ${response.status}`);
//   }

//   const data = await response.json();

//   const reports = data.files?.filter(file => {
//     return (
//       file.mimeType === 'application/pdf' &&
//       /^MPBL Tea Market Report - Sale No\. \d{3}\.pdf$/i.test(file.name)
//     );
//   }).map(file => {
//     const saleNo = parseInt(file.name.match(/Sale No\. (\d{3})/i)[1]);
//     return {
//       id: file.id,
//       name: file.name,
//       saleNumber: saleNo,
//       formattedSaleNo: String(saleNo).padStart(3, '0'),
//       createdTime: file.createdTime,
//       modifiedTime: file.modifiedTime,
//       size: file.size || null,
//       previewUrl: `https://drive.google.com/file/d/${file.id}/preview?timestamp=${timestamp}`,
//       viewUrl: `https://drive.google.com/file/d/${file.id}/view?usp=drivesdk&timestamp=${timestamp}`,
//       downloadUrl: `https://drive.google.com/uc?id=${file.id}&export=download&timestamp=${timestamp}`
//     };
//   }).sort((a, b) => b.saleNumber - a.saleNumber) || [];

//   if (process.env.NODE_ENV === 'development') {
//     console.debug('Fetched reports:', {
//       count: reports.length,
//       newest: reports[0]?.name,
//       oldest: reports[reports.length - 1]?.name,
//       timestamp: new Date().toISOString()
//     });
//   }

//   return Response.json(reports, { headers: noCacheHeaders });

// } catch (error) {
//   console.error('Report fetch error:', error);
//   return Response.json(
//     {
//       error: "Failed to load reports",
//       details: process.env.NODE_ENV === 'development' ? error.message : null
//     },
//     {
//       status: 500,
//       headers: noCacheHeaders
//     }
//   );
// }
// }



export async function GET(request) {
  // Get the folder ID containing your PDF reports
  const FOLDER_ID = "1_4zc-LekCBSxSRoSR9KAugwU7Hj7QVHg";
  
  // Get the API key from environment variables
  const API_KEY = process.env.GOOGLE_API_KEY;
  
  // Set strong cache-busting headers
  const noCacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  };
  
  // Check if API key exists
  if (!API_KEY) {
    console.error("Google API Key not found in environment variables");
    return new Response(
      JSON.stringify({ 
        error: "Server configuration error: API key missing", 
        details: "Please contact the site administrator" 
      }),
      { 
        status: 500, 
        headers: {
          'Content-Type': 'application/json',
          ...noCacheHeaders
        } 
      }
    );
  }

  try {
    // Get current timestamp for cache busting
    const timestamp = Date.now();
    
    // Construct URL to fetch files from Google Drive API
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,modifiedTime,createdTime,size)&timestamp=${timestamp}`;
    
    // Fetch files with no caching
    const response = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Drive API HTTP error: ${response.status}`, errorText);
      throw new Error(`Drive API returned status ${response.status}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    
    // Check if files array exists
    if (!data.files) {
      console.error("No files array in API response:", data);
      throw new Error("Invalid response format from Google Drive API");
    }
    
    // Filter only PDF files that match the pattern
    const reports = data.files
      .filter(file => {
        return (
          file.mimeType === 'application/pdf' &&
          /^MPBL Tea Market Report - Sale No\. \d{3}\.pdf$/i.test(file.name)
        );
      })
      .map(file => {
        // Extract sale number from filename
        const saleNoMatch = file.name.match(/Sale No\. (\d{3})/i);
        const saleNo = saleNoMatch ? parseInt(saleNoMatch[1]) : 0;
        
        // Create report object with all necessary URLs
        return {
          id: file.id,
          name: file.name,
          saleNumber: saleNo,
          formattedSaleNo: String(saleNo).padStart(3, '0'),
          createdTime: file.createdTime,
          modifiedTime: file.modifiedTime,
          size: file.size || null,
          // Add timestamp to bust cache for all URLs
          previewUrl: `https://drive.google.com/file/d/${file.id}/preview?t=${timestamp}`,
          viewUrl: `https://drive.google.com/file/d/${file.id}/view?usp=drivesdk&t=${timestamp}`,
          downloadUrl: `https://drive.google.com/uc?id=${file.id}&export=download&t=${timestamp}`
        };
      })
      // Sort by sale number in descending order (newest first)
      .sort((a, b) => b.saleNumber - a.saleNumber);
    
    // Log success in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`Fetched ${reports.length} reports successfully`);
    }
    
    // Return reports as JSON with cache-busting headers
    return new Response(
      JSON.stringify(reports),
      { 
        status: 200, 
        headers: {
          'Content-Type': 'application/json',
          ...noCacheHeaders
        } 
      }
    );
  } catch (error) {
    // Log error for debugging
    console.error('Report fetch error:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({
        error: "Failed to load reports",
        details: process.env.NODE_ENV === 'development' ? error.message : "Server error"
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...noCacheHeaders
        }
      }
    );
  }
}