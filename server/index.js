import express from 'express';
import cors from 'cors';
import productsList from './getProductsList.js';
import productDetails from './getProductDetails.js';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsList);
app.use('/api/product', productDetails);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
