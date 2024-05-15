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
import { useAppContext } from '../context/ContextProvider';

function SearchResults({ items }) {
	const { setSelectedProduct } = useAppContext();

	const handleProductClick = (product) => {
		setSelectedProduct(product);
	};
	return (
		<div>
			<h1>Resultados</h1>
			<ul>
				{items.length > 0 ? (
					items.map((item, index) => (
						<li
							key={index}
							onClick={() => handleProductClick(item)}
						>
							<Link to={`/items/${item.id}`}>
								<img src={item.picture} alt={item.title} />
								<p>{item.title}</p>
								<p>
									{item.price.currency} {item.price.amount}.
									{item.price.decimals}
								</p>
								<p>{item.condition}</p>
								{item.free_shipping && <p>Free Shipping</p>}
							</Link>
						</li>
					))
				) : (
					<p>Sin resultados</p>
				)}
			</ul>
		</div>
	);
}

export default SearchResults;
