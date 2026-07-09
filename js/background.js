// js/background.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.prepend(canvas); // bodyの最初に挿入
    const ctx = canvas.getContext('2d');

    let width, height;
    let rotationY = 0, rotationX = 0;
    let isDragging = false, lastMouseX = 0, lastMouseY = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousedown', (e) => { isDragging = true; lastMouseX = e.clientX; lastMouseY = e.clientY; });
    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            rotationY += (e.clientX - lastMouseX) * 0.005;
            rotationX += (e.clientY - lastMouseY) * 0.005;
            lastMouseX = e.clientX; lastMouseY = e.clientY;
        }
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    function project(x, y, z) {
        let rx = x * Math.cos(rotationY) - z * Math.sin(rotationY);
        let rz = x * Math.sin(rotationY) + z * Math.cos(rotationY);
        let ry = y * Math.cos(rotationX) - rz * Math.sin(rotationX);
        rz = y * Math.sin(rotationX) + rz * Math.cos(rotationX);
        const perspective = 800 / (800 + rz);
        return { x: rx * perspective + width / 2, y: ry * perspective + height / 2, scale: perspective, z: rz };
    }

    const stars = [];
    for(let i=0; i<600; i++) stars.push({ x: (Math.random()-0.5)*3000, y: (Math.random()-0.5)*2000, z: (Math.random()-0.5)*3000, size: Math.random()*1.5 });

    function animate() {
        ctx.fillStyle = "#010105";
        ctx.fillRect(0, 0, width, height);
        stars.forEach(s => {
            const p = project(s.x, s.y, s.z);
            if(p.z > -700) {
                ctx.fillStyle = `rgba(255,255,255,${p.scale})`;
                ctx.beginPath(); ctx.arc(p.x, p.y, s.size * p.scale, 0, Math.PI*2); ctx.fill();
            }
        });
        // 鳳凰の黄金色に輝くブラックホール
        const p = project(0, 0, 0);
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#FFB703';
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.arc(p.x, p.y, 50 * p.scale, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        requestAnimationFrame(animate);
    }
    animate();
});