import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ keyword: keywords, title, description }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='keyword' content={keywords} />
			<meta name='description' content={description} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome To ProShop',
	description: 'We sell the best product for cheap',
	keyword: 'electronic, buy electronic, cheap electronic',
};

export default Meta;
