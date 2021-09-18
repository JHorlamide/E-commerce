import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Alert } from 'react-bootstrap';

const Message = ({ alertType, errorMessage }) => {
	const alerts = useSelector((state) => state.alert);

	return (
		<Container className='py-3'>
			{alerts.map((alert) => {
				return (
					<Container key={alert.id}>
						<Alert variant={alert.type ? alert.type : alertType}>
							{alert.message ? alert.message : errorMessage}
						</Alert>
					</Container>
				);
			})}
		</Container>
	);
};

export default Message;
