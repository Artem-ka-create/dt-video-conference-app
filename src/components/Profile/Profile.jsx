import styles from "./Profile.module.css"
import InfoItem from "./InfoItem";
import useAuth from "../../hooks/useAuth";

function Profile() {

    const {auth} = useAuth();


    return (
        <div style={{display: 'flex', alignItems: 'center', justifyItems: 'center', flexDirection: 'column'}}>
            <div>
                <h1>Personal info</h1>
                <h3>Info about you and your preferences across DTMeet services</h3>
            </div>

            <div className={styles.InfoContainer}>

                <div className={styles.blockContainer}>
                    <div className={styles.titleText}>
                        <h2>Basic Info</h2>
                        <h3>Some info may be visible to other people using DT Meet.</h3>
                    </div>

                    <InfoItem title={'Name'} blockValue={auth.name}/>
                    <InfoItem title={'Surname'} blockValue={auth.surname}/>
                    <InfoItem title={'Username'} blockValue={auth.username}/>
                    <InfoItem title={'Birthday'} blockValue={'1.01.2002'} lastItem={true}/>

                </div>

                <div className={styles.blockContainer}>
                    <div className={styles.titleText}>
                        <h2>Contact Info</h2>
                    </div>

                    {/*<InfoItem title={'Email'} blockValue={auth.email}/>*/}
                    <InfoItem title={'Phone'} blockValue={'+421 95 135 5592'} lastItem={true}/>

                </div>


            </div>

        </div>


    )
}


export default Profile;