(function(window, undefined) {

    /***************************************
     MAP LOADING
     ***************************************/

    function getCollisionsMap(iaaLoadedMap) {
        var collisionsMap = [];
        for (var i = 0, l = iaaLoadedMap.length; i < l; ++i) {
            var currentCollisionsLine = [];
            for (var j = 0, m = iaaLoadedMap[0].length; j < m; ++j) {
                var currentCollisionBlock = false;
                if (iaaLoadedMap[i][j] == 2)
                    currentCollisionBlock = true;
                currentCollisionsLine.push(currentCollisionBlock);
            }
            collisionsMap.push(currentCollisionsLine);
        }
        return collisionsMap;
    }

    function displayLayout(oCanvas, iaaLoadedMap) {


        for (var v = 0, vmax = iaaLoadedMap.length; v < vmax; ++v) {
            var blocksLine = document.createElement('div');
            blocksLine.className = 'blocks-line';
            for (var h = 0, hmax = iaaLoadedMap[0].length; h < hmax; ++h) {
                var currentBlock = document.createElement('div');
                currentBlock.className = 'block' + ' v' + v + ' h' + h + ' t' + iaaLoadedMap[v][h];
                blocksLine.appendChild(currentBlock);
            }
            oCanvas.appendChild(blocksLine);
        }
    }


    /***************************************
     PLAYER
     ***************************************/

    function createPlayer(v, h) {
        return {v : v, h: h};
    }


    function displayPlayer(oCanvas, oPlayer) {
        var oPlayerDiv = document.createElement('div');
        oPlayerDiv.id = 'player';
        oPlayerDiv.className = 'block';
        oPlayerDiv.style.left = oPlayer.h * 50 + 'px';
        oPlayerDiv.style.bottom = oPlayer.v * 50 + 'px';
        oPlayer.div = oPlayerDiv;
        oCanvas.appendChild(oPlayerDiv);
    }

    /***************************************
     CONTROLS
     ***************************************/

    window.addEventListener("keydown", function(e) {
        if (e.keyCode == 40) movePlayer(2);
        if (e.keyCode == 38) movePlayer(0);
        if (e.keyCode == 37) movePlayer(3);
        if (e.keyCode == 39) movePlayer(1);
    }, false);

    function movePlayer(iDirection) {
        if (canMove(oPlayer, iDirection)) {
            if (iDirection == 0)
                oPlayer.v++;
            if (iDirection == 1)
                oPlayer.h++;
            if (iDirection == 2)
                oPlayer.v--;
            if (iDirection == 3)
                oPlayer.h--;
            refreshPlayerPosition();
        }

    }

    function refreshPlayerPosition() {
        oPlayer.div.style.left = oPlayer.h * 50 + 'px';
        oPlayer.div.style.bottom = oPlayer.v * 50 + 'px';
    }

    function canMove(mob, dir) {
        if (dir == 0 && !baaCollisionsMap[mob.v + 1][mob.h])
            return true;
        if (dir == 1 && !baaCollisionsMap[mob.v][mob.h + 1])
            return true;
        if (dir == 2 && !baaCollisionsMap[mob.v - 1][mob.h])
            return true;
        if (dir == 3 && !baaCollisionsMap[mob.v][mob.h - 1])
            return true;
        return false;
    }

    /***************************************
     IA
     ***************************************/

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

    function displayEnemies(oCanvas, oaEnemies) {
        for (var i = 0, l = oaEnemies.length; i < l; ++i) {
            var oEnemyDiv = document.createElement('div');
            oEnemyDiv.className = 'block enemy';
            oEnemyDiv.style.bottom = oaEnemies[i].v * 50 + 'px';
            oEnemyDiv.style.left = oaEnemies[i].h * 50 + 'px';

            oaEnemies[i].div = oEnemyDiv;
            oCanvas.appendChild(oEnemyDiv);
        }
    }

    function enemyMoveUp(enemy) {
        if (canMove(enemy, 0))
            enemy.v++;

    }

    function enemyMoveRight(enemy) {
        if (canMove(enemy, 1))
            enemy.h++;

    }

    function enemyMoveDown(enemy) {
        if (canMove(enemy, 2))
            enemy.v--;
    }

    function enemyMoveLeft(enemy) {
        if (canMove(enemy, 3))
            enemy.h--;
    }


    function refreshEnemyPosition(oEnemy) {
        oEnemy.div.style.left = oEnemy.h * 50 + 'px';
        oEnemy.div.style.bottom = oEnemy.v * 50 + 'px';
    }

    function enemiesMoves(oEnemies) {
        for (var i = 0, l = oEnemies.length; i < l; ++i) {
            var dir = Math.floor(Math.random() * 4);
            if (dir == 0)
                enemyMoveUp(oEnemies[i]);
            else if (dir == 1)
                enemyMoveRight(oEnemies[i]);
            else if (dir == 2)
                enemyMoveDown(oEnemies[i]);
            else if (dir == 3)
                enemyMoveLeft(oEnemies[i]);
            refreshEnemyPosition(oEnemies[i])

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

    /***************************************
     GAME INIT
     ***************************************/


    var oCanvas = document.getElementById('canvas');


    var iaaLoadedMap = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ];
    iaaLoadedMap.reverse();
    displayLayout(oCanvas, iaaLoadedMap);

    var oPlayer = createPlayer(2, 6);
    displayPlayer(oCanvas, oPlayer);
    var baaCollisionsMap = getCollisionsMap(iaaLoadedMap);
    var oaEnemies = generateEnemies(baaCollisionsMap);
    displayEnemies(oCanvas, oaEnemies);


    /***************************************
     MAIN LOOP
     ***************************************/

    setInterval(mainLoop, 16);
    setInterval(enemiesLoop, 1000);

    function enemiesLoop() {
        enemiesMoves(oaEnemies);
    }

    function mainLoop() {

    }

}

        )
        (window);