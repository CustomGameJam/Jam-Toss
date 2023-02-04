import React, {useEffect, useState} from "react";
const {useRouter} = require("next/router");


const Game = () => {
    const router = useRouter();
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    useEffect(() => {
        async function initPhaser() {
            const Phaser = await import("phaser");

            const Pachinko = new Phaser.Class({

                Extends: Phaser.Scene,

                initialize:

                    function Pachinko ()
                    {
                        Phaser.Scene.call(this, { key: 'pachinko' });

                        this.bricks;
                        this.paddle;
                        this.ball;
                        this.scoreText = 'asdqweqweqwe';
                        this.score = 0;
                    },

                preload: function ()
                {
                    this.load.image('cherry', 'assets/image/cherry.png');
                    this.load.image('jar', 'assets/image/jar.png');

                    this.scoreText = this.add.text(72, 72, 'score: 0', { fontSize: '32px', fill: '#000' });
                },

                create: function ()
                {
                    //  Enable world bounds, but disable the floor
                    this.physics.world.setBoundsCollision(true, true, true, false);

                    //  Create the bricks in a 10x6 grid
                    this.bricks = this.physics.add.staticGroup({
                        key: 'assets', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
                        frameQuantity: 30,
                        gridAlign: { width: 10, height: 6, cellWidth: 128 + 30, cellHeight: 32 + 30, x: 240, y: 150 }
                    });

                    this.ball = this.physics.add.sprite(400,800, 'cherry').setCollideWorldBounds(true).setScale(0.2).setBounce(1);
                    this.ball.setData('onPaddle', true);

                    this.paddle = this.physics.add.image(400, 850, 'assets', 'paddle1').setImmovable();
                    this.scoreText = this.add.text(72, 72, 'score: 0', { fontSize: '32px', fill: '#000' });

                    //  Our colliders
                    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
                    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

                    //  Input events
                    this.input.on('pointermove', function (pointer) {

                        //  Keep the paddle within the game
                        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 1670);

                        if (this.ball.getData('onPaddle'))
                        {
                            this.ball.x = this.paddle.x;
                        }

                    }, this);

                    this.input.on('pointerup', function (pointer) {

                        if (this.ball.getData('onPaddle'))
                        {
                            this.ball.setVelocity(-75, -300);
                            this.ball.setData('onPaddle', false);
                        }

                    }, this);
                },

                hitBrick: function (ball, brick)
                {
                    brick.disableBody(true, true);
                    this.score += 10;
                    this.scoreText.setText('Score: ' + this.score);

                    if(this.score === 100) {
                        ball.setVelocity(500, 500);
                    }
                    if (this.bricks.countActive() === 0)
                    {
                        this.resetLevel();
                    }
                },

                resetBall: function ()
                {
                    this.ball.setVelocity(0);
                    this.ball.setPosition(this.paddle.x, 800);
                    this.ball.setData('onPaddle', true);
                },

                resetLevel: function ()
                {
                    this.resetBall();

                    this.bricks.children.each(function (brick) {

                        brick.enableBody(false, 0, 0, true, true);

                    });
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

                update: function ()
                {
                    if (this.ball.y > 900)
                    {
                        router.push('/game-over');
                    }
                }

            });

            var config = {
                type: Phaser.AUTO,
                width: 1720,
                height: 1080,
                parent: "game-container",
                title: "Pachinko",
                scene: [ Pachinko ],
                physics: {
                    default: 'arcade'
                },
                scale: {
                    mode: Phaser.Scale.FIT,
                    parent: 'phaser-example',
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                }
            };

            var game = new Phaser.Game(config);
        }

        initPhaser();
    }, []);

    return <div id="game-container" />;
};

export default Game;