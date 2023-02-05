import {Col, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {css, Global} from "@emotion/react";
import {useEffect, useState} from "react";
import {addHighscore} from "api/highscore";
import {useRouter} from "next/router";
import {ScoreStorage} from "helpers/storage.helper";

const GameOver = () => {
    const router = useRouter();
    const {getScore, setScore} = ScoreStorage();
    const [username, setUsername] = useState('');
    const [currentScore, setCurrentScore] = useState(0);
    const onSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await addHighscore(username, currentScore);
        if (setScore) {
            setScore(0);
        }
        router.push('leaderboard');
    }

    useEffect(() => {
        const _score = getScore ? getScore() : 0;
        setCurrentScore(_score);
    }, []);

    return (
        <div className="gameOverContainer p-3 fullH">
            <Global
                styles={css`
                  canvas {
                    display: none;
                  }
                `}
            />
            <Row style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Col className='gameovergif' xs={12}>
                </Col>
                <Col xs={12}>
                    <div className='writeEditing mb-5'>
                        <h4>Score</h4>
                        <h1>{currentScore}</h1>
                    </div>

                </Col>
                <Col xs={6}>
                    {currentScore > 0 &&
                        <Form style={{display: "flex", alignItems: "baseline", justifyContent: "center"}}
                              onSubmit={onSave}>
                            <Form.Group className="mb-3 white" controlId="formBasicEmail">
                                {/* <Form.Label style={{color:"white"}}>Username :</Form.Label> */}
                                <Form.Control style={{border: "1px solid #141619", borderRadius: "unset"}}
                                              onChange={(e) => {
                                                  setUsername(e.target.value)
                                              }}
                                              placeholder='Enter username'/>
                            </Form.Group>
                            <Button type="submit" style={{
                                border: "1px solid #141619",
                                borderRadius: "unset",
                                backgroundColor: "grey"
                            }}
                            >
                                Save
                            </Button>
                        </Form>}
                    <div style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center"
                    }}>
                        <Button href="/game" style={{
                            border: "1px solid #141619",
                            borderRadius: "unset",
                            backgroundColor: "darkgoldenrod",
                            width: "436px"
                        }}>
                            Try Again
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default GameOver;