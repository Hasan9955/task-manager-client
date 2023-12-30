import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
// import Image from '../assets/signIn image1.jpg'
import Image from '../assets/manageTask.png'
import useAxiosPublic from '../Hooks/useAxiosPublic';


const SignIn = () => {

    const [disable, setDisable] = useState(true);
    const captchaRef = useRef();
    const navigate = useNavigate();
    const { googleSign, signInUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const location = useLocation(); 


    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign In successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location.state ? location.state : '/')
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email or password invalid!",
                });
            })

    }


    const handleGoogle = () => {
        googleSign()
            .then(res => {
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    photo: res.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res) {
                            navigate(location.state ? location.state : '/')
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

    const handleCaptcha = () => {
        const captcha_value = captchaRef.current.value;
        if (captcha_value.length >= 6) {
            if (validateCaptcha(captcha_value)) {

                setDisable(false)
            }
            else {
                setDisable(true)
            }
        }
    }



    return (
        <>
            <Helmet>
                <title>Sign In | Task Manager</title>
            </Helmet>
            <div className="hero p-5">
                <div className="hero-content shadow-2xl md:mx-20  flex flex-col lg:flex-row justify-center items-center pb-20">
                    <div className=" ">
                        <img src={Image} alt="" />
                    </div>
                    <div className="w-full lg:w-[500px]">
                        <form onSubmit={handleLogin} className="md:card-body">
                            <h2 className='text-2xl md:text-4xl uppercase font-extrabold text-center'>Sign In</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <LoadCanvasTemplate />
                                <input onChange={handleCaptcha} type="text" name='captcha' placeholder="captcha" ref={captchaRef} className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-2">
                                <button disabled={disable} className={disable ? 'btn' : "btn bg-gradient-to-r from-[#3bbaf5] to-[#75e5f3] hover:from-[#75e5f3] hover:to-[#3bbaf5] text-white"}>SIGN IN</button>
                            </div>
                        </form>
                        <div className='text-center'>
                            <p>New here? <Link className='text-blue-600 font-bold' to='/signUp'>Create a New Account</Link></p>
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

export default SignIn;