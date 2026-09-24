export function drawSky(context, width, height, now, items, playerX) {
    context.clearRect(0, 0, width, height);

    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#5bc7f2');
    sky.addColorStop(.58, '#c5f2ff');
    sky.addColorStop(1, '#5aaeca');
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'rgba(255,255,255,.55)';
    for (let index = 0; index < 6; index++) {
        const cloudX = (index * 210 + now * .012 * (index + 1)) % (width + 180) - 90;
        const cloudY = 70 + (index % 3) * 65;
        context.beginPath();
        context.ellipse(cloudX, cloudY, 66, 15, 0, 0, 7);
        context.ellipse(cloudX + 48, cloudY - 4, 45, 18, 0, 0, 7);
        context.fill();
    }

    const ground = height * .68;
    context.fillStyle = '#66bd71';
    context.beginPath();
    context.moveTo(width * .28, ground);
    context.lineTo(0, height);
    context.lineTo(width, height);
    context.lineTo(width * .72, ground);
    context.closePath();
    context.fill();

    context.strokeStyle = 'rgba(28,108,118,.28)';
    for (let index = 0; index < 7; index++) {
        context.beginPath();
        context.moveTo(width * .5, ground);
        context.lineTo(index / 7 * width, height);
        context.stroke();
    }

    items.forEach(item => drawItem(context, item, width, height, now));
    drawShip(context, width, height, playerX);
}

function drawItem(context, item, width, height, now) {
    const positionX = item.x * width;
    const positionY = item.y * height;

    context.save();
    context.translate(positionX, positionY);
    context.rotate(now * .001 * item.spin);

    if (item.type === 'shard') {
        context.fillStyle = '#ffe587';
        context.strokeStyle = '#fff8c4';
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(0, -item.size);
        context.lineTo(item.size * .7, 0);
        context.lineTo(0, item.size);
        context.lineTo(-item.size * .7, 0);
        context.closePath();
        context.fill();
        context.stroke();
    } else {
        context.fillStyle = '#725185';
        context.strokeStyle = '#e75577';
        context.lineWidth = 3;
        context.beginPath();
        context.arc(0, 0, item.size, 0, 7);
        context.fill();
        context.stroke();
        context.strokeStyle = '#ffd0d8';
        context.beginPath();
        context.moveTo(-8, -8);
        context.lineTo(8, 8);
        context.moveTo(8, -8);
        context.lineTo(-8, 8);
        context.stroke();
    }

    context.restore();
}

function drawShip(context, width, height, playerX) {
    const shipX = playerX * width;
    const shipY = height * .78;

    context.fillStyle = 'rgba(255,238,141,.3)';
    context.beginPath();
    context.ellipse(shipX, shipY + 18, 52, 19, 0, 0, 7);
    context.fill();

    context.fillStyle = '#fff0a0';
    context.beginPath();
    context.moveTo(shipX, shipY - 25);
    context.lineTo(shipX + 35, shipY + 25);
    context.lineTo(shipX, shipY + 14);
    context.lineTo(shipX - 35, shipY + 25);
    context.closePath();
    context.fill();

    context.fillStyle = '#ef9b51';
    context.beginPath();
    context.arc(shipX, shipY - 2, 8, 0, 7);
    context.fill();

    context.strokeStyle = '#fff';
    context.strokeRect(shipX - 52, shipY + 27, 104, 3);
}
