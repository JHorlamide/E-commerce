import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { getUserList, deleteUser } from '../../actions/userAction';

/* Custom Component */
import Loader from '../layouts/Loader';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  /* Get users from userList state */
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;

  /* Get users from userList state */
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  /* Get users from userList state */
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const handleUserDelete = (userId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <>
    <h2>Users</h2>
      {loading ? (
        <Loader />
      ) : (
        <Table className='table-sm' striped responsive bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td className='text-uppercase'>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button className='btn-sm' variant='light'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={(e) => handleUserDelete(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
