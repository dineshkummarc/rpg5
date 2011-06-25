require(['js/game.js', 'js/map.js'  , 'js/player.js', 'js/controls.js', 'js/ia.js'],
        function(Game, Map, Player, Controls, IA) {

            require.ready(function() {


                Map.displayLayout(Game.canvas, Game.loadedMap);
                Player.displayPlayer(Game.canvas, Game.player);
                IA.displayEnemies(Game.canvas, IA.enemies);

                setInterval(enemiesLoop, 1000);

                function enemiesLoop() {
                    IA.enemiesMoves(IA.enemies);
                }

            });

        });
