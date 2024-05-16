import express from 'express';
import axios from 'axios';

const router = express.Router();
function getDecimals(number) {
	const decimals = number.toString().split('.')[1];
	return decimals ? decimals.length : 0;
}
function validateDetailData(detailsData) {
	// this validates each item and returns a default if there is a missing value
	return {
		id: typeof detailsData.id === 'string' ? detailsData.id : null,
		title:
			detailsData.title && typeof detailsData.title === 'string'
				? detailsData.title
				: '',
		price: {
			currency:
				typeof detailsData.currency_id === 'string'
					? detailsData.currency_id
					: '',
			amount:
				typeof detailsData.price === 'number' ? detailsData.price : 0,
			decimals:
				typeof detailsData.price === 'number'
					? getDecimals(detailsData.price)
					: 0,
		},
		picture:
			detailsData.pictures && detailsData.pictures.length != 0
				? detailsData.pictures[0].url
				: 'https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png',
		condition:
			detailsData.condition && typeof detailsData.condition === 'string'
				? detailsData.condition
				: '',
		freeShipping:
			typeof detailsData.shipping?.free_shipping === 'boolean'
				? detailsData.shipping.free_shipping
				: false,
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
		const detailsResponse = await axios.get(detailsApi);
		const detailsData = detailsResponse.data || {};
		const validatedDetails = validateDetailData(detailsData);

		let descriptionData = {};
		try {
			// this fetches the description after the details have been fetched. If there is no description, descriptionData remains empty
			const descriptionResponse = await axios.get(descriptionApi);
			descriptionData = descriptionResponse.data || {};
		} catch (error) {
			if (error.response && error.response.status === 404) {
				console.warn('No description found for ', productId);
			} else {
				throw error;
			}
		}

		const validatedDescription = validateDescriptionData(descriptionData);
		const customObject = {
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
			error.message
		);
		res.status(500).json({ error: 'Error fetching product details' });
	}
});

export default router;
