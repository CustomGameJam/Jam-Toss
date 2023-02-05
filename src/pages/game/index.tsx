import React, {useEffect, useState} from "react";
import {ScoreStorage} from "helpers/storage.helper";

const Game = () => {
    const {setScore} = ScoreStorage();
    useEffect(() => {
        async function initPhaser() {
            const Phaser = await import("phaser") as any;

            const Pachinko = new Phaser.Class({

                Extends: Phaser.Scene,

                initialize:

                    function Pachinko() {
                        Phaser.Scene.call(this, {key: 'pachinko'});

                        this.bricks;
                        this.paddle;
                        this.ball;
                        this.gameStarted = false;
                        this.scoreText = null;
                        this.score = 0;
                    },

                preload: function () {
                    this.load.image('cherry', 'assets/image/cherry.png');
                    this.load.image('jar', 'assets/image/jar.png');
                    this.load.image('hand', 'assets/image/hand.png');
                },

                create: function () {
                    //  Enable world bounds, but disable the floor
                    this.physics.world.setBoundsCollision(true, true, true, false);

                    //  Create the bricks in a 10x6 grid
                    this.bricks = this.physics.add.staticGroup({
                        key: 'cherry', frame: ['cherry'],
                        frameQuantity: 60,
                        gridAlign: {width: 10, height: 6, cellWidth: 128 + 60, cellHeight: 32 + 60, x: 240, y: 150}
                    });

                    this.ball = this.physics.add.sprite(400, 800, 'jar').setCollideWorldBounds(true).setBounce(1).setScale(1.5);
                    this.ball.setData('onPaddle', true);

                    this.paddle = this.physics.add.sprite(400, 880, 'hand').setImmovable();
                    this.scoreText = this.add.text(48, 48, 'score: 0', {fontSize: '32px', fill: '#000'});

                    //  Our colliders
                    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
                    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

                    //  Input events
                    this.input.on('pointermove', (pointer: any) => {

                        //  Keep the paddle within the game
                        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 1670);

                        if (this.ball.getData('onPaddle')) {
                            this.ball.x = this.paddle.x;
                        }

                    }, this);

                    this.input.on('pointerup', function (pointer: any) {
                        if (this.ball.getData('onPaddle') && !this.gameStarted) {
                            this.ball.setVelocity(-75, -300);
                            this.ball.setData('onPaddle', false);
                        }
                        this.gameStarted = true
                    }, this);
                },

                hitBrick: function (ball, brick) {
                    brick.disableBody(true, true);
                    this.score += 10;
                    this.scoreText.setText('score: ' + this.score);

                    if (this.score % 100 === 0) {
                        const multiplier = (this.score / 100 + 2) * 0.4;
                        ball.setVelocity(ball.body.velocity.x * multiplier, ball.body.velocity.y * multiplier);
                    }
                    if (this.bricks.countActive() === 0) {
                        this.resetLevel();
                    }
                },

                hitPaddle: function (ball, paddle)
                {
                    var diff = 0;

                    if (ball.x < paddle.x)
                    {
                        //  Ball is on the left-hand side of the paddle
                        diff = paddle.x - ball.x;
                        ball.setVelocityX(-10 * diff);
                    }
                    else if (ball.x > paddle.x)
                    {
                        //  Ball is on the right-hand side of the paddle
                        diff = ball.x -paddle.x;
                        ball.setVelocityX(10 * diff);
                    }
                    else
                    {
                        //  Ball is perfectly in the middle
                        //  Add a little random X to stop it bouncing straight up!
                        ball.setVelocityX(2 + Math.random() * 8);
                    }
                },

                update: function () {
                    if (this.ball.y > 900 && setScore) {
                        setScore(this.score);
                        const canvas = document.querySelector("canvas");
                        if (canvas) {
                            canvas.remove();
                        }
                        setTimeout(() => {
                            window.location.href = "/gameover";
                        }, 1000);
                    }
                }

            });

            var config = {
                type: Phaser.AUTO,
                id: "pachinko-game",
                width: 1720,
                height: 1080,
                backgroundColor: '#4488aa',
                parent: "game",
                title: "Pachinko",
                scene: [Pachinko],
                physics: {
                    default: 'arcade'
                },
                scale: {
                    mode: Phaser.Scale.FIT,
                    parent: 'phaser-example',
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                }
            };

            new Phaser.Game(config);
        }

        initPhaser().then(() => {
                const canvasElements = Array.from(document.querySelectorAll("canvas"));
                if (canvasElements.length > 1) {
                    const secondCanvas = canvasElements.slice(1)[0];
                    secondCanvas.parentNode?.removeChild(secondCanvas);
                }
            }
        )
    }, []);

    return <div id="game"></div>;
};

export default Game;