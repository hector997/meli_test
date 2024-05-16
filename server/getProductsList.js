import express from 'express';
import axios from 'axios';

const router = express.Router();
function getDecimals(number) {
	const decimals = number.toString().split('.')[1];
	return decimals ? decimals.length : 0;
}
function validateListData(item) {
	// this validates each item and returns a default value if there is a missing value
	return {
		id: typeof item.id === 'string' ? item.id : null,
		title: typeof item.title === 'string' ? item.title : '',
		price: {
			currency:
				typeof item.currency_id === 'string' ? item.currency_id : '',
			amount: typeof item.price === 'number' ? item.price : 0,
			decimals:
				item.price && typeof item.price === 'number'
					? getDecimals(item.price)
					: 0,
		},
		picture:
			typeof item.thumbnail === 'string'
				? item.thumbnail
				: 'https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png', //fallback image
		condition: typeof item.condition === 'string' ? item.condition : '',
		free_shipping:
			typeof item.shipping?.free_shipping === 'boolean'
				? item.shipping.free_shipping
				: false,
		location:
			item.location &&
			item.location.city &&
			item.location.city.name &&
			typeof item.location.city.name === 'string'
				? item.location.city.name
				: '',
	};
}
router.get('/list', async (req, res) => {
	const query = req.query.q;
	const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

	try {
		const apiResponse = await axios.get(apiUrl);
		const data = apiResponse.data;

		const filters = data.filters || [];
		// get all categories
		const categoriesArr = filters.flatMap((filter) =>
			filter.values.flatMap((val) => [
				val.name,
				...(val.path_from_root
					? val.path_from_root.map((item) => item.name)
					: []),
			])
		);

		const uniqueCategories = [...new Set(categoriesArr)]; // removing duplicates using a set

		const capedResults = data.results.slice(0, 4); // cap the results to 4 products
		// console.log(capedResults);
		const formattedResults = capedResults.map((item) =>
			validateListData(item)
		);

		const response = {
			author: {
				name: 'Hector',
				lastname: 'Villarino',
			},
			categories: uniqueCategories,
			items: formattedResults,
		};
		res.json(response);
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).json({ error: 'Error fetching data' });
	}
});

export default router;
