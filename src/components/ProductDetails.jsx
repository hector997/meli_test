import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
	const { id } = useParams(); // gets the id from the url
	const [product, setProduct] = useState(null); // product details here
	const [error, setError] = useState(null);

	const conditionDictionary = {
		new: 'Nuevo',
		used: 'Usado',
	};
	const currencyDictionary = {
		ARS: '$',
		USD: 'U$',
	};
	const formatPrice = (amount) => {
		return new Intl.NumberFormat('de-DE').format(amount);
	};

	useEffect(() => {
		if (id) {
			console.log('id from param', id);
			fetch(`/api/product/details?id=${id}`) // sends id to getProductDetails
				.then((response) => {
					if (!response.ok) {
						throw new Error(`response NOT ok: ${response.status}`);
					}
					return response.json();
				})
				.then((data) => {
					console.log('displaying data');
					setProduct(data.item);
				})
				.catch((error) => {
					console.error('Error fetching product details:', error);
					setError(error.message);
				});
		} else {
			// setProduct([]); // if no query, clear results
		}
	}, [id]);

	if (error) {
		return <div>Error: {error}</div>;
	}
	if (!product) {
		return <div className="loading">Cargando detalles...</div>;
	}
	const price = product.price ? formatPrice(product.price.amount) : null;

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
						{product.condition && product.soldQuantity > 0 && (
							<span>-</span>
						)}
						{product.soldQuantity > 0 && (
							<p>
								{product.soldQuantity}{' '}
								{product.soldQuantity == 1
									? 'vendido'
									: 'vendidos'}
							</p>
						)}
					</div>

					<p className="item-title">{product.title}</p>
					<div className="price-container">
						{price && (
							<p>
								{currencyDictionary[product.price.currency]}
								{price}
							</p>
						)}
					</div>

					<div className="buy-btn-container">
						<button className="buy-btn">Comprar</button>
					</div>
				</div>
			</div>
			<div className="description-section">
				<p className="desc-title">Descripcion del producto</p>
				{product.description ? (
					<p className="desc-content">{product.description}</p>
				) : (
					<p className="desc-content">
						'El vendedor no incluyó una descripción del producto'
					</p>
				)}
			</div>
		</div>
	);
}

export default ProductDetails;
