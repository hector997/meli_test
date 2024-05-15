import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
	const [selectedProduct, setSelectedProduct] = useState(null);

	const [items, setItems] = useState([]);
	const [categories, setCategories] = useState([]);

	const location = useLocation();
	const query = new URLSearchParams(location.search).get('search');

	useEffect(() => {
		if (query) {
			fetch(`/api/products/list?q=${query}`)
				.then((response) => response.json())
				.then((data) => {
					setItems(data.items);
					setCategories(data.categories);
					setSelectedProduct(null); // Reset selected product on new search
				})
				.catch((error) => {
					console.error('Error fetching product list:', error);
				});
		} else {
			setItems([]);
			setCategories([]);
			setSelectedProduct(null); // Reset selected product on empty query
		}
	}, [query]);
	useEffect(() => {
		console.log('Selected product changed:', selectedProduct);
	}, [selectedProduct]);
	return (
		<AppContext.Provider
			value={{
				items,
				categories,
				selectedProduct,
				setSelectedProduct,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
