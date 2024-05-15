import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
	const { id } = useParams(); // gets the id from the url
	const [product, setProduct] = useState(null); // product details here
	const [error, setError] = useState(null);

	const conditionDictionary = {
		new: 'nuevo',
		used: 'usado',
	};
	const currencyDictionary = {
		ARS: '$',
		USD: 'U$',
	};

	useEffect(() => {
		if (id) {
			fetch(`/api/product/details?id=${id}`) // sends id to getProductDetails
				.then((response) => {
					if (!response.ok) {
						throw new Error(`response NOT ok: ${response.status}`);
					}
					return response.json();
				})
				.then((data) => {
					setProduct(data.item);
				})
				.catch((error) => {
					console.error('Error fetching product details:', error);
					setError(error.message);
				});
		} else {
			setProduct([]); // If there is no query, clear results
		}
	}, [id]);

	if (error) {
		return <div>Error: {error}</div>;
	}
	if (!product) {
		return <div className="loading">Cargando...</div>;
	}

	return (
		<div className="product-view-container">
			<div className="main-section">
				<div className="product-image">
					<img src={product.picture} alt={product.title} />
				</div>
				<div className="product-data">
					<div className="upper-details">
						{product.condition && (
							<p>{conditionDictionary[product.condition]}</p>
						)}
						{product.soldQuantity > 0 && (
							<p>- {product.soldQuantity} vendidos</p>
						)}
					</div>

					<p>{product.title}</p>
					<div className="price-container">
						{' '}
						{product.price.currency &&
							product.price.amount != null && (
								<p>
									{currencyDictionary[product.price.currency]}
									{product.price.amount}
								</p>
							)}
					</div>

					<div className="buy-btn-container">
						<button className="buy-btn">Comprar</button>
					</div>
				</div>
			</div>
			<div className="description-sectioon">
				<p>Descripcion del producto</p>
				{product.description
					? product.description
					: 'El vendedor no incluyó una descripción del producto'}
			</div>
		</div>
	);
}

export default ProductDetails;
