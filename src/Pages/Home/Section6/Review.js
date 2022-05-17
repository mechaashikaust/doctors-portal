import React from 'react';

const Review = ({ review }) => {
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl lg:mt-12 md:mt-5">
            <div className="card-body">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat fuga dicta error, unde vitae nemo.</p>


                <div className='flex items-center mt-5'>

                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-5">
                            <img src={review.img} alt="Person" />
                        </div>
                    </div>

                    <div>
                        <h4 className='text-xl'>{review.name}</h4>
                        <p>{review.location}</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Review;