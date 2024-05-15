import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Categories from './components/Categories';
import { ContextProvider, useAppContext } from './context/ContextProvider';
import './assets/styles/main.scss';

function Main() {
	const { items, categories } = useAppContext();

	return (
		<div className="App">
			<SearchBar />
			{categories && categories.length > 0 && (
				<Categories categories={categories} />
			)}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/items"
					element={<SearchResults items={items} />}
				/>
				<Route path="/items/:id" element={<ProductDetails />} />
			</Routes>
		</div>
	);
}

function App() {
	return (
		<Router>
			<ContextProvider>
				<Main />
			</ContextProvider>
		</Router>
	);
}

export default App;
