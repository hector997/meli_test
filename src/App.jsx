import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResutls';
import './assets/styles/main.scss';

function App() {
	//sets up the client-side routing
	return (
		<Router>
			<div className="App">
				<SearchBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/items" element={<SearchResults />} />
					<Route path="/items/:id" element={<ProductDetails />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
