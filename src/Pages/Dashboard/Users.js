import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import UsersTable from './UsersTable';

const Users = () => {


    // {5} get All Users
    const { isLoading, refetch, data: users } = useQuery(['users'], () =>
        fetch(`http://localhost:5000/user`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    )
    if (isLoading) return <Loading></Loading>

    return (
        <div>
            <h2 className='text-2xl'>All Users: {users.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <UsersTable
                                    key={user._id}
                                    user={user}
                                    index={index}
                                    refetch={refetch}
                                ></UsersTable>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Users;


