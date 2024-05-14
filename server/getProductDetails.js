import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/details', async (req, res) => {
	console.log('buscando detalles de:::', req.query.id);
	const productId = req.query.id;
	const apiUrl = `https://api.mercadolibre.com/items/${productId}`;
	const detailsUrl = `https://api.mercadolibre.com/items/${productId}/description`;

	try {
		const apiResponse = await axios.get(apiUrl);
		const data = apiResponse.data;
		console.log('details found:::::', data);
		res.json(data);
	} catch (error) {
		console.error('Error fetching product details:', error);
		res.status(500).json({ error: 'Error fetching product details' });
	}
});

export default router;
