import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyAppointments = () => {


    const [appointments, setAppointments] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {

            // {4} My Appointemnts with verifying JWT

            fetch(`http://localhost:5000/booking?patient=${user.email}`, {
                method: 'GET', 
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => setAppointments(data));
        }
    }, [user]);

    return (
        <div>
            <h2>MyAppointments: {appointments.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((appointment, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.slot}</td>
                                    <td>{appointment.treatment}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyAppointments;