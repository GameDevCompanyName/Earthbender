const socket = io();
const canvas = document.getElementById('canvas');
const SCALE = 0.8;

socket.on('env', (json) => {
    let data = JSON.parse(json);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4f4848';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawOffSetX = data.currentUser.body.x - (canvas.width * SCALE / 2);
    const drawOffSetY = data.currentUser.body.y - (canvas.height * SCALE / 2);

    data.objects.forEach(worldObject => {
        let x = ((worldObject.body.x - drawOffSetX) / SCALE);
        let y = ((worldObject.body.y - drawOffSetY) / SCALE);
        if (!worldObject.id) {
            ctx.fillStyle = '#2d2a29';
            ctx.fillRect(x - (50 / SCALE), y - (50 / SCALE),100 / SCALE,100 / SCALE);
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(x - (5 / SCALE), y - (5 / SCALE),10 / SCALE,10 / SCALE);
        }
    });
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'w') {
        socket.emit('controls', {
            x: 0,
            y: -1
        });
    }
    if (event.key === 'a') {
        socket.emit('controls', {
            x: -1,
            y: 0
        });
    }
    if (event.key === 's') {
        socket.emit('controls', {
            x: 0,
            y: 1
        });
    }
    if (event.key === 'd') {
        socket.emit('controls', {
            x: 1,
            y: 0
        });
    }
});

document.addEventListener('keyup', function (event) {
    socket.emit('controls', {
        x: 0,
        y: 0
    })
});