const http = require("http");
const fs = require("fs");

const httpServer = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(fs.readFileSync("index.html"));
  }

  if (req.url === "/upload") {
    const fileName = req.headers["file-name"];
    req.on("data", (chunk) => {
      fs.appendFileSync(fileName, chunk);
    });
    res.end("Uploaded");
  }
});

httpServer.listen(8080, () => console.log("Listening..."));
