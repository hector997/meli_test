import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

function SearchResults({ items, loading }) {
	const showError = !loading && items && items.length === 0;
	return (
		<div className="search-results-container">
			{showError ? (
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
			) : loading ? (
				<div className="loading">
					<div className="loader"></div>
				</div>
			) : (
				items &&
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
		</div>
	);
}

export default SearchResults;
