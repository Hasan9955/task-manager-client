import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {

    const {user, logOut} = useAuth();


    const links = <>
        <li><NavLink to="/"
            style={({ isActive }) => ({
                color: isActive && '#fff',
                background: isActive && '#3bbaf5',
            })}
        >HOME</NavLink></li>
        <li><NavLink to="/dashboard"
            style={({ isActive }) => ({
                color: isActive && '#fff',
                background: isActive && '#3bbaf5',
            })}
        >DASHBOARD</NavLink></li>
        <li><NavLink to="/about"
            style={({ isActive }) => ({
                color: isActive && '#fff',
                background: isActive && '#3bbaf5',
            })}
        >ABOUT</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link to="/"><img className='w-32' src={logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex justify-center items-center gap-5">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? 
                    <button onClick={logOut} className="btn btn-outline lg:btn-sm btn-xs rounded-full text-[#3bbaf5] hover:bg-[#3bbaf5] hover:border-[#3bbaf5]">Sign Out</button>
                  : <Link to='/signIn'>
                    <button className="btn btn-outline lg:btn-sm btn-xs rounded-full text-[#3bbaf5] hover:bg-[#3bbaf5] hover:border-[#3bbaf5]">Sign In</button>
                </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;