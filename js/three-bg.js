const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('three-canvas').appendChild(renderer.domElement);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

const gridHelper = new THREE.GridHelper(20, 20, 0x00d4ff, 0x00d4ff);
gridHelper.position.y = -3;
scene.add(gridHelper);

const cubes = [];
const cubeColors = [0x00d4ff, 0x00ff88, 0xff00aa, 0xffee00];
for (let i = 0; i < 8; i++) {
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshBasicMaterial({
        color: cubeColors[i % 4],
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 10
    );
    scene.add(cube);
    cubes.push({ mesh: cube, speed: Math.random() * 0.01 + 0.005, axis: Math.random() });
}

camera.position.z = 5;
camera.position.y = 1;

function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;
    gridHelper.position.z = (Date.now() * 0.001) % 2;
    cubes.forEach(c => {
        c.mesh.rotation.x += c.speed;
        c.mesh.rotation.y += c.speed;
        c.mesh.position.y += Math.sin(Date.now() * 0.001 + c.axis) * 0.002;
    });
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
