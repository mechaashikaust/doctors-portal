import React from 'react';
import { toast } from 'react-toastify';

const UsersTable = ({ user, index, refetch }) => {

    const { email, role } = user;

    const makeAdmin = () => {

        // {6} Admin

        fetch(`https://fathomless-ridge-60823.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to make an Admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('Successfully made an Admin');
                }
            })

    }

    return (
        <tr >

            <th>{index + 1}</th>
            <td>{email}</td>
            <td>
                {
                    role !== 'admin'
                        ?
                        <button className="btn btn-xs" onClick={makeAdmin}>Make Admin</button>
                        :
                        <button className="btn btn-sm btn-primary font-bold">Admin</button>
                }
            </td>
            <td><button className="btn btn-xs">Remove User</button></td>


        </tr>
    );
};

export default UsersTable;