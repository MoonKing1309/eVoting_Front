import style from './css/Navbar.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
function Navbar()
{
    const dispatch = useDispatch();
    const loginID = useSelector((state) => state.auth.loginID);
    

    function handleLogOut(){
        dispatch(logout())
    }

    
    if(loginID==null)
    return(
        <div id={style.nav}>
            <div className={style.navTitle0}>
                <Link to='/home'>VOTENOW</Link>
            </div>
            <div className={style.navBody0}>
                <div className={style.navLink0}>
                    <Link to='/' className={style.link} id={style.hideSmallScreen}>Home</Link>
                    <Link to='/vote' className={style.link}>Vote</Link>
                    <Link to='/results' className={style.link}>Results</Link>
                </div>
                <div className={style.navButtons0}>
                    <Link to='/signup'>Sign-Up</Link> 
                    <Link to='/login'>Log-In</Link>
                </div>
            </div>
            
        </div>
    )
    else if(loginID=='root')
        return(
            <div id={style.nav}>
            <div className={style.navTitle1}>
                <Link to='/home'>VOTENOW</Link>
            </div>
            <div className={style.navBody1}>
                <div className={style.navLink1}>
                    <Link to='/' className={style.link} id={style.hideSmallScreen}>Home</Link>
                    <Link to='/results' className={style.link}>Results</Link>
                    <Link to='/admin' className={style.link}>Admin</Link>
                </div>
                <div className={style.navButtons1}>
                    <Link to='/home' onClick={handleLogOut}>Log-Out</Link>
                </div>
            </div>
        </div>
    )
    else
    return(
        <div id={style.nav}>
            <div className={style.navTitle1}>
                <Link to='/home'>VOTENOW</Link>
            </div>
            <div className={style.navBody1}>
                <div className={style.navLink1}>
                    <Link to='/' className={style.link} id={style.hideSmallScreen}>Home</Link>
                    <Link to='/vote' className={style.link}>Vote</Link>
                    <Link to='/results' className={style.link}>Results</Link>
                    <Link to='/account' className={style.link}>My Account</Link>
                </div>
                <div className={style.navButtons1}>
                    <Link to='/home' onClick={handleLogOut}>Log-Out</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;