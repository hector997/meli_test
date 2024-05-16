import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function Categories({ categories }) {
	const navigate = useNavigate();
	const location = useLocation();
	const showBackButton = location.pathname.includes('/items/MLA');

	return (
		<div className="categories-container">
			{showBackButton && (
				<div className="button-wrapper">
					<button
						onClick={() => navigate(-1)}
						className="go-back-button"
					>
						Volver al listado
					</button>
					<span>|</span>
				</div>
			)}
			{categories && categories.length != 0 ? (
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
			) : (
				''
			)}
		</div>
	);
}

export default Categories;
