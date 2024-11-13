import style from './css/VoteCount.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function VoteCount() {
    const { electionID } = useParams();
    const [voteCounts, setVoteCounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5001/results/${electionID}`)
            .then((temp) => {
                setVoteCounts(temp.data);
                setLoading(false);
            })
    }, []);


    if (loading) {
        return (
            <div id={style.content}>
                <div className={style.circleLoader}></div>
            </div>
        )
    }




    return (
        <div id={style.content}>
            <h2>Election Results for Election ID: {electionID}</h2>
            <table className={style.resultsTable}>
            <tbody>
                    <tr>
                        <th>Candidate ID</th>
                        <th>Candidate Name</th>
                        <th>Candidate Symbol</th>
                        <th>Votes Received</th>
                    </tr>
                    {voteCounts.map((can) => (
                        <tr key={can.candidateID} style={{backgroundColor:can.isWinner?'green':'white'}}>
                            <td>{can.candidateID}</td>
                            <td>{can.candidateName}</td>
                            <td><img src={can.candidateImg} className={style.candidateImage}/></td>
                            <td>{can.votes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}