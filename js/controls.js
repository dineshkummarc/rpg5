define(['js/game.js'], function(Game) {

    window.addEventListener("keydown", function(e) {
        if (e.keyCode == 40) movePlayer(2);
        if (e.keyCode == 38) movePlayer(0);
        if (e.keyCode == 37) movePlayer(3);
        if (e.keyCode == 39) movePlayer(1);
    }, false);


        /***************************************
         CONTROLS
         ***************************************/


        function movePlayer (iDirection) {
            if (canMove(Game.player, iDirection)) {
                if (iDirection == 0)
                    Game.player.v++;
                if (iDirection == 1)
                    Game.player.h++;
                if (iDirection == 2)
                    Game.player.v--;
                if (iDirection == 3)
                    Game.player.h--;
                refreshPlayerPosition();
            }

        }

        function refreshPlayerPosition () {
            Game.player.div.style.left = Game.player.h * 50 + 'px';
            Game.player.div.style.bottom = Game.player.v * 50 + 'px';
        }

        function canMove (mob, dir) {
            if (dir == 0 && !Game.collisionsMap[mob.v + 1][mob.h])
                return true;
            if (dir == 1 && !Game.collisionsMap[mob.v][mob.h + 1])
                return true;
            if (dir == 2 && !Game.collisionsMap[mob.v - 1][mob.h])
                return true;
            if (dir == 3 && !Game.collisionsMap[mob.v][mob.h - 1])
                return true;
            return false;
        }

    return {
        canMove : canMove,
        refreshPlayerPosition: refreshPlayerPosition,
        movePlayer: movePlayer
    }
    
});
