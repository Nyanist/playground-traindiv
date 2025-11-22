function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    const size = Math.random() * 2 + 3;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.animationDelay = Math.random() * 5 + 's';
    star.style.animationDuration = Math.random() * 3 + 2 + 's'; 
    document.body.appendChild(star);
}

const numberOfStars = 140;

function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.button-title-1, .button-title-2, .button-orion, .button-scorpio');

    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.classList.add('hover-glow');
        });

        button.addEventListener('mouseout', () => {
            button.classList.remove('hover-glow');
        });
    });
}


function setupDynamicGradient() {
    const body = document.body;
    let hue = 220; 

    function updateGradient() {
        hue += 0.05; 

        if (hue > 240) {
            hue = 220;
        }

        body.style.setProperty('--hue-rotate', hue);
        requestAnimationFrame(updateGradient);
    }

    updateGradient();
}


window.onload = function() {
   
    for (let i = 0; i < numberOfStars; i++) {
        createStar();
    }
    
    setupDynamicGradient();
    
    setupButtonAnimations();
};
