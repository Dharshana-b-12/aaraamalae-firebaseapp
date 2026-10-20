// main.js

// Setup three.js scene

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create particle geometry

const particlesCount = 1000;
const particlesGeometry = new THREE.BufferGeometry();
const positionArray = new Float32Array(particlesCount * 3);

for(let i=0; i<particlesCount * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 200;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: 0xf7c948,
  size: 1.8,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.7,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  // Slowly rotate particle system with mouse interaction
  particles.rotation.y += 0.001 + mouseX * 0.003;
  particles.rotation.x += 0.001 + mouseY * 0.003;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
