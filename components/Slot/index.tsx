import styles from "@/styles/components/Slot.module.css";
import {ISlot} from "components/Slot/index.types";
import {getSlotProperties} from "utils/getSlotProperties";

const Slot = ({index}: ISlot) => {
    const isReverse = Math.random() > 0.5;
    const {style, properties} = getSlotProperties(isReverse, index);
    const {angle, isDark} = properties || {};
    return (
        <div className={styles["slot-container"]}>
            <div id="slot" className={styles.slot}
                 style={style}/>
            <div id="slot" className={styles.slot}
                 style={style}/>
            <div id="slot" className={styles.slot}
                 style={style}/>
            <div id="slot" className={styles.slot}
                 style={style}/>
            <div id="slot" className={styles.slot}
                 style={style}/>
            <div id="slot" className={styles.slot}
                 style={style}/>
        </div>
    )
}

export default Slot;