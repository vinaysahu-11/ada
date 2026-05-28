const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = 'ChIJNUNakywnDTkR6UpJMyyQwRM'; // Place ID for ADA and Company (CA) (GST Consultants)
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            res.status(200).json(data.result);
        } else {
            res.status(500).json({ error: 'Failed to fetch reviews from Google Places API', details: data.status });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
