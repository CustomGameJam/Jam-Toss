import {getSlotAngle} from "utils/getSlotAngle";
import {getRandomColor} from "utils/getRandomColor";

export const getSlotProperties = (isReverse = false, index: number) => {
    const isLeftAligned = index < 2;
    const angle = getSlotAngle(isReverse, isLeftAligned);
    const height = Math.ceil(72 / Math.cos(angle * Math.PI / 180));
    const isDark = Math.random() > 0.5;
    const background = getRandomColor(isDark);

    const properties = {
        angle,
        isDark
    }

    const style = {
        transform: `rotate(${angle}deg)`,
        height: `${height}px`,
        background,
    }

    return {
        properties,
        style
    }
}