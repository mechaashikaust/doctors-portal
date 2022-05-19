import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init'
import { useForm } from "react-hook-form";
import Loading from '../../Shared/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import useToken from '../../../hooks/useToken';

const Registration = () => {


    const { register, formState: { errors }, handleSubmit } = useForm();

    {/***************React Firebase Hooks - Auth*****************/ }
    const [
        signInWithGoogle,
        googleUser,
        googleLoading,
        googleError
    ] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification:true});

    const [
        updateProfile,
        updating,
        updateError
    ] = useUpdateProfile(auth);

    const [token] = useToken(user || googleUser);

    const navigate = useNavigate();

    if (token) {

        navigate('/');

    }

    if (loading || googleLoading || updating) {
        return <Loading></Loading>
    }

    let signInError;

    if (error || googleError || updateError) {
        signInError = <p className='text-red-500'>{error?.message || googleError?.message || updateError?.message}</p>
    }

    {/***************React Firebase Hooks - Auth*/ }



    const onSubmit = async data => {

        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">

                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">

                            {/***************Name INPUT FIELD START*****Daijy + React Form************/}
                            <label className="label">
                                <span className="label-text">Your Name</span>

                            </label>
                            <input

                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    }
                                }
                                )}

                            />
                            <label>
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                            {/***************Name INPUT FIELD END*/}

                            {/***************EMAIL INPUT FIELD START*****Daijy + React Form************/}
                            <label className="label">
                                <span className="label-text">Email</span>

                            </label>
                            <input

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

                        {signInError}

                        <input className='btn w-full max-w-xs mt-4 text-white font-bold' type="submit" value="Sign Up" />

                    </form>

                    <p><small>Already have an account ? <Link to="/login" className='text-primary'> Please Login</Link></small></p>

                    <div className="divider">OR</div>

                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue With Google</button>

                </div>
            </div>
        </div>
    );
};

export default Registration;