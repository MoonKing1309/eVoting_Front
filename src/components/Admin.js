import style from './css/Admin.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Admin() {

    const [loadingV, setLoadingV] = useState(true)
    const [loadingC, setLoadingC] = useState(true)
    const [loadingE, setLoadingE] = useState(true)

    const [voter, setVoter] = useState([])
    const [candidate, setCandidate] = useState([])
    const [election, setElection] = useState([])

    useEffect(() => {
        axios.get('https://evoting-back.onrender.com/admin/candidates').then((data) => { setCandidate(data.data); setLoadingC(false) }).catch((error) => console.log(error))
        axios.get('https://evoting-back.onrender.com/admin/voters').then((data) => { setVoter(data.data); setLoadingV(false) }).catch((error) => console.log(error))
        axios.get('https://evoting-back.onrender.com/admin/elections').then((data) => { setElection(data.data); setLoadingE(false) }).catch((error) => console.log(error))

    }, [])

    async function handleVoterSubmit(event) {
        let voterError = document.getElementById('voterError')
        let voterAdded = document.getElementById('voterAdded')

        voterAdded.style.display = 'none'
        voterError.style.display = 'none'
        event.preventDefault();

        let voterID = document.getElementsByName('voterID')[0].value;
        let phnNo = document.getElementsByName('phno')[0].value;
        let electionClearance = document.getElementsByName('eleCle')[0].value;
        let voterPwd = 'password';

        await axios.post(`https://evoting-back.onrender.com/registerVoter`, { voterID, phnNo, voterPwd, electionClearance }).then(() => {
            voterAdded.style.display = 'block'
            voterError.style.display = 'none'
        }).catch(() => {
            voterError.style.display = 'block'
            voterAdded.style.display = 'none'
        })
    }

    async function handleCandidateSubmit(event) {
        let candidateError = document.getElementById('candidateError')
        let candidateAdded = document.getElementById('candidateAdded')

        candidateAdded.style.display = 'none'
        candidateError.style.display = 'none'
        event.preventDefault();

        let candidateName = document.getElementsByName('candidateName')[0].value;
        let candidateID = document.getElementsByName('candidateID')[0].value;
        let candidateImg = document.getElementsByName('candidateImg')[0].value;
        let electionID = document.getElementsByName('electionID')[0].value;

        await axios.post(`https://evoting-back.onrender.com/registerCandidate`, { candidateName, candidateID, electionID ,candidateImg}).then(() => {
            candidateAdded.style.display = 'block'
            candidateError.style.display = 'none'
        }).catch(() => {
            candidateError.style.display = 'block'
            candidateAdded.style.display = 'none'
        })
    }
    async function handleElectionSubmit(event) {
        let electionError = document.getElementById('electionError')
        let electionAdded = document.getElementById('electionAdded')

        electionAdded.style.display = 'none'
        electionError.style.display = 'none'
        event.preventDefault();

        let electionName = document.getElementsByName('electionName')[0].value;
        let electionID = document.getElementsByName('electionID')[1].value;
        let electionClearance = document.getElementsByName('electionClearance')[0].value;
        let electionDate = document.getElementsByName('electionDate')[0].value;

        console.log(electionName,electionID,electionDate,electionClearance)
        await axios.post(`https://evoting-back.onrender.com/registerElection`, { electionName, electionID, electionDate ,electionClearance}).then(() => {
            electionAdded.style.display = 'block'
            electionError.style.display = 'none'
        }).catch(() => {
            electionError.style.display = 'block'
            electionAdded.style.display = 'none'
        })
    }


    const handleVoterUpload = async(event)=>{
        event.preventDefault()
        let voterError = document.getElementById('voterError')
        let voterAdded = document.getElementById('voterAdded')

        voterAdded.style.display = 'none'
        voterError.style.display = 'none'
        const excelFile = document.getElementById('voterUpload');
        if (!excelFile.files[0]) {
            alert('NO FILE SELECTED!');
            return;
        }

        const formData = new FormData();
        formData.append('file', excelFile.files[0]);
        try {
            await axios.post('https://evoting-back.onrender.com/registerVoters', formData,{headers: {'Content-Type': 'multipart/form-data',}}).then(() => {
                voterAdded.style.display = 'block'
                voterError.style.display = 'none'
            }).catch(() => {
                voterError.style.display = 'block'
                voterAdded.style.display = 'none'
            })
        } catch (error) {
            console.error(error);
        }
    }
    return (

        <div id={style.container}>
            <div id={style.gridBox}>
                <div id={style.viewVoter}>
                    <table className={style.viewTable}>
                        <tbody>
                            <tr>
                                <th>SNo</th>
                                <th>Voter ID</th>
                                <th>Phone Number</th>
                                <th>Election Clearance</th>
                            </tr>
                            {loadingV ? <div className={style.circleLoader}></div> : (voter.length===0)?(<tr> <td colSpan={4} style={{margin:'auto'}}>No data</td></tr>): voter.map((voter, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{voter.voterID}</td>
                                    <td>{voter.phoneNumber}</td>
                                    <td>{voter.electionClearance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div id={style.viewCandidate}>
                    <table className={style.viewTable}>
                        <tbody>
                            <tr>
                                <th>SNo</th>
                                <th>Candidate Name</th>
                                <th>Candidate ID</th>
                                <th>Election ID</th>
                            </tr>
                            {loadingC ? <div className={style.circleLoader}></div> : (candidate.length===0)?(<tr> <td colSpan={4} style={{margin:'auto'}}>No data</td></tr>):candidate.map((can, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{can.candidateName}</td>
                                    <td>{can.candidateID}</td>
                                    <td>{can.electionID}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div id={style.viewElections}>
                    <table className={style.viewTable}>
                        <tbody>
                            <tr>
                                <th>SNo</th>
                                <th>Election ID</th>
                                <th>Election Clearance</th>
                            </tr>
                            {loadingE ? <div className={style.circleLoader}></div> : (election.length===0)?(<tr> <td colSpan={4} style={{margin:'auto'}}>No data</td></tr>):election.map((ele, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{ele.electionID}</td>
                                    <td>{ele.electionClearance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div id={style.addVoter}>
                    <form>
                        <table >
                            <tbody>
                                <tr>
                                    <td><label>Voter Identification Number</label></td>
                                    <td><input name='voterID' type='text'></input></td>
                                </tr>
                                <tr>
                                    <td><label>Phone Number</label></td>
                                    <td><input name='phno' type='text'></input></td>
                                </tr>
                                <tr>
                                    <td><label>Election Clearance</label></td>
                                    <td><input name='eleCle' type='text'></input></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><button onClick={handleVoterSubmit}>Add Voter</button></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><input type="file" accept=".xlsx" id="voterUpload"/></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><button onClick={handleVoterUpload}>Upload Voters</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <h5 id='voterAdded' style={{ display: 'none', color: "green" }}>Voter Added Successfully</h5>
                        <h5 id='voterError' style={{ display: 'none', color: "red" }}>Error Adding Voter!</h5>
                    </form>
                </div>


                <div id={style.addCandidate}>
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>Candidate Identification Number</label></td>
                                    <td><input name='candidateID' type='text'></input></td>
                                </tr>
                                <tr>
                                    <td><label>Candidate Name</label></td>
                                    <td><input name='candidateName' type='text'></input></td>
                                </tr>
                                <tr>
                                    <td><label>Candidate Image</label></td>
                                    <td><input name='candidateImg' type='text' placeholder='Enter link of image'></input></td>
                                </tr>
                                <tr>
                                    <td><label>Election Identification Number</label></td>
                                    <td><input name='electionID' type='text'></input></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><button onClick={handleCandidateSubmit}>Add Candidate</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <h5 id='candidateAdded' style={{ display: 'none', color: "green" }}>Candidate Added Successfully</h5>
                        <h5 id='candidateError' style={{ display: 'none', color: "red" }}>Error Adding Candidate!</h5>
                    </form>
                </div>
                <div id={style.addElection}>
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>Election Identification Number</label></td>
                                    <td><input name='electionID' type='text'></input></td>
                                </tr>
                                <tr>
                                    <td><label>Election Name</label></td>
                                    <td><input name='electionName' type='text'></input></td>
                                </tr>
                                <tr>
                                    <td><label>Election Date</label></td>
                                    <td><input name='electionDate' type='date'></input></td>
                                </tr>
                                <tr>
                                    <td><label>Election Clearance</label></td>
                                    <td><input name='electionClearance' type='numeric'></input></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><button onClick={handleElectionSubmit}>Add Election</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <h5 id='electionAdded' style={{ display: 'none', color: "green" }}>Election Added Successfully</h5>
                        <h5 id='electionError' style={{ display: 'none', color: "red" }}>Error Adding Election!</h5>
                    </form>
                </div>
            </div>



        </div>
    )
}
