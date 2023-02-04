import {api} from "api/index";

export const addHighscore = async (name: string, score: number) => {
    const { data } = await api.post("/highscore", {
        name,
        score,
    });
    return data;
}

export const getHighscores = async () => {
    const { data } = await api.get("/highscore");
    return data;
}