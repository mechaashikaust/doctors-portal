import React from 'react';
import chair from '../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Section1Appointment = ({ date, setDate }) => {

    return (
        <div className="hero min-h-screen bg-[url('/src/assets/images/bg.png')] bg-no-repeat bg-contain bg-left-top">

            <div className="hero-content gap-11 flex-col lg:flex-row-reverse">

                <img src={chair} className="max-w-lg rounded-lg shadow-2xl" alt='Dentist Chair' />

                <div className=' bg-secondary rounded'>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </div>
            </div>

        </div>
    );
};

export default Section1Appointment;