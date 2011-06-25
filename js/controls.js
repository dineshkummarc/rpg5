define(function() {

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

        function refreshPlayerPosition () {
            oPlayer.div.style.left = oPlayer.h * 50 + 'px';
            oPlayer.div.style.bottom = oPlayer.v * 50 + 'px';
        }

        function canMove (mob, dir) {
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
    
});
