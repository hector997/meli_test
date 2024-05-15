import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { useState, useEffect } from 'react';

function SearchResults({ items, loading }) {
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (!loading && items.length === 0) {
			const timer = setTimeout(() => setShowError(true), 300); // Adjust the delay as needed
			return () => clearTimeout(timer);
		} else {
			setShowError(false);
		}
	}, [loading, items]);
	return (
		<div className="search-results-container">
			{loading ? (
				<p>Cargando...</p>
			) : (
				items.map((item) => (
					<Link
						to={`/items/${item.id}`}
						key={item.id}
						className="card-link"
					>
						<Card data={item} />
					</Link>
				))
			)}
			{showError && (
				<div className="no-results">
					<p className="no-results-title">
						No hay publicaciones que coincidan con tu búsqueda
					</p>
					<ul>
						<li>
							<span>Revisá la ortografía </span>de la palabra.
						</li>
						<li>
							Utilizá <span>palabras más genéricas</span> o menos
							palabras.
						</li>
						<li>
							<a href="/">Navegá por las categorías</a> para
							encontrar un producto similar
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}

export default SearchResults;
