import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (id) {
			fetch(`/api/product/details?id=${id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error(
							`HTTP error! status: ${response.status}`
						);
					}
					return response.json();
				})
				.then((data) => {
					console.log('Fetched product details:', data); // Log the fetched data
					setProduct(data);
				})
				.catch((error) => {
					console.error('Error fetching product details:', error);
					setError(error.message);
				});
		} else {
			setProduct([]); // If there is no query, clear results
		}
	}, [id]);

	useEffect(() => {
		console.log('Product state updated:', product);
	}, [product]);

	if (!product) {
		return <div>Cargando...</div>;
	}

	return (
		<div>
			<h2>detalles</h2>
			<p>{product.title}</p>
			<p>descripcion: {product.description}</p>
		</div>
	);
}

export default ProductDetails;
