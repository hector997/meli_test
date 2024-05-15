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
	const [items, setItems] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

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
				})
				.catch((error) => {
					console.error('Error fetching product list:', error);
					setError(error.message);
					setLoading(false);
				});
		} else {
			setItems([]);
			setCategories([]);
			setLoading(false);
		}
	}, [query]);

	return (
		<div className="App">
			<SearchBar />
			<div className="app-content">
				{categories.length > 0 && (
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
