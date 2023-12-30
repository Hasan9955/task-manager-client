
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import useAuth from '../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Image from '../assets/manageTask.png'



const image_hosting_key = import.meta.env.VITE_imageBB_api
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const SignUp = () => {

    const { createUser, googleSign, updateUser } = useAuth();
    const [btnLoading, setBtnLoading] = useState(false);

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate(); 


    const { handleSubmit, formState: { errors }, register, reset } = useForm();



    const onSubmit = async (data) => { 
        setBtnLoading(true)
        const imageFile = {image: data.photo[0]} 
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type' : 'multipart/form-data' 
            }
        }) 
        if(res.data.success){
            const name = data.name;
            const photo = res.data.data.display_url;
            const email = data.email;
            const password = data.password;
            const userDetails = {name, email} 


            createUser(email, password)
            .then(res => {
                if(res.user){
                    updateUser(name, photo)
                    .then(() =>{
                      axiosPublic.post('/users', userDetails)
                      .then(res => { 
                        if(res.data.insertedId){
                            setBtnLoading(false)
                            navigate("/")
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Sign up successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                      })
                    })
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "This email is already registered!", 
                  });
                  reset();
                  setBtnLoading(false)
            })
        }
        
    }

    const handleGoogle = () => {
        googleSign()
            .then(res => {
                const userInfo = {
                    name: res.user?.displayName, 
                    email: res.user?.email 
                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    if(res){
                        navigate("/")
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "SignIn successfully!",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                }) 
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <>
            <Helmet>
                <title>Sign Up | Task Manager</title>
            </Helmet>
            <div className="hero p-5">
                <div className="hero-content shadow-2xl md:mx-20  flex flex-col lg:flex-row-reverse justify-center items-center pb-20">
                    <div className=" ">
                        <img src={Image} alt="signUp" />
                    </div>
                    <div className="w-full lg:w-[500px]">
                        <form onSubmit={handleSubmit(onSubmit)} className="md:card-body">
                            <h2 className='text-4xl font-extrabold text-center uppercase'>Sign Up</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input className="input input-bordered" {...register("name", { required: true })} />
                                {errors.name?.type === "required" && (<p className='text-red-600 font-bold text-center' role="alert">Name is required !!!</p>)}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Photo</span>
                                </label>
                                <input type="file" className="file-input file-input-bordered w-full" {...register("photo", { required: true })} />
                                {errors.photo?.type === "required" && (<p className='text-red-600 font-bold text-center' role="alert">Photo is required !!!</p>)}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type='email' className="input input-bordered" {...register("email", { required: true })} />
                                {errors.email?.type === "required" && (<p className='text-red-600 font-bold text-center' role="alert">Email is required !!!</p>)}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type='password' className="input  input-bordered" {...register("password", { required: true, pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8}$/  })} />
                                {errors.password?.type === "required" && (<p className='text-red-600 font-bold text-center' role="alert">Password is required !!!</p>)}
                                {errors.password?.type === 'pattern' && (<ul className="text-red-500 list-disc text-sm font-semibold mt-2 ml-4">
                                    <li>Ensure the length is exactly 8 characters.</li>
                                    <li>At least one upper case letter.</li>
                                    <li>At least one digit.</li>
                                    <li>At least one special character.</li>
                                </ul>)}
                            </div>
                            <div className="form-control mt-2">
                                {
                                    btnLoading ? <span className="loading loading-bars loading-lg mx-auto"></span> : 
                                <button className="btn bg-gradient-to-r from-[#3bbaf5] to-[#75e5f3] hover:from-[#75e5f3] hover:to-[#3bbaf5] text-white uppercase">Sign Up</button>
                                }
                            </div>
                        </form>
                        <div className='text-center'>
                            <p>Already have an account? <Link className='text-blue-600 font-bold' to='/signIn'>Sign In</Link></p>
                            <div className=' '>
                                <p>Or sign in with</p>
                                <div className='flex justify-center items-center gap-5 mt-1'>
                                    <button onClick={() => toast.error("Sorry... This feature is not available!")} className='btn btn-circle border border-black'>
                                        <FaFacebook className='text-2xl text-blue-600'></FaFacebook>
                                    </button>
                                    <button onClick={handleGoogle} className='btn btn-circle border border-black'>
                                        <FcGoogle className='text-2xl'></FcGoogle>
                                    </button>
                                    <button onClick={() => toast.error("Sorry... This feature is not available!")} className='btn btn-circle border border-black'>
                                        <FaGithub className='text-2xl'></FaGithub>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;