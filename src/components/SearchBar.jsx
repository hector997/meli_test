import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function SearchBar() {
	const [query, setQuery] = useState('');
	const location = useLocation();
	const navigate = useNavigate();
	const inputRef = useRef(null);

	useEffect(() => {
		//this ensures the search bar allways displays the param in the url
		const searchParams = new URLSearchParams(location.search);
		const searchQuery = searchParams.get('search');
		if (searchQuery !== null) {
			setQuery(searchQuery);
		}
	}, [location.search]);

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/items?search=${query}`); // updates the URL with the search query
		if (inputRef.current) {
			inputRef.current.blur(); // Remove focus from the input
		}
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
						ref={inputRef}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Nunca dejes de buscar"
					/>
					<button className="submit-btn" type="submit" title="Buscar">
						<img src="/lupa.png" alt="" />
					</button>
				</form>
			</div>
		</div>
	);
}

export default SearchBar;
