const express = require('express');
const fetch = require('node-fetch'); // If using Node 18+, you can remove this line

const app = express();
const PORT = 3000;

app.get('/api/frontend-data', async (req, res) => {
    const endpoint = "https://intent.symmscan.com/api/history/bucket/affiliate";
    const now = Math.floor(Date.now() / 1000);
    const threeMonthsAgo = now - (86400 * 90);
    const url = `${endpoint}?bucket_size=1&start=${threeMonthsAgo}&end=${now}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});