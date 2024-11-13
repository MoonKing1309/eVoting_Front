import { useEffect ,useState} from 'react';
import style from './css/Account.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Account() {
    const dispatch = useDispatch();
    const loginID = useSelector((state) => state.auth.loginID);

    const navigate = useNavigate()

    const [loading,setLoading] = useState(true)
    const [data,setData] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:5001/account/${loginID}`)
        .then((data)=>{
            setData(data.data.msg)
            setLoading(false)

        })
        .catch((error)=>{
            alert("Error Fetching user data!")
        })
    },[])

    if (loading) return (  <div className={style.circleLoader}></div>)
        console.log(data)
    return (
        <div id={style.container}>
            <table style={{margin:'auto'}}>
                <tbody>
                    <tr>
                        <td>
                            <label>Your VoterID is </label>
                        </td>
                        <td>
                            <input disabled value={data.voterID}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Your Phone Number is </label>
                        </td>
                        <td>
                            <input disabled value={data.phoneNumber}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Enter new password </label>
                        </td>
                        <td>
                            <input id='pwd' placeholder='Enter New Password'></input>
                            <p></p>
                            <input id='cpwd' placeholder='Confirm Password'></input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}> <button onClick={
                            ()=>{
                                axios.put(`http://localhost:5001/account/${loginID}`,{newPwd:document.getElementById('pwd').value}).then(()=>{
                                    navigate('/home')
                                })
                            }
                        }>Update</button> </td>
                    </tr>
                </tbody>
            </table>
            </div>
    )
}

export default Account;