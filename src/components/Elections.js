import style from './css/Elections.module.css'

import axios from "axios";
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function Elections(){
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [elections,setElections] = useState([])
    const [empty,setEmpty] = useState(false)
    const loginID = useSelector((state) => state.auth.loginID);

    useEffect(()=>{
        axios.get(`https://evoting-back.onrender.com/elections/${loginID}`)
        .then((data)=>{
            if(data.status==202){
                setEmpty(true)
            }
            else{
                setElections(data.data.msg)
                setLoading(false)
            }
        })
        .catch(err=>console.log(err))
    },[])

    const dispatch = useDispatch();

    if(empty) return(
        <div id={style.content}>
            <h1>No Elections found.</h1>
        </div>
    )

    if(loading) return (
        <div id={style.content}> 
            <div className={style.circleLoader}></div>
        </div>
    )
    console.log(elections)
    return(
        <div id={style.content}>
            {elections.map((val,ind)=>
                <div key={ind} className={style.card}>
                    <div className={style.cardTitle}>
                        {val.electionName}
                    </div>
                    <div className={style.cardDetails}>
                        {new Date(val.electionDate).toLocaleDateString()}
                    </div>
                    <div className={style.cardButton}>
                        <button onClick={()=>navigate(`${val.electionID}`)}>Vote Now!</button>
                    </div>
                </div>

            )}
        </div>
    )

    

}
