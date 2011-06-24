
(function(window, undefined){


    var loadedmap = [
	           	new Array(0, 0 ,0, 0, 0, 0, 0, 0, 0),
	           	new Array(0, 1 ,0, 0, 0, 0, 0, 0, 0),
	           	new Array(0, 0 ,1, 0, 0, 0, 0, 0, 0),
	           	new Array(0, 0 ,0, 1, 0, 0, 0, 0, 0),
	           	new Array(0, 0 ,0, 0, 0, 0, 0, 0, 0),
	           	new Array(0, 0 ,0, 0, 0, 0, 0, 0, 0),
                new Array(0, 0 ,0, 0, 0, 0, 0, 0, 0),
                new Array(0, 0 ,0, 0, 0, 0, 0, 0, 0),
                new Array(0, 0 ,0, 0, 0, 0, 0, 0, 0),
                new Array(0, 0 ,0, 0, 0, 0, 0, 0, 0),
                new Array(0, 0 ,0, 0, 0, 0, 0, 0, 0)
	           ];

    var scene = document.getElementById('game');
    for (var i = 0, l = loadedmap.length; i < l; ++i){
        var blocksLine = document.createElement('div');
        blocksLine.className = 'blocks-line';
        for (var j = 0, m = loadedmap[0].length; j < m; ++j){
            var currentBlock = document.createElement('div');
            currentBlock.className = 'block' + ' bx' + i + ' by' + j + ' t' + loadedmap[i][j];
            blocksLine.appendChild(currentBlock);
        }
        scene.appendChild(blocksLine);
    }


    var player = {
        x : 400,
        y : 400
    };

	var game = document.getElementById('game');
    var playerdiv = document.createElement('div');
    playerdiv.id = 'player';
    playerdiv.className = 'block';
    playerdiv.style.left = player.x + 'px';
    playerdiv.style.top = player.y + 'px';
    game.appendChild(playerdiv);

    var oMove = {up:0, down:0, left:0, right:0};

window.addEventListener("keydown", function(e){

    if (e.keyCode == 40) oMove.down = 1;
    if (e.keyCode == 38) oMove.up = 1;
    if (e.keyCode == 37) oMove.left = 1;
    if (e.keyCode == 39) oMove.right = 1;
    }, false);

window.addEventListener("keyup", function(e){
    if (e.keyCode == 40) oMove.down = 0;
    if (e.keyCode == 38) oMove.up = 0;
    if (e.keyCode == 37) oMove.left = 0;
    if (e.keyCode == 39) oMove.right = 0;
    }, false);


setInterval(mainLoop, 16);

function mainLoop(){
    if (oMove.down) player.y++;
if (oMove.up) player.y--;
if (oMove.left) player.x--;
if (oMove.right) player.x++;

        playerdiv.style.left = player.x + 'px';
    playerdiv.style.top = player.y + 'px';
}

})(window);