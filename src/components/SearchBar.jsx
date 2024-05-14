import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
	const [query, setQuery] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		navigate(`/`); // clears the search input when the component mounts
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/items?search=${query}`); // updates the URL with the search query
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search..."
			/>
			<button type="submit">buscar</button>
		</form>
	);
}

export default SearchBar;
