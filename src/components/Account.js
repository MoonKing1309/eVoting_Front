import { useEffect ,useState} from 'react';
import style from './css/Account.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

function Account() {
    const dispatch = useDispatch();
    const loginID = useSelector((state) => state.auth.loginID);

    const [loading,setLoading] = useState(true)
    const [data,setData] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:5001/account/${loginID}`)
        .then((data)=>{
            setData(data.data)
            setLoading(false)

        })
        .catch((error)=>{
            alert("Error Fetching user data!")
        })
    },[])

    if (loading) return (  <div className={style.circleLoader}></div>)
    return (
        <div id={style.container}>
            <table>
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
                            <input id='cpwd' placeholder='Confirm Password'></input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Account;