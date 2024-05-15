import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
	const [query, setQuery] = useState('');

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/items?search=${query}`); // updates the URL with the search query
	};
	const clearInput = () => {
		setQuery(''); // Clear the input
		navigate('/'); // Navigate to home
	};
	return (
		<div className="searchbar-container">
			<div className="inner-searchbar">
				<div className="logo-wrap" onClick={clearInput}>
					<img src="/meli_logo.png" alt="" />
				</div>
				<form onSubmit={handleSubmit} className="searchbar">
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Nunca dejes de buscar"
					/>
					<button className="submit-btn" type="submit">
						<img src="/lupa.png" alt="" />
					</button>
				</form>
			</div>
		</div>
	);
}

export default SearchBar;
