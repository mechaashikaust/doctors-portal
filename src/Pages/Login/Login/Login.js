import React, { useEffect, useRef, useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init'
import { useForm } from "react-hook-form";
import Loading from '../../Shared/Loading/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken';


const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    // const [email, setEmail] = useState('');

    {/***************React Firebase Hooks - Auth*****************/ }
    const [
        signInWithGoogle,
        googleUser,
        googleLoading,
        googleError
    ] = useSignInWithGoogle(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(user || googleUser);

    // const [
    //     sendPasswordResetEmail,
    //     sending
    // ] = useSendPasswordResetEmail(auth);


    // const emailRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
     

    useEffect(() => {
        if (token) {

            navigate(from, { replace: true });

        }
    }, [token, from, navigate]);

    if (loading || googleLoading) {
        return <Loading></Loading>
    }

    let signInError;

    if (error || googleError) {
        signInError = <p className='text-red-500'>{error?.message || googleError?.message}</p>

    }

    {/***************React Firebase Hooks - Auth*/ }


    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    };



    // const resetPassword = async () => {
    //     const email = emailRef.current.value;
    //     if (email) {
    //         await sendPasswordResetEmail(email);
    //         toast('Sent email');
    //     }
    //     else{
    //         toast('Please Enter your Email Address')
    //     }
    // }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">

                    <h2 className="text-center text-2xl font-bold">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">

                            {/***************EMAIL INPUT FIELD START*****Daijy + React Form************/}
                            <label className="label">
                                <span className="label-text">Email</span>

                            </label>
                            <input
                                // ref={emailRef}
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                }
                                )}

                                
                            />
                            <label>
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                            {/***************EMAIL INPUT FIELD END*/}

                            {/***************Password INPUT FIELD START*****************/}
                            <label className="label">
                                <span className="label-text">Password</span>

                            </label>
                            <input

                                type="password"
                                placeholder="Your Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be 6 Characters or Longer'
                                    }
                                }
                                )}

                            />
                            <label>
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                            {/***************Password INPUT FIELD END*/}

                        </div>

                        {/* <p className='mt-2'>
                            <small>
                                Forget Password?
                                <Link to="/login" className="text-primary text-decoration-none" onClick={() => resetPassword(email)}>
                                    Reset Password
                                </Link>
                            </small>
                        </p> */}

                        {signInError}

                        <input className='btn w-full max-w-xs mt-4 text-white font-bold' type="submit" value="Login" />

                    </form>

                    <p><small>New to Doctor's Portal? <Link to="/register" className='text-primary'>Create new Account</Link></small></p>

                    <div className="divider">OR</div>

                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue With Google</button>

                </div>
            </div>
        </div>
    );
};

export default Login;