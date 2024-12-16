import express from "express";
import { Request, Response } from "express";
import db from "../config/db";
import { google } from "googleapis";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const router = express.Router();

// Set up Google Drive API client
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || "{}"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// Endpoint to insert a new case log
router.post("/caselogs", (req: Request, res: Response) => {
  const { caseNo, caseTitle, partyFiler, caseType, tags, file_url } = req.body;

  if (!caseNo || !caseTitle || !partyFiler || !caseType || !file_url) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const sql = `
        INSERT INTO caselogs (case_no, title, party_filer, case_type, tag, status, file_url)
        VALUES (?, ?, ?, ?, ?, 'New', ?)
      `;
  const values = [
    caseNo,
    caseTitle,
    partyFiler,
    caseType,
    tags.join(", "),
    file_url,
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    res.status(201).json({ message: "Case log added successfully" });
  });
});

// Endpoint to upload a file to Google Drive
router.post("/upload-to-drive", async (req: Request, res: Response) => {
  const { fileName, fileType, fileUrl } = req.body;

  if (!fileName || !fileType || !fileUrl) {
    res.status(400).json({ error: "Missing file details" });
    return;
  }

  try {
    // Download the file from the provided URL
    const response = await axios.get(fileUrl, { responseType: "stream" });

    // Upload the file to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: ["1OjHFD-LjEhbk-Ewz00xOzr9BdAYWWnl3"], // Replace with your folder ID
    };

    const media = {
      mimeType: fileType,
      body: response.data,
    };

    const driveResponse = (await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, webViewLink, webContentLink",
    })) as {
      data: { id: string; webViewLink: string; webContentLink: string };
    };

    res.status(200).json({
      message: "File uploaded successfully",
      fileId: driveResponse.data.id,
      webViewLink: driveResponse.data.webViewLink,
      webContentLink: driveResponse.data.webContentLink,
    });
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    res.status(500).json({ error: "Failed to upload to Google Drive" });
  }
});

export default router;
