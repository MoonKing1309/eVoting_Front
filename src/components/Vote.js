import style from './css/Vote.module.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


export default function Vote(){
    const { electionID } = useParams();
    const dispatch = useDispatch();
    const loginID = useSelector((state) => state.auth.loginID);

    const [loading,setLoading] = useState(true)
    const [candidates,setCandidates] = useState(false)

    useEffect(()=>{
        axios.get(`http://localhost:5001/${loginID}/${electionID}`)
        .then((data)=>{
            setCandidates(data.data);
            setLoading(false)
        })
    },[])

    if (loading){
        return(
            <div id={style.content}>
            <div className={style.circleLoader}></div>
        </div>
        )
    }

    return(
        <div id={style.content}>
            {candidates.map((can,ind)=>{
                <div key={ind} className={style.card} style={{backgroundImage:`${can.candidateImg}`,backgroundClip:'cover'}}>
                    <div className={style.cardTitle}>
                        {can.candidateName}
                    </div>
                    <div className={style.cardButton}>
                        <button onClick={()=>{
                            axios.post(`http://localhost:5001/election/${loginID}/${electionID}`,{candidateID:can.candidateID})
                        }}>Vote Now!</button>
                    </div>
                </div>

            })}
        </div>
    )



}