const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Adjust if frontend runs on a different port
app.use(fileUpload()); // Enable file uploads
app.use(express.json()); // Enable JSON request handling

// ✅ Auction Dates JSON File Path
const AUCTION_FILE_PATH = path.join(__dirname, "auction_dates.json");

// ✅ Helper Functions for Auction Dates
const readAuctions = () => {
    if (!fs.existsSync(AUCTION_FILE_PATH)) return [];
    return JSON.parse(fs.readFileSync(AUCTION_FILE_PATH, "utf8"));
};

const writeAuctions = (data) => {
    fs.writeFileSync(AUCTION_FILE_PATH, JSON.stringify(data, null, 2));
};

// ✅ Test Route to Fix "Cannot GET /"
app.get("/", (req, res) => {
    res.send("Server is running! Use /api/upload-market-report to upload PDFs.");
});

// ✅ POST Route for Auction Date (Add New Date)
app.post("/api/auction-dates", (req, res) => {
    const auctions = readAuctions();
    const newAuction = req.body;
    
    if (!newAuction.date || !newAuction.saleNo || !newAuction.title) {
        return res.status(400).json({ error: "All fields (date, saleNo, title) are required." });
    }

    newAuction.id = Date.now(); // Unique ID
    auctions.push(newAuction);
    writeAuctions(auctions);

    res.json({ message: "Auction date added successfully!", auction: newAuction });
});

// ✅ GET Route for Auction Dates (Fetch All Dates)
app.get("/api/auction-dates", (req, res) => {
    res.json(readAuctions());
});

// ✅ DELETE Route for Auction Date
app.delete("/api/auction-dates/:id", (req, res) => {
    let auctions = readAuctions();
    const { id } = req.params;

    const filteredAuctions = auctions.filter((auction) => auction.id != id);

    if (filteredAuctions.length === auctions.length) {
        return res.status(404).json({ error: "Auction date not found." });
    }

    writeAuctions(filteredAuctions);
    res.json({ message: "Auction date deleted successfully!" });
});

// ✅ POST Route for File Upload (Market Reports)
app.post("/api/upload-market-report", (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send("No file uploaded.");
    }

    const file = req.files.file;

    // ✅ Set correct upload directory
    const uploadDir = path.join(__dirname, "..", "public", "market-reports", "2025");

    // ✅ Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, file.name);

    // ✅ Move the file to the correct directory
    file.mv(uploadPath, (err) => {
        if (err) {
            console.error("Error moving file:", err);
            return res.status(500).send("Error uploading file.");
        }
        res.send("File uploaded successfully!");
    });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
