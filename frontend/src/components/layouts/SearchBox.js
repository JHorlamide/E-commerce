import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
	const [searchKeyWord, setSearchKeyWord] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();

		if (searchKeyWord.trim()) {
			history.push(`/search/${searchKeyWord}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form className='d-flex' onSubmit={submitHandler} inline>
			<Form.Control
				className='mr-sm-2 ml-ms-5'
				type='text'
				name='q'
				placeholder='Search Products...'
				onChange={(e) => setSearchKeyWord(e.target.value)}
			></Form.Control>

			<Button className='p-2 mx-2' type='submit' variant='outline-success'>
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
