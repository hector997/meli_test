import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/list', async (req, res) => {
	console.log('---------------- get list for', req.query.q);
	const query = req.query.q;
	const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

	try {
		const apiResponse = await axios.get(apiUrl);
		const data = apiResponse.data;
		// const formattedResults = data.results.map(
		// 	(item, index) => `Product ${index + 1}: ${item.title}`
		// );
		console.log('######## getProducsList response:', data.results);
		res.json({ results: data });
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).json({ error: 'Error fetching data' });
	}
});

export default router;
