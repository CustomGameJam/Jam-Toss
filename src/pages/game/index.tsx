import styles from "@/styles/Game.module.css";
import Slot from "components/Slot";

const Game = () => {
    return(
        <div className={styles["game-container"]}>
            <Slot />
        </div>
    )
}

export default Game;