export const getRandomColor = (isDark = false) => {
    let letters = isDark ? '01234567' : '89ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
}
