import styles from "./InfoItem.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function InfoItem ({title, blockValue , lastItem}) {

    const navigate = useNavigate();


    const handleEdit = () => {
        console.log('Handle');
        navigate(`/profile/edit?item=${title.toLowerCase()}`,{state: {item: blockValue}})
    }
    return (
        <div className={styles.itemInfo}>

            <div className={styles.valuesContentContainer}>
                <div>{title}</div>
                <div className={styles.valueContainer}>
                    <div> {blockValue} </div>
                    <button className={styles.editButton} onClick={handleEdit}>
                        <FontAwesomeIcon  icon={faPenToSquare}/>
                    </button>
                </div>
            </div>

            { !lastItem && <div className={styles.borderLine}></div> }

        </div>
    )
}

export default InfoItem;