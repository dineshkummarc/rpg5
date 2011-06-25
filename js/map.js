define({

    /***************************************
     MAP LOADING
     ***************************************/

    getCollisionsMap : function(iaaLoadedMap) {
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
    },

    displayLayout : function(oCanvas, iaaLoadedMap) {

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

});

