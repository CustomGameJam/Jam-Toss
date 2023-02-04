import React from "react";
import {Button, Card} from "@mui/material";




export default function Home() {
    return (
        <>
        <Card style={{
            backgroundImage: `url("/assets/image/background.jpg")`,
            height: '100vh',
            width: '100vw'
        }}>
            {/* <img style={{position:"absolute", right: 0, height:100}} src="/assets/image/logo2.png" alt="_blank"/> */}
            <div className="title" style={{
                color: "#ffffff",
                textAlign: "center",
                marginTop: '15%',
                fontSize: 100,
                textShadow: 'rgb(136 136 136) -6px 0px 4px'
            }}>
                PACHINKO
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "5%"}}>
                <Button type='submit' href='/game'
                        style={{
                            textAlign: "center",
                            width: 120,
                            height: 120,
                            display: "flex",
                            backgroundColor: 'black',
                            opacity: 0.7,
                            borderRadius: "100%",
                            color: "white"
                        }}>Play</Button>
            </div>
        </Card>
       
        </>
    );
}
