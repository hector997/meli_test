import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
	//creates an instance of URLSearchParams from the current URLs query string
	return new URLSearchParams(useLocation().search);
}

function SearchResults() {
	const [results, setResults] = useState([]);
	const query = useQuery().get('search'); //Returns the first value associated with the given search parameter (search).
	const [error, setError] = useState(null);

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
					console.log('full response:', data.results);
					setResults(data.results.results);
				})
				.catch((error) => {
					console.error(
						'Error fetching data at searchResult:',
						error
					);
					setError(error);
				});
		} else {
			setResults([]); // If there is no query, clear results
		}
	}, [query]); //this makes the useEffect re-run specifically when the search query parameter changes

	if (error) {
		return <div>Error: {error}</div>;
	}
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
