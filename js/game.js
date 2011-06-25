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
     CONTROLS
     ***************************************/
/*
    window.addEventListener("keydown", function(e) {
        if (e.keyCode == 40) movePlayer(2);
        if (e.keyCode == 38) movePlayer(0);
        if (e.keyCode == 37) movePlayer(3);
        if (e.keyCode == 39) movePlayer(1);
    }, false);

    function movePlayer(direction) {
        if (canMove(player, direction)) {
            if (direction == 0)
                player.v--;
            if (direction == 1)
                player.h++;
            if (direction == 2)
                player.v++;
            if (direction == 3)
                player.h--;

            player.hp = player.h * 50;
            player.vp = player.v * 50;
        }
    }

    function canMove(mob, dir) {

        if (dir == 0 && !collisionsMap[mob.i][mob.j - 1])
            return true;
        if (dir == 1 && !collisionsMap[mob.i + 1][mob.j])
            return true;
        if (dir == 2 && !collisionsMap[mob.i][mob.j + 1])
            return true;
        if (dir == 3 && !collisionsMap[mob.i - 1][mob.j])
            return true;
        return false;
    }
*/
    function playerMoves() {
        /*    if (oMove.down)     player.y = player.y + 2;
         if (oMove.up)       player.y = player.y - 2;
         if (oMove.left)     player.x = player.x - 2;
         if (oMove.right)    player.x = player.x + 2;
         */
        // if (oMove.down || oMove.up)
        playerdiv.style.top = player.y + 'px';
        //if (oMove.left || oMove.right)
        playerdiv.style.left = player.x + 'px';
    }

    /***************************************
     IA
     ***************************************/

    function generateEnemies(baaCollisionsMap) {
        var oaEnemies = [];

        var fDensity = 0.1;

        for(var v = 0, vmax = baaCollisionsMap.length; v < vmax; ++v){
            for (var h = 0, hmax = baaCollisionsMap[0].length; h < hmax; ++h) {
                if (!baaCollisionsMap[v][h] && Math.random() < fDensity)
                    oaEnemies.push({h: h, v : v});
            }
        }

        return oaEnemies;
    }

    function displayEnemies(oCanvas, oaEnemies){
        for (var i = 0, l = oaEnemies.length; i < l; ++i){
            var oEnemyDiv = document.createElement('div');
            oEnemyDiv.className = 'block enemy';
            oEnemyDiv.style.bottom = oaEnemies[i].v * 50 + 'px';
            oEnemyDiv.style.left = oaEnemies[i].h * 50 + 'px';

            oaEnemies[i].div = oEnemyDiv;
            oCanvas.appendChild(oEnemyDiv);
        }
    }

    function enemyMoveUp(enemy) {
        if (canMove(enemy, 0)) {
            enemy.v--;
            enemy.vp = enemy.v * 50;
        }
    }

    function enemyMoveRight(enemy) {
        if (canMove(enemy, 0)) {
            enemy.h++;
            enemy.hp = enemy.h * 50;
        }
    }

    function enemyMoveDown(enemy) {
        if (canMove(enemy, 0)) {
            enemy.v++;
            enemy.vp = enemy.v * 50;
        }
    }

    function enemyMoveLeft(enemy) {
        if (canMove(enemy, 0)) {
            enemy.h--;
            enemy.hp = enemy.h * 50;
        }
    }


    function enemiesMoves() {
        for (var i = 0, l = enemies.length; i < l; ++i) {
            var dir = Math.floor(Math.random() * 4);
            if (dir == 0)
                enemyMoveUp(enemies[i]);
            else if (dir == 1)
                enemyMoveRight(enemies[i]);
            else if (dir == 2)
                enemyMoveDown(enemies[i]);
            else if (dir == 3)
                enemyMoveLeft(enemies[i]);


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
            enemies[i].div.style.left = enemies[i].x + 'px';
            enemies[i].div.style.top = enemies[i].y + 'px';

        }
    }

    /***************************************
     GAME INIT
     ***************************************/


    var player = {
        h : 6,
        v : 3
    };

    var oCanvas = document.getElementById('canvas');
    /*var playerdiv = document.createElement('div');
    playerdiv.id = 'player';
    playerdiv.className = 'block';
    playerdiv.style.left = player.hp + 'px';
    playerdiv.style.top = player.vp + 'px';
    game.appendChild(playerdiv);*/



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

    var baaCollisionsMap = getCollisionsMap(iaaLoadedMap);
    var oaEnemies = generateEnemies(baaCollisionsMap);
    displayEnemies(oCanvas, oaEnemies);



    /***************************************
     MAIN LOOP
     ***************************************/

    //setInterval(mainLoop, 16);
   // setInterval(enemiesLoop, 1000);

    function enemiesLoop() {
        enemiesMoves();
    }

    function mainLoop() {
        playerMoves();


        /*
         for (var currentEnemy in enemies){
         currentEnemy.x++;
         currentEnemy.div.style.left = currentEnemy.x;
         }
         */
    }

})(window);