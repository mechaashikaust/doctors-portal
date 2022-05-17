import React from 'react';
import chair from '../../../assets/images/chair.png'
import Button from '../../Shared/Button/Button';

const Section1 = () => {
    return (
        <div className="hero min-h-screen bg-[url('/src/assets/images/bg.png')] bg-no-repeat bg-contain bg-left-top
        ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="max-w-lg rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Welcome to Doctors Portal!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default Section1;