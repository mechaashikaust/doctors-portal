import React from 'react';
import chair from '../../../assets/images/chair.png'

const Section1 = () => {
    return (
        <div class="hero min-h-screen bg-[url('/src/assets/images/bg.png')] bg-no-repeat bg-contain bg-left-top
        ">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} class="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 class="text-5xl font-bold">Welcome to Doctors Portal!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button class="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Section1;