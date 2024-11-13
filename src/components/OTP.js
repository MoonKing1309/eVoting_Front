import style from './css/OTP.module.css'
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import axios from 'axios'
import { useEffect } from 'react';


function OTP(){
    const { voterID } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5001/login/${voterID}`).then((temp)=>{
            console.log("OTP has been generatee")
        })
    },[])

    const handleInputChange = (index, e) => {

        const value = e.target.value;
        if (isNaN(value)) {
          return;
        }
        if (value !== "") {
          const nextInput = document.getElementsByName(`${index + 1}`)[0];
          if (nextInput) {
            nextInput.focus();
          }
        }
      };
      const handleKeyUp = (index, e) => {
        if (e.key.toLowerCase() === "backspace" || e.key.toLowerCase() === "delete") {
          const prevInput = document.getElementsByName(`${index - 1}`)[0];
          if (prevInput) {
            prevInput.focus();
          }
        }
      };

      const handleOTPSubmit = async (event)=>{
        event.preventDefault();
        let otpNotMatch = document.getElementById('otpNotMatch')
        otpNotMatch.style.display='none'
        let finalOtp = '';
        for(let i =0;i<6;i++){
                finalOtp = finalOtp+ document.getElementsByName(`${i}`)[0].value
                
        }
        console.log(finalOtp)
        await axios.post(`http://localhost:5001/login/${voterID}`,{finalOtp}).then((temp)=>{

            if(temp.status==200){
                dispatch(login(voterID))
                navigate('/home')
            }
            else{
                otpNotMatch.style.display='block'
            }
        })

      }

    return(
        <div id={style.content}>
            <div id={style.formbox}>
                <h1 style={{ color: 'rgb(0,149,255' }}>OTP Verification</h1>
                <form>
                    <table id={style.tableForm}>
                        <tbody>
                            <tr>
                                <td>Enter your OTP</td>
                                <td>
                                {['','','','','',''].map((value, index) => (
                                    <input
                                    name={index}
                                    type="numeric"
                                    maxLength="1"
                                    onChange={(e) => handleInputChange(index, e)}
                                    onKeyUp={(e) => handleKeyUp(index, e)}
                                    className={style.otpInput}
                                    />))}
                                </td>
                                <h5 id='otpNotMatch' style={{ display: 'none', color: "red" }}>Incorrect OTP</h5>
                            </tr>
                            <tr>
                                <td colSpan={2}><button id={style.loginButton} type="submit"  onClick={handleOTPSubmit}>Login</button></td>
                            </tr>
                            {/* <tr>
                            <td colSpan={2} ><button id={style.linkButton}>Resend OTP</button></td>
                            </tr> */}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default OTP