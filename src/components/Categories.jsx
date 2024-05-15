import React from 'react';

function Categories({ categories }) {
	return (
		<div className="categories-container">
			<div className="categories">
				{categories.map((category, index) => (
					<React.Fragment key={index}>
						<p className="category-text">{category}</p>
						{index !== categories.length - 1 && (
							<img
								className="chevron-right"
								src="https://www.svgrepo.com/show/335216/chevron-right.svg"
								alt=""
							/>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export default Categories;
