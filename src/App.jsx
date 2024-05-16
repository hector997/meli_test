import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Categories from './components/Categories';
import './assets/styles/main.scss';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}
function Main() {
	const [items, setItems] = useState(null);
	const [categories, setCategories] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const location = useLocation();
	const query = useQuery().get('search');

	useEffect(() => {
		if (query) {
			setLoading(true);
			fetch(`/api/products/list?q=${query}`)
				.then((response) => response.json())
				.then((data) => {
					setItems(data.items);
					setCategories(data.categories);
					setLoading(false);

					console.log('cats:', categories);
				})
				.catch((error) => {
					console.error('Error fetching product list:', error);
					setError(error.message);
					setLoading(false);
				});
		}
	}, [query]);

	return (
		<div className="App">
			<SearchBar />
			<div className="app-content">
				{location.pathname !== '/' && (
					<Categories categories={categories} />
				)}

				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/items"
						element={
							<SearchResults items={items} loading={loading} />
						}
					/>
					<Route path="/items/:id" element={<ProductDetails />} />
				</Routes>
			</div>
		</div>
	);
}

function App() {
	return (
		<Router>
			<Main />
		</Router>
	);
}

export default App;
