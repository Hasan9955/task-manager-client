import { Link } from 'react-router-dom';
import bannerImg from '../../assets/banner1.png'
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
       <>
       <Helmet>
        <title>Task Manager</title>
       </Helmet>
        <div className='p-5 flex justify-between items-center gap-5 flex-col md:flex-row-reverse'>
            <img className='md:w-1/2' src={bannerImg} alt="bannerImg" />
            <div className='max-w-xl'>
                <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold'>Elevate Your Productivity with Task Manager!</h1>
                <p className='mt-4 text-lg '>Organize and manage your team like a boss with Task Master, a free task management tool packing more capabilities than you can imagine.</p>
                <Link to="/signIn"><button className='btn bg-[#3bbaf5] mt-4 text-white'>Explore Now</button></Link>
            </div>
        </div>
       </>
    );
};

export default Home;