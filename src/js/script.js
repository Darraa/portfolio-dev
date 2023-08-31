// -------------------ANIMATED BACKGROUND----------------------

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArr;

// mouse position

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80),
};

window.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "#676682";
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }

            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }

            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }

            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArr = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles * 1; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 2 - 1;
        let color = "#676682";

        particlesArr.push(
            new Particle(x, y, directionX, directionY, size, color)
        );
    }
}

function connect() {
    let opacityValue = 0.3;

    for (let a = 0; a < particlesArr.length; a++) {
        for (let b = a; b < particlesArr.length; b++) {
            let distance =
                (particlesArr[a].x - particlesArr[b].x) *
                    (particlesArr[a].x - particlesArr[b].x) +
                (particlesArr[a].y - particlesArr[b].y) *
                    (particlesArr[a].y - particlesArr[b].y);

            if (distance < (canvas.width / 3) * (canvas.height / 3)) {
                opacityValue = 1 - distance / 30000;
                ctx.strokeStyle = `rgba(103, 102, 130, ${opacityValue})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particlesArr[a].x, particlesArr[a].y);
                ctx.lineTo(particlesArr[b].x, particlesArr[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
    }

    connect();
}

window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = (canvas.height / 80) * (canvas.height / 80);
    init();
});

window.addEventListener("mouseout", function () {
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animate();

// -------------------TYPING EFFECT----------------------

const textElement = document.querySelector(".typing");
const text = textElement.innerHTML;
textElement.innerHTML = "";

let index = 0;
function typeText() {
    if (index < text.length) {
        textElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}

typeText();

// -------------------SHOW CURRENT SECTION----------------------

const fullpage = document.querySelector(".fullpage");
const navLinks = document.querySelectorAll(".link");
const sections = document.querySelectorAll("section");

function currentSection() {
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            navLinks.forEach((item) => {
                item.classList.remove("active");
            });
            e.target.classList.add("active");
        });
    });
}

function onScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    sections.forEach((section, i) => {
        const sectionTop = section.getBoundingClientRect().top + scrollY;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });
            navLinks[i].classList.add("active");
        }
    });
}

fullpage.addEventListener("scroll", onScroll);

currentSection();

// -------------------CAROUSEL----------------------
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    })
});
