import express from 'express';
import axios from 'axios';

const router = express.Router();
function getDecimals(number) {
	const decimals = number.toString().split('.')[1];
	return decimals ? decimals.length : 0;
}
function validateDetailData(detailsData) {
	// this validates each item and returns a default value if there is a missing value
	return {
		id: typeof detailsData.id === 'string' ? detailsData.id : null,
		title:
			detailsData.title && typeof detailsData.title === 'string'
				? detailsData.title
				: '',
		price: {
			currency:
				detailsData.currency_id &&
				typeof detailsData.currency_id === 'string'
					? detailsData.currency_id
					: '',
			amount:
				detailsData.amount && typeof detailsData.amount === 'number'
					? detailsData.amount
					: 0,
			decimals:
				detailsData.price && typeof detailsData.price === 'number'
					? getDecimals(detailsData.price)
					: 0,
		},
		picture:
			typeof detailsData.thumbnail &&
			typeof detailsData.thumbnail === 'string'
				? detailsData.thumbnail
				: '',
		condition:
			detailsData.condition && typeof detailsData.condition === 'string'
				? detailsData.condition
				: '',
		freeShipping:
			typeof detailsData.shipping?.free_shipping === 'boolean'
				? detailsData.shipping.free_shipping
				: false,
		soldQuantity:
			detailsData.sold_quantity &&
			typeof detailsData.sold_quantity === 'number'
				? detailsData.sold_quantity
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
				description: validatedDescription.description,
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
