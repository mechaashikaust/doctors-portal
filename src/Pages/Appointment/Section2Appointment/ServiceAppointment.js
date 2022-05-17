import React from 'react';

const ServiceAppointment = ({ service, setTreatment }) => {
    const { name, slots } = service;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">

            <div className="card-body text-center">

                <h2 className="text-xl font-bold text-secondary text-center mb-3">{name}</h2>

                <p>
                    {
                        slots.length > 0 // slots.length
                            ?
                            <span>{slots[0]}</span>
                            :
                            <span className='text-red-500'>Try another date</span>
                    }
                </p>

                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>

                <div className="card-actions justify-center">

                    <label

                        onClick={() => setTreatment(service)}
                        disabled={slots.length == 0}
                        htmlFor="booking-modal"
                        className="btn btn-sm btn-secondary text-white mt-4 bg-gradient-to-r from-secondary to-primary">

                        Book Appointment

                    </label>

                </div>

            </div>

        </div>
    );
};

export default ServiceAppointment;