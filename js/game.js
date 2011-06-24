
(function(window, undefined){

    /***************************************
                    MAP LOADING
     ***************************************/

    var loadedmap = [
	           	new Array(2, 2 ,2, 2, 2, 2, 2, 2, 2),
	           	new Array(2, 1 ,0, 0, 0, 0, 4, 0, 2),
	           	new Array(2, 0 ,1, 0, 0, 0, 0, 0, 2),
	           	new Array(2, 0 ,4, 1, 2, 0, 0, 0, 2),
	           	new Array(2, 0 ,0, 0, 0, 0, 0, 0, 2),
	           	new Array(2, 0 ,0, 0, 0, 0, 0, 0, 2),
                new Array(2, 0 ,2, 0, 4, 0, 2, 0, 2),
                new Array(2, 4 ,0, 0, 0, 0, 0, 0, 2),
                new Array(2, 0 ,0, 0, 0, 0, 4, 0, 2),
                new Array(2, 0 ,0, 0, 2, 0, 0, 0, 2),
                new Array(2, 2 ,2, 2, 2, 2, 2, 2, 2)
	           ];

    function getCollisionsMap(loadedmap){
        var collisionsMap = [];
        for (var i = 0, l = loadedmap.length; i < l; ++i){
            var currentCollisionsLine = [];
            for (var j = 0, m = loadedmap[0].length; j < m; ++j){
                var currentCollisionBlock = false;
                if (loadedmap[i][j] == 2)
                    currentCollisionBlock = true;
                currentCollisionsLine.push(currentCollisionBlock);
            }
            collisionsMap.push(currentCollisionsLine);
        }
        return collisionsMap;
    }

    var collisionsMap = getCollisionsMap(loadedmap);

    var enemies = [];
    var scene = document.getElementById('game');
    for (var i = 0, l = loadedmap.length; i < l; ++i){
        var blocksLine = document.createElement('div');
        blocksLine.className = 'blocks-line';
        for (var j = 0, m = loadedmap[0].length; j < m; ++j){
            var currentBlock = document.createElement('div');
            currentBlock.className = 'block' + ' bx' + i + ' by' + j + ' t' + loadedmap[i][j];
            //currentBlock.innerHTML = 'i:' + i + ' j:' +  j;
            if (loadedmap[i][j] == 4){
                currentBlock.className += ' mob';
                enemies.push({i : i, j : j, x : i * 50, y : j * 50, dir : Math.floor(Math.random() * 4) ,div : currentBlock});

            }
            blocksLine.appendChild(currentBlock);
        }
        scene.appendChild(blocksLine);
    }


    /***************************************
                    GAME INIT
     ***************************************/


    var player = {
        i : 4,
        j : 4,
        x : 4 * 50,
        y : 4 * 50
    };

	var game = document.getElementById('game');
    var playerdiv = document.createElement('div');
    playerdiv.id = 'player';
    playerdiv.className = 'block';
    playerdiv.style.left = player.x + 'px';
    playerdiv.style.top = player.y + 'px';
    game.appendChild(playerdiv);

    /***************************************
                    CONTROLS
     ***************************************/

window.addEventListener("keydown", function(e){
    if (e.keyCode == 40) movePlayerDown();
    if (e.keyCode == 38) movePlayerUp();
    if (e.keyCode == 37) movePlayerLeft();
    if (e.keyCode == 39) movePlayerRight();
}, false);

function movePlayerDown(){
    if (canMove(player, 2)){
    player.j++;
    player.y = player.j * 50;
    }
}

function movePlayerUp(){
    if (canMove(player, 0)){
        player.j--;
        player.y = player.j * 50;
    }
}

function movePlayerLeft(){
    if (canMove(player, 3)){
    player.i--;
    player.x = player.i * 50;
    }
}

function movePlayerRight(){
    if (canMove(player, 1)){
    player.i++;
    player.x = player.i * 50;
    }
}

function canMove(mob, dir){

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

function playerMoves(){
/*    if (oMove.down)     player.y = player.y + 2;
    if (oMove.up)       player.y = player.y - 2;
    if (oMove.left)     player.x = player.x - 2;
    if (oMove.right)    player.x = player.x + 2;
*/
   // if (oMove.down || oMove.up)
        playerdiv.style.top = player.y + 'px';
    //if (oMove.left || oMove.right)
        playerdiv.style.left = player.x + 'px';
};

    /***************************************
                    IA
     ***************************************/

function enemyMoveUp(enemy){
   if (canMove(enemy, 0)){
       enemy.j++;
       enemy.y = enemy.j * 50;
   }
}

    function enemyMoveRight(enemy){
       if (canMove(enemy, 0)){
           enemy.i++;
           enemy.x = enemy.i * 50;
       }
    }
    function enemyMoveDown(enemy){
       if (canMove(enemy, 0)){
           enemy.j--;
           enemy.y = enemy.j * 50;
       }
    }
    function enemyMoveLeft(enemy){
       if (canMove(enemy, 0)){
           enemy.i--;
           enemy.x = enemy.i * 50;
       }
    }


function enemiesMoves(){
    for (var i = 0, l = enemies.length; i < l; ++i){
        var dir = Math.floor(Math.random() * 4);
        if (dir == 0)
           enemyMoveUp(enemies[i]);
        if (dir == 1)
           enemyMoveRight(enemies[i]);
        if (dir == 2)
           enemyMoveDown(enemies[i]);
        if (dir == 3)
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
                    MAIN LOOP
     ***************************************/


setInterval(mainLoop, 16);
setInterval(enemiesLoop, 1000);

function enemiesLoop(){
    enemiesMoves();
}

function mainLoop(){
    playerMoves();



/*
    for (var currentEnemy in enemies){
        currentEnemy.x++;
        currentEnemy.div.style.left = currentEnemy.x;
    }
*/
}

})(window);