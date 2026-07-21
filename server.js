const express = require('express');
const https = require('https');

const app = express();

// When anyone visits your Render URL (http://...onrender.com/)
app.get('/', (req, res) => {
    // Send a request to fetch Google's homepage from the server side
    https.get('https://www.google.com', (googleRes) => {
        // Forward Google's headers (content type, styles, etc.)
        res.writeHead(googleRes.statusCode, googleRes.headers);
        
        // Pipe/stream Google's HTML directly back to your browser/app
        googleRes.pipe(res);
    }).on('error', (err) => {
        console.error('Error fetching Google:', err);
        res.status(500).send('Failed to load Google');
    });
});

const PORT = process.env.PORT || 8080;
server = app.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}`);
});
