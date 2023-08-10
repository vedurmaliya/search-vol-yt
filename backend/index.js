const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.YOUTUBE_API_KEY;

app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'https://search-vol-youtube.vercel.app'
}));

app.get('/searchVolume', async (req, res) => {
    const { keyword } = req.query;

    try {
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?q=${keyword}&type=video&part=id&key=${API_KEY}`
        );
        const totalResults = response.data.pageInfo.totalResults;
        console.log(totalResults);
        res.json({ totalResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
