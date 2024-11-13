import style from './css/Login.module.css'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import eyeShow from '../img/eyeShow16.png'
import eyeHide from '../img/eyeHide16.png'
import { useState } from "react";
import { useLocation, useParams,useNavigate} from 'react-router-dom';



export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handleSubmit(event) {
        event.preventDefault();

        var voterID = document.querySelector("input[name='voterID']").value
        var pwd = document.querySelector("input[name='pwd']").value
        var phno = document.querySelector("input[name='phno']").value

        var circleLoader = document.querySelector(`.${style.circleLoader}`)

        var pwdNotMatch = document.getElementById(`pwdNotMatch`)
        var phnoNotMatch = document.getElementById(`phnoNotMatch`)
        var voterIDMissing = document.getElementById(`voterIDMissing`)
        
        var phnoNotValid = document.getElementById(`phnoNotValid`)
        
        var voterIDReq = document.getElementById(`voterIDReq`)
        var pwdReq = document.getElementById(`pwdReq`)
        var phnoReq = document.getElementById(`phnoReq`)

        
        voterIDReq.style.display = 'none'
        pwdReq.style.display = 'none'
        phnoReq.style.display = 'none'

        let phnoTest = /^\d{10}$/;
        console.log(phno,typeOf(phno))

        if (!voterID) {
            voterIDReq.style.display = 'block'
            return
        }
        if (!pwd) {
            pwdReq.style.display = 'block'
            return
        }
        if (!phno){
            phnoReq.style.display = 'block'
            return
        }
        if(!phnoTest.test(phno)){
            phnoNotValid.style.display = 'block'
        }
        if (voterID == 'root' && pwd == 'root' && phno=='9443215711') {
            dispatch(login('root'))
            navigate('/home')
        }
        else {
            circleLoader.style.display = 'inline-block'
            try {
                await axios.post(`https://evoting-back.onrender.com/login`, { voterID, pwd , phno })
                    .then((res) => {
                        if (res.status == 201) {
                            navigate(`/verify/${voterID}`)

                        }
                    })
                    .catch((err) => {
                        if (err.response.status == 403) {
                            circleLoader.style.display = 'none'
                            voterIDMissing.style.display = 'block'
                        }
                        else if (err.response.status == 402) {
                            circleLoader.style.display = 'none'
                            pwdNotMatch.style.display = 'block'
                        }
                        else if (err.response.status == 401) {
                            circleLoader.style.display = 'none'
                            phnoNotMatch.style.display = 'block'
                        }

                    })

            } catch (error) {
                console.log(error)
            }
        }
    }

    const [pwdShow, setPwdShow] = useState(false)
    const togglePwdShow = () => {
        var pwd = document.querySelector("input[name='pwd']")
        setPwdShow(!pwdShow)
        if (pwd.getAttribute("type") == 'password')
            pwd.setAttribute('type', 'text')
        else
            pwd.setAttribute('type', 'password')
    }

    return (
        <div className={style.content}>
            <div className={style.formbox}>
                <h1 style={{ color: 'rgb(0,149,255' }}>Login <div className={style.circleLoader}></div> </h1>
                <form onSubmit={handleSubmit}>
                    <table id={style.tableForm}>
                        <tbody>
                            <tr>
                                <td><label htmlFor='voterID'><b>VoterID</b></label></td>
                                <td><input name='voterID' ></input></td>
                                <h5 id='voterIDMissing' style={{ display: 'none', color: "red" }}>VoterID Not Found</h5>
                                <h5 id='voterIDReq' style={{ display: 'none', color: "red" }}>VoterID Required</h5>
                            </tr>
                            <tr>
                                <td><label htmlFor='phno'><b>Phone No.</b></label></td>
                                <td><input name='phno' type="numeric"></input></td>
                                <h5 id='phnoNotMatch' style={{ display: 'none', color: "red" }}>Incorrect Phone Number</h5>
                                <h5 id='phnoNotValid' style={{ display: 'none', color: "red" }}>Invalid Phone Number</h5>
                                <h5 id='phnoReq' style={{ display: 'none', color: "red" }}>Phone Number Required</h5>
                            </tr>
                            <tr>
                                <td><label htmlFor='pwd'><b>Password</b></label></td>
                                <td><input name='pwd' type="password"></input><img id='eyes' src={pwdShow ? eyeHide : eyeShow} onClick={togglePwdShow}></img></td>
                                <h5 id='pwdNotMatch' style={{ display: 'none', color: "red" }}>Incorrect Password</h5>
                                <h5 id='pwdReq' style={{ display: 'none', color: "red" }}>Password Required</h5>
                            </tr>
                           
                            <tr>
                                <td colSpan={2}><button id={style.btn} type="submit" to="">Get OTP</button></td>
                            </tr>
                        </tbody>


                    </table>
                </form>
                <h6 style={{textAlign:'center'}}>If it is your first time here, the default password is 'password'</h6>
            </div>



        </div>
    )
}
