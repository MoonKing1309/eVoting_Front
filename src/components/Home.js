import styles from './css/Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


function Home(){

    const loginID = useSelector((state) => state.auth.loginID);
    const navigate= useNavigate()

    return(
       
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Make Your Voice Heard</h1>
                <p>Voting is a powerful way to make a difference. Exercise your right today!</p>
            </div>

            <div className={styles.flexGrid}>
                <div className={styles.flexItem}>
                    <h2>Your Vote Matters</h2>
                    <p>Every single vote counts. Don’t miss the opportunity to shape your community’s future.</p>
                </div>
                <div className={styles.flexItem}>
                    <h2>Be a Part of Change</h2>
                    <p>Participating in elections is a step toward creating positive change for everyone.</p>
                </div>
                <div className={styles.flexItem}>
                    <h2>Empower Your Voice</h2>
                    <p>Voting is the best way to ensure that your voice is heard on important issues.</p>
                </div>
                <div className={styles.flexItem}>
                    <h2>Shape Policies</h2>
                    <p>Through voting, you have a say in the policies that impact your daily life and future.</p>
                </div>
                <div className={styles.flexItem}>
                    <h2>Set an Example</h2>
                    <p>When you vote, you inspire others in your community to make a difference too.</p>
                </div>
                <div className={styles.flexItem}>
                    <h2>Strengthen Democracy</h2>
                    <p>Voting is the cornerstone of democracy. It ensures freedom, equality, and justice for all.</p>
                </div>
            </div>

            <div className={styles.callToAction}>
                <button className={styles.voteButton} onClick={()=>{
                    if(loginID==null){
                        navigate('/login')
                    }
                    else{
                        navigate('/elections')
                    }
                }}
                style = {{display:loginID=='root'?'none':'block'}}>Get Started & Vote Today</button>
            </div>
        </div>
    )
}

export default Home;