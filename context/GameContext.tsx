import {createContext, FC, useContext, useState} from "react";

type GameContextType = {
    score: number;
    setScore: (score: number) => void;
}

const GameContext = createContext({} as GameContextType);

export const GameProvider = ({children}) => {
    const [score, setScore] = useState(0);
    return (
        <GameContext.Provider value={{
            score,
            setScore
        }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => useContext(GameContext);