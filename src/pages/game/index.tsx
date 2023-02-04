import React, {useEffect, useState} from "react";

const Game = () => {
    const [score, setScore] = useState(0);
    useEffect(() => {
        async function initPhaser() {
            const Phaser = await import("phaser");

            var Breakout = new Phaser.Class({

                Extends: Phaser.Scene,

                initialize:

                    function Breakout ()
                    {
                        Phaser.Scene.call(this, { key: 'breakout' });

                        this.bricks;
                        this.paddle;
                        this.ball;
                    },

                preload: function ()
                {
                    this.load.atlas('assets', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
                },

                create: function ()
                {
                    //  Enable world bounds, but disable the floor
                    this.physics.world.setBoundsCollision(true, true, false, false);

                    //  Create the bricks in a 10x6 grid
                    this.bricks = this.physics.add.staticGroup({
                        key: 'assets', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
                        frameQuantity: 30,
                        gridAlign: { width: 10, height: 6, cellWidth: 128 + 30, cellHeight: 32 + 30, x: 240, y: 150 }
                    });

                    this.ball = this.physics.add.image(400, 500, 'assets', 'cherry').setCollideWorldBounds(true).setBounce(1);
                    this.ball.setData('onPaddle', true);

                    this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();

                    //  Our colliders
                    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
                    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

                    //  Input events
                    this.input.on('pointermove', function (pointer) {

                        //  Keep the paddle within the game
                        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

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
                    brick.disableBody(false, false);

                    if (this.bricks.countActive() === 0)
                    {
                        this.resetLevel();
                    }
                },

                resetBall: function ()
                {
                    this.ball.setVelocity(0);
                    this.ball.setPosition(this.paddle.x, 500);
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
                    if (this.ball.y > 600)
                    {
                        this.resetBall();
                    }
                }

            });

            var config = {
                type: Phaser.WEBGL,
                width: 1920,
                height: 1080,
                parent: "game-container",
                title: "Pachinko",
                scene: [ Breakout ],
                physics: {
                    default: 'arcade'
                }
            };

            var game = new Phaser.Game(config);
        }

        initPhaser();
    }, []);

    return <div id="game-container" />;
};

export default Game;