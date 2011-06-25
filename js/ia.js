define(['js/game.js', 'js/controls.js'], function(Game, Controls) {

    function generateEnemies(baaCollisionsMap) {
            var oaEnemies = [];

            var fDensity = 0.1;

            for (var v = 0, vmax = baaCollisionsMap.length; v < vmax; ++v) {
                for (var h = 0, hmax = baaCollisionsMap[0].length; h < hmax; ++h) {
                    if (!baaCollisionsMap[v][h] && Math.random() < fDensity)
                        oaEnemies.push({h: h, v : v});
                }
            }
            return oaEnemies;
        }

    /***************************************
     IA
     ***************************************/
    return {

        enemies: generateEnemies(Game.collisionsMap),
        generateEnemies : generateEnemies,

        displayEnemies: function(oCanvas, oaEnemies) {
            for (var i = 0, l = oaEnemies.length; i < l; ++i) {
                var oEnemyDiv = document.createElement('div');
                oEnemyDiv.className = 'block enemy';
                oEnemyDiv.style.bottom = oaEnemies[i].v * 50 + 'px';
                oEnemyDiv.style.left = oaEnemies[i].h * 50 + 'px';

                oaEnemies[i].div = oEnemyDiv;
                oCanvas.appendChild(oEnemyDiv);
            }
        },

        enemyMoveUp: function(enemy) {
            if (Controls.canMove(enemy, 0))
                enemy.v++;

        },

        enemyMoveRight: function(enemy) {
            if (Controls.canMove(enemy, 1))
                enemy.h++;

        },

        enemyMoveDown: function(enemy) {
            if (Controls.canMove(enemy, 2))
                enemy.v--;
        },

        enemyMoveLeft: function(enemy) {
            if (Controls.canMove(enemy, 3))
                enemy.h--;
        },


        refreshEnemiesPositions: function(oEnemies) {

        },

        refreshEnemyPosition: function(oEnemy) {
            oEnemy.div.style.left = oEnemy.h * 50 + 'px';
            oEnemy.div.style.bottom = oEnemy.v * 50 + 'px';
        },

        enemiesMoves: function(oEnemies) {
            for (var i = 0, l = oEnemies.length; i < l; ++i) {
                var dir = Math.floor(Math.random() * 4);
                if (dir == 0)
                    this.enemyMoveUp(oEnemies[i]);
                else if (dir == 1)
                    this.enemyMoveRight(oEnemies[i]);
                else if (dir == 2)
                    this.enemyMoveDown(oEnemies[i]);
                else if (dir == 3)
                    this.enemyMoveLeft(oEnemies[i]);
                this.refreshEnemyPosition(oEnemies[i])

                /*        if (enemies[i].dir == 0) enemies[i].y--;
                 if (enemies[i].dir == 1) enemies[i].x++;
                 if (enemies[i].dir == 2) enemies[i].y++;
                 if (enemies[i].dir == 3) enemies[i].x--;


                 if (enemies[i].dir == 0 && collisionsMap[enemies[i].x / 50][enemies[i].y / 50 - 1] == true)
                 enemies[i].dir = Math.floor(Math.random() * 4);
                 if (enemies[i].dir == 2 && collisionsMap[enemies[i].x / 50][enemies[i].y / 50 + 1] == true)
                 enemies[i].dir = Math.floor(Math.random() * 4);

                 if (enemies[i].dir == 1 && collisionsMap[enemies[i].x / 50 + 1][enemies[i].y / 50] == true)
                 enemies[i].dir = Math.floor(Math.random() * 4);
                 if (enemies[i].dir == 3 && collisionsMap[enemies[i].x / 50 - 1][enemies[i].y / 50] == true)
                 enemies[i].dir = Math.floor(Math.random() * 4);

                 */


            }
        }
    }
});