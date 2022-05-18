import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';

const RequireAuth = ({ children }) => {

    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return <div className='text-center mt-5 flex justify-center items-center h-screen '>
            <div>
                <h3 className='text-red-700 text-3xl'>Your Email is not verified!!</h3>
                <h5 className='text-success text-2xl pt-5 pb-5'> Please Verify your email address</h5>
                <button
                    className='btn btn-secondary text-white font-bold'
                    onClick={async () => {
                        await sendEmailVerification();
                        // toast('Sent email');
                        alert('Sent email');
                    }}
                >
                    Send Verification Email Again
                </button>
                {/* <ToastContainer></ToastContainer> */}
            </div>
        </div>
    }

    return children;
};

export default RequireAuth;