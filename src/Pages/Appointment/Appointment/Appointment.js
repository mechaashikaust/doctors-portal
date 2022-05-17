import React, { useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Section1Appointment from '../Section1Appointment/Section1Appointment';
import Section2Appointment from '../Section2Appointment/Section2Appointment';

const Appointment = () => {

    const [date, setDate] = useState(new Date());

    return (
        <div>
            <Section1Appointment date={date} setDate={setDate}></Section1Appointment>
            <Section2Appointment date={date}></Section2Appointment>
            <Footer></Footer>
        </div>
    );
};

export default Appointment;