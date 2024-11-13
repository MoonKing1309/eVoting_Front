import { useEffect,useState } from 'react'
import style from './css/Results.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Results(){

    const [ loading,setLoading ] = useState(true)
    const [results,setResults] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
       axios.get('https://evoting-back.onrender.com/results')
       .then((temp)=>{
           setResults(temp.data);
           setLoading(false);
       })
    },[]);

    const filteredElections = results.filter((election) =>
        election.electionID.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading){
        return(
            <div id={style.content}>
            <div className={style.circleLoader}></div>
        </div>
        )
    }

    return (
        <div id={style.content}>
            <input type="text" placeholder="Search by Election ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={style.searchBar}/>
            {filteredElections.length === 0 ? (
                <p>No completed elections to display.</p>
            ) : (
                filteredElections.map((ele,ind) => (
                    <div key={ind} className={style.card}>
                        <h3>{ele.electionName}</h3>
                        <p>ID: {ele.electionID}</p>
                        <p>{ele.electionDetails}</p>
                        <p>Date: {new Date(ele.electionDate).toLocaleDateString()}</p>
                        <button className={style.resultButton} onClick={() => navigate(`/results/${ele.electionID}`)}>
                            See Result
                        </button>
                    </div>
                ))
            )}
        </div>
    );




}
