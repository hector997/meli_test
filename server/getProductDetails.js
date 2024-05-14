import express from 'express';
import axios from 'axios';

const router = express.Router();
function getNumberOfDecimals(number) {
	return (number.toString().split('.')[1] || '').length; // this returns the number of decimals in a given number
}
function validateDetailData(detailsData) {
	// this validates each item and returns a default value if there is a missing value
	return {
		id: typeof detailsData.id === 'string' ? detailsData.id : null,
		title: typeof detailsData.title === 'string' ? detailsData.title : '',
		price: {
			currency:
				typeof detailsData.currency === 'string'
					? detailsData.currency
					: '',
			amount:
				typeof detailsData.amount === 'number' ? detailsData.amount : 0,
			decimals: getNumberOfDecimals(detailsData.amount || 0),
		},
		picture:
			typeof detailsData.thumbnail === 'string'
				? detailsData.thumbnail
				: '',
		condition:
			typeof detailsData.condition === 'string'
				? detailsData.condition
				: '',
		freeShipping:
			typeof detailsData.shipping?.free_shipping === 'boolean'
				? detailsData.shipping.free_shipping
				: false,
		// TODO: hay que traer la quantity de la lista de productos, aca no esta
		soldQuantity:
			typeof detailsData.initial_quantity === 'number'
				? detailsData.initial_quantity
				: 0,
	};
}

function validateDescriptionData(descriptionData) {
	// this is the same as the other but with the desc
	return {
		description:
			typeof descriptionData.plain_text === 'string'
				? descriptionData.plain_text
				: '',
	};
}
router.get('/details', async (req, res) => {
	console.log('buscando detalles de:::', req.query.id);
	const productId = req.query.id;
	const detailsApi = `https://api.mercadolibre.com/items/${productId}`;
	const descriptionApi = `https://api.mercadolibre.com/items/${productId}/description`;

	try {
		const [detailsResponse, descriptionResponse] = await Promise.all([
			axios.get(detailsApi),
			axios.get(descriptionApi),
		]);
		const detailsData = detailsResponse.data || {};
		const descriptionData = descriptionResponse.data || {};

		const validatedDetails = validateDetailData(detailsData);
		const validatedDescription = validateDescriptionData(descriptionData);
		const customObject = {
			// here the custom object is created using the validated data and adding the author
			author: {
				name: 'Hector',
				lastname: 'Villarino',
			},
			item: {
				...validatedDetails,
				descriptionApi: validatedDescription,
			},
		};

		res.json(customObject);
	} catch (error) {
		console.error(
			'Error fetching product details:',
			'id:',
			productId,
			error
		);
		res.status(500).json({ error: 'Error fetching product details' });
	}
});

export default router;
