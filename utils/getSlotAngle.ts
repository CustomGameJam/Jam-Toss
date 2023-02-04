export const getSlotAngle = (isReverse: boolean, isLeftAligned: boolean) => {
    const angle = Math.floor(Math.random() * 30) + 30;
    return isReverse ? -angle : angle;
}