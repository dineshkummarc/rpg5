define({

    /***************************************
     PLAYER
     ***************************************/

    createPlayer : function(v, h) {
        return {v : v, h: h};
    },


    displayPlayer : function(oCanvas, oPlayer) {
        var oPlayerDiv = document.createElement('div');
        oPlayerDiv.id = 'player';
        oPlayerDiv.className = 'block';
        oPlayerDiv.style.left = oPlayer.h * 50 + 'px';
        oPlayerDiv.style.bottom = oPlayer.v * 50 + 'px';
        oPlayer.div = oPlayerDiv;
        oCanvas.appendChild(oPlayerDiv);
    }

});
