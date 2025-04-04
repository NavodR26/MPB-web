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



export async function GET() {
  const FOLDER_ID = "1_4zc-LekCBSxSRoSR9KAugwU7Hj7QVHg";
  const API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyDKU5wNBMl5H1_zUHlj3MzVYcq1UHulgPg";

  const noCacheHeaders = {
    'Cache-Control': 'no-store, max-age=0',
    'Pragma': 'no-cache'
  };

  try {
    // 1. Get files with cache-busting timestamp
    const timestamp = Date.now();
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,modifiedTime,createdTime)&timestamp=${timestamp}`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Drive API error: ${response.status}`);
    }

    const data = await response.json();

    // 2. Process files with enhanced validation
    const reports = data.files?.filter(file => {
      // Strict filename pattern check
      return file.mimeType === 'application/pdf' && 
             /^MPBL Tea Market Report - Sale No\. \d{3}\.pdf$/i.test(file.name);
    }).map(file => {
      const saleNo = parseInt(file.name.match(/Sale No\. (\d{3})/i)[1]);
      return {
        id: file.id,
        name: file.name,
        saleNumber: saleNo,
        formattedSaleNo: String(saleNo).padStart(3, '0'),
        createdTime: file.createdTime,
        modifiedTime: file.modifiedTime,
        previewUrl: `https://drive.google.com/file/d/${file.id}/preview?timestamp=${timestamp}`,
        downloadUrl: `https://drive.google.com/uc?id=${file.id}&export=download&timestamp=${timestamp}`
      };
    }).sort((a, b) => b.saleNumber - a.saleNumber) || [];

    // 3. Add debug information in development
    if (process.env.NODE_ENV === 'development') {
      console.debug('Fetched reports:', {
        count: reports.length,
        newest: reports[0]?.name,
        oldest: reports[reports.length - 1]?.name,
        timestamp: new Date().toISOString()
      });
    }

    return Response.json(reports, { headers: noCacheHeaders });

  } catch (error) {
    console.error('Report fetch error:', error);
    return Response.json(
      { 
        error: "Failed to load reports",
        details: process.env.NODE_ENV === 'development' ? error.message : null
      },
      { 
        status: 500,
        headers: noCacheHeaders 
      }
    );
  }
}