import {Stack} from "react-bootstrap";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();
    return (
        <Stack className="mainMenuContainer">
            <div className="mainMenuTitle">
                JAM TOSS
            </div>
            <div className="menuOptionsContainer">
                <div className='menuOptions' onClick={() => router.push('/game')}>
                    PLAY
                </div>
                <div className='menuOptions' onClick={() => router.push('/leaderboard')}>
                    LEADERBOARD
                </div>
            </div>
        </Stack>
    );
}
