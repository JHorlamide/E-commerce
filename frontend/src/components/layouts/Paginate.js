import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
	pageNumber,
	pages,
	isAdmin = false,
	searchKeyWord = '',
}) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((pageNum) => {
					return (
						<LinkContainer
							key={pageNum + 1}
							to={
								!isAdmin
									? searchKeyWord
										? `/search/${searchKeyWord}/page/${pageNum + 1}`
										: `/page/${pageNum + 1}`
									: `/admin/productlist/${pageNum + 1}`
							}
						>
							<Pagination.Item active={pageNum + 1 === pageNumber}>
								{pageNum + 1}
							</Pagination.Item>
						</LinkContainer>
					);
				})}
			</Pagination>
		)
	);
};

export default Paginate;
