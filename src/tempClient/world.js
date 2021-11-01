const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const SCALE = 3;

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", '/newWorld', false ); // false for synchronous request
xmlHttp.send();
var data = JSON.parse(xmlHttp.responseText);

data.forEach(line => {
    line.forEach(tile => {
        if (tile.contents) {
            ctx.fillStyle = '#2c2525';
            ctx.fillRect(tile.globalX * SCALE, tile.globalY * SCALE, SCALE, SCALE);
        } else {
            ctx.fillStyle = '#c9aeae';
            ctx.fillRect(tile.globalX * SCALE, tile.globalY * SCALE, SCALE, SCALE);
        }
    })
});