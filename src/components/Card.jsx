function Card({ data }) {
	const currencyDictionary = {
		ARS: '$',
		USD: 'U$',
	};
	const formatPrice = (amount) => {
		return new Intl.NumberFormat('de-DE').format(amount);
	};
	function truncateText(text) {
		if (text.length <= 50) {
			return text;
		}
		return text.substring(0, 50) + '...';
	}
	return (
		<div className="card-wrapper">
			<div className="card-inner">
				<div
					className="image-container"
					style={{ backgroundImage: `url(${data.picture})` }}
				></div>

				<div className="card-content">
					<div className="upper">
						<div className="price-shipping">
							<div className="item-price">
								{data.price.currency &&
									data.price.amount != null && (
										<p>
											{
												currencyDictionary[
													data.price.currency
												]
											}
											{formatPrice(data.price.amount)}
										</p>
									)}
							</div>
							{data.free_shipping && (
								<img
									title="Este producto cuenta con envío gratis"
									className="free-shipping"
									src="/public/shipping.png"
									alt=""
								/>
							)}
						</div>
						{data.location && (
							<div className="seller-location">
								<p>{data.location}</p>
							</div>
						)}
					</div>
					<div className="lower">
						<p className="item-title">{truncateText(data.title)}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
