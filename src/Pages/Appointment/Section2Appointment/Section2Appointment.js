import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BookingModal from './BookingModal';
import ServiceAppointment from './ServiceAppointment';
import Loading from '../../Shared/Loading/Loading';

const Section2Appointment = ({ date }) => {

    // const [services, setServices] = useState([]);

    const [treatment, setTreatment] = useState(null);

    const formattedDate = format(date, 'PP');

    const { isLoading, refetch, data: services } = useQuery(['available', formattedDate], () =>
        fetch(`https://fathomless-ridge-60823.herokuapp.com/available?date=${formattedDate}`)
            .then(res => res.json())
    )
    if (isLoading) return <Loading></Loading>

    // useEffect(() => {
    //     fetch(`https://fathomless-ridge-60823.herokuapp.com/available?date=${formattedDate}`)
    //         .then(response => response.json())
    //         .then(data => setServices(data));
    // }, [formattedDate]);

    return (
        <div className='mb-10'>

            <h4 className='text-4xl text-secondary text-center '>Available Appointments on {format(date, 'PP')}</h4>
            <h4 className='text-2xl text-[silver] text-center pb-11 pt-5'>Please Book an Appointment</h4>

            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-11'>
                {
                    services?.map(service => <ServiceAppointment
                        key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    ></ServiceAppointment>)
                }
            </div>

            {treatment && <BookingModal

                date={date}
                treatment={treatment}
                setTreatment={setTreatment}
                refetch={refetch}

            ></BookingModal>}

        </div>
    );
};

export default Section2Appointment;