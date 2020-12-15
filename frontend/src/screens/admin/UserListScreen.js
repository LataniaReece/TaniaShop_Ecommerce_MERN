import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../components/Layout/Alert'
import Spinner from '../../components/Layout/Spinner'
import { deleteUser, listUsers } from '../../actions/userActions'
import Pagination from '../../components/Pagination'


const UserListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users, pages, page } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers(pageNumber))
        } else {
            history.push('/auth')
        }
    }, [userInfo, dispatch, history, successDelete, pageNumber])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            {userInfo && (
                loading ? <Spinner /> :
                    error ? <Alert type="danger">{error}</Alert> : (
                        <section className="admin-user-list container">
                            <div className="main-content">
                                <h1 className="header">Users</h1>
                                <div className="table-list admin-list">
                                    {users && (
                                        <>
                                            <table className="table">
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
                                                        return <tr key={user._id}>
                                                            <td data-label="ID">{user._id}</td>
                                                            <td data-label="Name">{user.name}</td>
                                                            <td data-label="Email">
                                                                <a href={`mailto:${user.email}`} className="user-email">{user.email}</a>
                                                            </td>
                                                            <td data-label="Admin">
                                                                {user.isAdmin ? (
                                                                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                                                                ) : (
                                                                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                                                                    )}
                                                            </td>
                                                            <td>
                                                                <button className="icon-action"><Link to={`/admin/users/${user._id}/edit`}><i className='fas fa-edit'></i></Link></button>
                                                                <button onClick={() => deleteHandler(user._id)} className="icon-action"><i className="fas fa-trash"></i></button>
                                                            </td>
                                                        </tr>
                                                    })}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                pages={pages}
                                                page={page}
                                                isAdminUsers="true"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>
                    ))
            }
        </>
    )
}

export default UserListScreen

