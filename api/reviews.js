const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = 'ChIJNUNakywnDTkR6UpJMyyQwRM'; // Place ID for ADA and Company (CA) (GST Consultants)
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;

    console.log('Fetching reviews from URL:', `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=...`); // Log URL without key

    if (!apiKey) {
        console.error('GOOGLE_API_KEY is not set.');
        return res.status(500).json({ error: 'Server configuration error: API key not set.' });
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            res.status(200).json(data.result);
        } else {
            // Log the detailed error from Google
            console.error('Google Places API Error:', data);
            res.status(500).json({ 
                error: 'Failed to fetch reviews from Google Places API.', 
                details: data.status,
                google_error_message: data.error_message 
            });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
