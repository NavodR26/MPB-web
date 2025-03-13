import fs from "fs";
import path from "path";

export async function GET() {
  const reportsDir = path.join(process.cwd(), "public/market-reports/2025");

  try {
    const files = fs.readdirSync(reportsDir);
    const reports = files
      .filter((file) => file.endsWith(".pdf"))
      .map((file) => ({
        name: file,
        path: `/market-reports/2025/${file}`,
      }));

    return Response.json(reports);
  } catch (error) {
    return Response.json({ error: "Failed to load reports" }, { status: 500 });
  }
}



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