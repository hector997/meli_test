import React from 'react';

function Categories({ categories }) {
	return (
		<div>
			<ul style={{ display: 'flex' }}>
				{categories.map((category, index) => (
					<li key={index}>{category}</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
