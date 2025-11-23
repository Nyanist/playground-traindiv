(function () {
    const NUMBER_OF_STARS = 180;          
    const STAR_MIN_SIZE = 1;               
    const STAR_MAX_SIZE = 4;              
    const TWINKLE_MIN = 2.5;               
    const TWINKLE_MAX = 6;                 

    const style = document.createElement('style');
    style.textContent = `
    .star{
        position: fixed;
        pointer-events: none;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,1), rgba(255,255,255,0.4) 40%, rgba(255,255,255,0) 60%);
        box-shadow: 0 0 8px rgba(255,255,255,0.22), 0 0 20px rgba(150,200,255,0.06);
        transform: translate3d(0,0,0);
        will-change: transform, opacity;
        opacity: 0.85;
        mix-blend-mode: screen;
    }
    @keyframes star-twinkle {
        0% { opacity: 0.25; transform: scale(0.85); }
        50% { opacity: 1; transform: scale(1.15); }
        100% { opacity: 0.3; transform: scale(0.9); }
    }
    .star.twinkle {
        animation-name: star-twinkle;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
    }

    .hover-glow-alt {
        box-shadow: 0 10px 28px rgba(200,220,255,0.12), 0 2px 6px rgba(255,255,255,0.06) inset;
        transform: translateY(-4px);
        transition: transform 220ms ease, box-shadow 220ms ease;
    }

    /* ripple for buttons */
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0.2);
        pointer-events: none;
        opacity: 0.6;
        animation: ripple-grow 600ms cubic-bezier(.2,.8,.2,1);
        background: rgba(255,255,255,0.18);
        mix-blend-mode: screen;
    }
    @keyframes ripple-grow {
        to { transform: translate(-50%, -50%) scale(10); opacity: 0; }
    }

    /* comet */
    .comet {
        position: fixed;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,200,120,0.65));
        box-shadow: 0 0 18px rgba(255,230,200,0.6), -20px 0 40px rgba(255,180,90,0.12);
        will-change: transform, opacity;
        pointer-events: none;
    }
    .comet-tail {
        position: absolute;
        left: -120px;
        top: 50%;
        width: 120px;
        height: 2px;
        transform-origin: right center;
        background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.2));
        filter: blur(6px);
    }
    `;
    document.head.appendChild(style);

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star twinkle';
        const viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const left = Math.random() * viewportW;
        const top = Math.random() * viewportH;
        star.style.left = left + 'px';
        star.style.top = top + 'px';

        const size = STAR_MIN_SIZE + Math.random() * (STAR_MAX_SIZE - STAR_MIN_SIZE);
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        const duration = (TWINKLE_MIN + Math.random() * (TWINKLE_MAX - TWINKLE_MIN)).toFixed(2) + 's';
        star.style.animationDuration = duration;
        star.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';

        const speed = 0.2 + Math.random() * 1.4; // 0.2 - 1.6
        star.dataset.speed = speed.toString();

        document.body.appendChild(star);
        return star;
    }

    const stars = [];
    function populateStars() {
        for (let i = 0; i < NUMBER_OF_STARS; i++) {
            stars.push(createStar());
        }
    }

    let mouseX = 0, mouseY = 0;
    function onMouseMove(e) {
        mouseX = e.clientX - window.innerWidth / 2;
        mouseY = e.clientY - window.innerHeight / 2;
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function applyParallax() {

        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            const speed = parseFloat(s.dataset.speed || '1');

            const tx = -mouseX * (0.002 * speed);
            const ty = -mouseY * (0.002 * speed);
            s.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        }
        requestAnimationFrame(applyParallax);
    }

    function setupDynamicGradient() {
        const body = document.body;
        let hue = 210;
        let direction = 0.03; 

        function tick() {
            hue += direction;
            if (hue > 260) direction = -0.03;
            if (hue < 190) direction = 0.03;

            const h1 = Math.round(hue);
            const h2 = Math.round(hue + 12);
            const h3 = Math.round(hue + 26);


            body.style.background = `
                radial-gradient(1200px 600px at 10% 5%, rgba(30,40,70,0.55), transparent 6%),
                radial-gradient(900px 400px at 90% 90%, rgba(10,18,30,0.6), transparent 10%),
                linear-gradient(180deg, hsl(${h1}, 55%, 8%) 0%, hsl(${h2}, 48%, 10%) 35%, hsl(${h3}, 44%, 13%) 100%)
            `;
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }


    function setupButtonAnimations() {
        // pada HTML: .btn.cta dan .bttn
        const buttons = document.querySelectorAll('.btn.cta, .bttn, .tab');

        buttons.forEach(btn => {

            btn.addEventListener('mouseover', () => btn.classList.add('hover-glow-alt'));
            btn.addEventListener('mouseout', () => btn.classList.remove('hover-glow-alt'));

    
            btn.addEventListener('click', (ev) => {
                const rect = btn.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = (ev.clientX - rect.left) + 'px';
                ripple.style.top = (ev.clientY - rect.top) + 'px';

                const prevPos = getComputedStyle(btn).position;
                if (prevPos === 'static') btn.style.position = 'relative';

                btn.appendChild(ripple);

                setTimeout(() => ripple.remove(), 700);
            });
        });
    }

    function spawnComet(x, y) {
        const comet = document.createElement('div');
        comet.className = 'comet';
        const tail = document.createElement('div');
        tail.className = 'comet-tail';
        comet.appendChild(tail);

        comet.style.left = x + 'px';
        comet.style.top = y + 'px';
        document.body.appendChild(comet);

        const toX = window.innerWidth + 100;
        const toY = (Math.random() > 0.5) ? -200 : window.innerHeight + 200;

        const duration = 1300 + Math.random() * 1000;

        const start = performance.now();
        const sx = x, sy = y;

        function frame(now) {
            const t = Math.min(1, (now - start) / duration);
            // easing out
            const ease = 1 - Math.pow(1 - t, 3);
            const cx = sx + (toX - sx) * ease;
            const cy = sy + (toY - sy) * ease;
            comet.style.transform = `translate3d(${cx - x}px, ${cy - y}px, 0) rotate(${30 * ease}deg)`;
            comet.style.opacity = String(1 - t);

            if (t < 1) requestAnimationFrame(frame);
            else comet.remove();
        }
        requestAnimationFrame(frame);
    }

    function setupCometOnClick() {
        window.addEventListener('click', (e) => {
            // jika klik pada button jangan spawn
            if (e.target.closest('button, a, .btn, .bttn')) return;
            spawnComet(e.clientX, e.clientY);
        });
    }

    window.addEventListener('load', () => {
        populateStars();
        applyParallax();
        setupDynamicGradient();
        setupButtonAnimations();
        setupCometOnClick();
    });
})();
