import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
	return new URLSearchParams(useLocation().search); // this gets the param from the url
}

function SearchResults() {
	const [results, setResults] = useState([]);
	const query = useQuery().get('search');

	useEffect(() => {
		if (query) {
			fetch(`/api/products/list?q=${query}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error(
							`HTTP error! status: ${response.status}`
						);
					}
					return response.json();
				})
				.then((data) => {
					console.log('SUCCESS:::::::: Fetched data:', data.results);
					setResults(data.results.results);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		} else {
			setResults([]); // If there is no query, clear results
		}
	}, [query]);

	return (
		<div>
			<h1>resultados</h1>

			<ul>
				{Array.isArray(results) && results.length > 0 ? (
					results.map((result, index) => (
						<li key={index}>
							<Link to={`/items/${result.id}`}>
								<p>{result.title}</p>
							</Link>
						</li>
					))
				) : (
					<p>sin resultados</p>
				)}
			</ul>
		</div>
	);
}

export default SearchResults;
