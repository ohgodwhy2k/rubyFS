import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// --- ESM Path Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// The base directory for all served files (i.e., the 'docs' folder)
const DOCS_ROOT = path.join(__dirname, "..", "docs");
// ----------------------

const PORT = 3000;

// Helper to determine the MIME type based on file extension
const getContentType = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".html":
      return "text/html";
    case ".svg":
      // Crucial: The original script expected 'svg' in the content-type
      return "image/svg+xml";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".png":
      return "image/png";
    case ".jpg":
      return "image/jpeg";
    default:
      return "application/octet-stream";
  }
};

const server = http.createServer((req, res) => {
  // 1. Determine the requested file path
  // If request is for '/', default to 'index.html'
  // Otherwise, use the requested URL path (e.g., '/assets/icon.svg')
  let filePath = req.url === "/" ? "/index.html" : req.url;

  // Remove query parameters if any
  if (filePath.includes("?")) {
    filePath = filePath.split("?")[0];
  }

  // Construct the full absolute path to the file inside the docs directory
  const absolutePath = path.join(DOCS_ROOT, filePath);

  // Prevent directory traversal attacks (optional but good practice)
  if (!absolutePath.startsWith(DOCS_ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("403 Forbidden");
    return;
  }

  // 2. Read the file
  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      // Handle file not found (ENOENT)
      console.error(`404 Not Found: ${absolutePath}`);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }

    // 3. Serve the file content with the correct Content-Type
    res.writeHead(200, { "Content-Type": getContentType(absolutePath) });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/`);
  console.log(`Serving files from: ${DOCS_ROOT}`);
});
