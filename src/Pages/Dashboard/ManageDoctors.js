import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import DeleteConfirmModal from './DeleteConfirmModal';
import DoctorsTable from './DoctorsTable'

const ManageDoctors = () => {

    const [deletingDoctor, setDeletingDoctor] = useState(null);

    // {10} Getting all Doctors 

    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('http://localhost:5000/doctor', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            
            <h2 className="text-2xl">Manage Doctors: {doctors.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <DoctorsTable
                                key={doctor._id}
                                doctor={doctor}
                                index={index}
                                refetch={refetch}
                                setDeletingDoctor={setDeletingDoctor}
                            ></DoctorsTable>)
                        }
                    </tbody>
                </table>
            </div>

            {deletingDoctor && <DeleteConfirmModal
                deletingDoctor={deletingDoctor}
                refetch={refetch}
                setDeletingDoctor={setDeletingDoctor}
            ></DeleteConfirmModal>}


        </div>

    );
};

export default ManageDoctors;