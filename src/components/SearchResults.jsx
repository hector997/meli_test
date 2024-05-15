// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// function useQuery() {
// 	//creates an instance of URLSearchParams from the current URLs query string
// 	return new URLSearchParams(useLocation().search);
// }

// function SearchResults() {
// 	const [results, setResults] = useState([]);
// 	const [categories, setCategories] = useState([]);

// 	const query = useQuery().get('search'); //Returns the first value associated with the given search parameter (search).
// 	const [error, setError] = useState(null);

// useEffect(() => {
// 	if (query) {
// 		fetch(`/api/products/list?q=${query}`)
// 			.then((response) => {
// 				if (!response.ok) {
// 					throw new Error(
// 						`HTTP error! status: ${response.status}`
// 					);
// 				}
// 				return response.json();
// 			})
// 			.then((data) => {
// 				console.log('full response:', data);
// 				setResults(data.items);
// 				setCategories(data.categories);
// 			})
// 			.catch((error) => {
// 				console.error(
// 					'Error fetching data at searchResult:',
// 					error
// 				);
// 				setError(error.message);
// 			});
// 	} else {
// 		setResults([]); // If there is no query, clear results
// 	}
// }, [query]); //this makes the useEffect re-run specifically when the search query parameter changes

// if (error) {
// 	return <div>Error: {error}</div>;
// }
// return (
// 	<div>
// 		<h1>resultados</h1>

// 		<ul>
// 			{Array.isArray(results) && results.length > 0 ? (
// 				results.map((result, index) => (
// 					<li key={index}>
// 						<Link to={`/items/${result.id}`}>
// 							<p>{result.title}</p>
// 						</Link>
// 					</li>
// 				))
// 			) : (
// 				<p>sin resultados</p>
// 			)}
// 		</ul>
// 	</div>
// );
// }

// export default SearchResults;
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
