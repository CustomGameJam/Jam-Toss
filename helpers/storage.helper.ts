export const ScoreStorage = () => {
    if(typeof window === 'undefined') return {};
    const storage = window.localStorage;

    const getScore = () => {
        const score = storage.getItem("score");

        return score ? JSON.parse(score) : 0;
    };

    const setScore = (score: number) => {
        storage.setItem("score", JSON.stringify(score));
    };

    return {
        getScore,
        setScore,
    };
}