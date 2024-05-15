function Card({ data }) {
	const currencyDictionary = {
		ARS: '$',
		USD: 'U$',
	};
	return (
		<div className="card-wrapper">
			<div className="card-inner">
				<div className="image-container">
					<img src={data.picture} alt={data.title} />
				</div>
				<div className="card-content">
					<div className="content-upper">
						<div className="item-price">
							{data.price.currency &&
								data.price.amount != null && (
									<p>
										{
											currencyDictionary[
												data.price.currency
											]
										}
										{data.price.amount}
									</p>
								)}
						</div>
						{data.free_shipping && (
							<img
								className="free-shipping"
								src="/public/shipping.png"
								alt=""
							/>
						)}
					</div>
					<p className="item-title">{data.title}</p>
					<div className="seller-location">
						<p>Capital Federal</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
