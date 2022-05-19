import React from 'react';
import Infocard from './Infocard';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons//marker.svg';
import phone from '../../../assets/icons/phone.svg';


const Section2 = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            <Infocard cardTitle="Opning Hours" bgclassName="bg-gradient-to-r from-secondary to-primary" img={clock}></Infocard>
            <Infocard cardTitle="Our Locations" bgclassName="bg-accent" img={marker}></Infocard>
            <Infocard cardTitle="Contact US" bgclassName="bg-gradient-to-r from-secondary to-primary" img={phone}></Infocard>
        </div>
    );
};

export default Section2;