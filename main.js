// Main Portfolio JavaScript - Interactive Effects and Animations

// Cursor trail effect
const cursorTrails = [];
const maxTrails = 10;

// Create cursor trails
for (let i = 0; i < maxTrails; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = (maxTrails - i) / maxTrails * 0.5;
    trail.style.transform = `scale(${(maxTrails - i) / maxTrails})`;
    document.body.appendChild(trail);
    cursorTrails.push(trail);
}

// Mouse tracking for cursor trail
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor trails
function animateTrails() {
    cursorTrails.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = mouseX + 'px';
            trail.style.top = mouseY + 'px';
        }, index * 20);
    });
    requestAnimationFrame(animateTrails);
}
animateTrails();

// Scroll progress bar
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Parallax effect for tech elements
function updateParallax() {
    const scrolled = window.pageYOffset;
    const techElements = document.querySelectorAll('.tech-element');
    
    techElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.01}deg)`;
    });

    // Update parallax backgrounds
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    parallaxBgs.forEach(bg => {
        const yPos = -(scrolled * 0.3);
        bg.style.transform = `translateY(${yPos}px)`;
    });
}

// Section-based tech element switching
function updateTechElementsForSection() {
    const sections = ['websites-section', 'games-section', 'software-section'];
    const techGroups = document.querySelectorAll('.tech-elements-group');
    
    let activeSection = 'websites'; // default
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
            
            if (isVisible) {
                activeSection = section.id.replace('-section', '');
            }
        }
    });
    
    // Show/hide appropriate tech elements
    techGroups.forEach(group => {
        const groupSection = group.getAttribute('data-section');
        if (groupSection === activeSection) {
            group.classList.remove('hidden');
        } else {
            group.classList.add('hidden');
        }
    });
}

window.addEventListener('scroll', () => {
    updateParallax();
    updateTechElementsForSection();
});

// Initialize particles with default theme
function updateParticles(color) {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: color },
            shape: { type: "circle" },
            opacity: { value: 0.4 },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: color, opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, out_mode: "bounce" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 120 },
                push: { particles_nb: 6 }
            }
        },
        retina_detect: true
    });
}

// Three.js Background Animation (Simple)
let scene, camera, renderer, particles = [], animationId;

function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    
    if (!canvas) return;
    
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x64748b,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // Animation loop
    function animate() {
        animationId = requestAnimationFrame(animate);
        
        const time = Date.now() * 0.0005;
        
        // Rotate particle system
        particleSystem.rotation.y = time * 0.1;
        particleSystem.rotation.x = time * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", () => {
    // Fade-in animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger special effects for different sections
                if (entry.target.classList.contains('parallax-section')) {
                    const parallaxBg = entry.target.querySelector('.parallax-bg');
                    if (parallaxBg) {
                        parallaxBg.style.animation = 'pulse 2s ease-in-out';
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Initialize particles with default theme
    updateParticles("#94a3b8");
    
    // Initialize Three.js animation
    setTimeout(initThreeJS, 100);
    
    // Initialize section-based tech elements
    updateTechElementsForSection();
});

// Handle window resize for Three.js
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Add tech element hover effects
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.tech-element').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.opacity = '0.8';
                this.style.transform += ' scale(1.2)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.opacity = '0.3';
                this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            });
        });
    }, 1000);
});
