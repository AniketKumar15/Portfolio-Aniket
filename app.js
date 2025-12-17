const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
if (window.innerWidth < 768) {
    document.querySelector('.cursor').style.display = 'none';
}

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 50;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.3 + 0.1,
            alpha: Math.random() * 0.5 + 0.3
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();

        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;
    }

    requestAnimationFrame(drawStars);
}

createStars();
drawStars();

const slider = document.getElementById("certSlider");
const slides = slider.querySelector(".slides");
const images = slides.querySelectorAll("img");

let index = 0;
let interval;

function startSlider() {
    interval = setInterval(() => {
        index = (index + 1) % images.length;
        slides.style.transform = `translateX(-${index * 100}%)`;
    }, 3000); // 3 seconds
}

function stopSlider() {
    clearInterval(interval);
}

startSlider();

slider.addEventListener("mouseenter", stopSlider);
slider.addEventListener("mouseleave", startSlider);