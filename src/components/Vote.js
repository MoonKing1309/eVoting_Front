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
        axios.get(`http://localhost:5001/elections/${loginID}/${electionID}`)
        .then((data)=>{
            console.log(data.data.msg)
            setCandidates(data.data.msg);
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
            {candidates.map((can,ind)=>
                <div key={ind} className={style.card} style={{backgroundImage:`${can.candidateImg}`,backgroundClip:'cover'}}>
                    <div className={style.cardTitle}>
                        {can.candidateName}
                        <img src={`${can.candidateImg}`} className={style.cardImg}></img>
                    </div>
                    <div className={style.cardButton}>
                        <button onClick={()=>{
                            let notAllowedToVote = document.getElementById('notAllowedToVote');
                            let alreadyVoted = document.getElementById('alreadyVoted');
                            let successfullyVoted = document.getElementById('successfullyVoted')
                            notAllowedToVote.style.display='none';
                            alreadyVoted.style.display='none';
                            successfullyVoted.style.display = 'none'
                            axios.post(`http://localhost:5001/elections/${loginID}/${electionID}`,{candidateID:can.candidateID}).then((res)=>{
                                if(res.status==200){
                                    successfullyVoted.style.display = 'block'
                                }
                            }).catch((res)=>{
                                if(res.status==500){
                                    notAllowedToVote.style.display='block'
                                }
                                if(res.status==501){
                                    alreadyVoted.style.display='block'
                                }
                            })
                        }}>Vote Now!</button>
                        <h5 id='notAllowedToVote' style={{ display: 'none', color: "red" }}>Not authorised to Vote!!</h5>
                        <h5 id='alreadyVoted' style={{ display: 'none', color: "red" }}>You have Already Voted in this Election!</h5>
                        <h5 id='successfullyVoted' style={{ display: 'none', color: "green" }}>Vote Cast Successfully!</h5>
                    </div>
                </div>

             )}
        </div>
    )



}