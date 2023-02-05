import {Col, Row} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import {getHighscores} from "api/highscore";
import Button from "react-bootstrap/Button";

interface ILeaderboard {
    highscores: {
        name: string;
        score: number;
    }[]
}

function Leaderboard(props: ILeaderboard) {
    return (
        <div className='p-3 bgDark fullH'>

            <Row>
                <Col xs={12}>
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginBottom: '2rem'
                    }}>
                    <Button href='/' variant='outline-light' >Main Menu</Button>
                    <Button href='/game' variant='outline-warning' >Play Again</Button>
                    </div>
                    <Table striped bordered hover variant="dark" className='m-0 px-5'>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.highscores.map((highscore, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{highscore.name}</td>
                                <td>{highscore.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </div>
    );
}

export async function getServerSideProps() {
    const highscores = await getHighscores();
    const sortedHighscores = highscores?.sort((a, b) => b?.score - a?.score);

    return {
        props: {
            highscores: JSON.parse(JSON.stringify(sortedHighscores))
        }
    }
}

export default Leaderboard;