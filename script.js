const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

document.querySelectorAll(".effect").forEach(element => {
  let interval = null;

  element.onmouseover = event => {  
    let iteration = 0;
    clearInterval(interval); // Clear any existing interval

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iteration >= event.target.dataset.value.length) { 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  element.onmouseleave = event => {
    clearInterval(interval); // Stop the interval
    event.target.innerText = event.target.dataset.value; // Reset text to original value
  };
});


const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 600 / 800, 0.1);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.5 });
        camera.position.z = 6;

        // Improved Lighting
        const light = new THREE.AmbientLight(0xffffff, 1); // Soft white light with lower intensity
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 100); // White light
        pointLight.position.set(2, 2, 2); // Adjust position as needed
        scene.add(pointLight);


        const directionalLight = new THREE.PointLight(0xffffff, 1);
        directionalLight.position.set(0,0, 5).normalize();
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight2.position.set(-5, -5, -5).normalize(); // Add a second directional light
        scene.add(directionalLight2);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(600, 400);
        document.getElementById('floppyDiskContainer').appendChild(renderer.domElement);

        // Set the background color of the scene to #eeeeee
    

        // Load the 3D model
        let floppyDisk; 
        const loader = new THREE.GLTFLoader();
        loader.load('models/floppy_disk.glb', (gltf) => {
            floppyDisk = gltf.scene;
            floppyDisk.scale.set(1.5,1.5,1.5);

    

            scene.add(floppyDisk);
        }, undefined, (error) => {
            console.error('Error loading the model:', error);
        });

// Rotation flags and variables
let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    function onMouseDown(event) {
        isDragging = true;
    }

    function onMouseUp() {
        isDragging = false;
    }

    function onMouseMove(event) {
        if (isDragging && floppyDisk) {
            // Calculate the difference in mouse movement
            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            };

            // Rotate the model based on mouse movement
            floppyDisk.rotation.y += deltaMove.x * 0.005;
            floppyDisk.rotation.x += deltaMove.y * 0.005;

            previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    }

    // Store the initial mouse position
    document.addEventListener('mousedown', (event) => {
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        onMouseDown(event);
    });

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate automatically if not dragging
        if (!isDragging && floppyDisk) {
            floppyDisk.rotation.y += 0.01;
            floppyDisk.rotation.z += 0.01;
          
        }

        renderer.render(scene, camera);
    }

    animate();
        function onWindowResize() {
    const container = document.getElementById('floppyDiskContainer');
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize, false);

// Call the resize function once to ensure it starts with the correct size
onWindowResize();


const blob = document.getElementById("blob");

window.onpointermove = event => {
    const { clientX, clientY } = event;

    // Smooth animation
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
};
const floppyDiskContainer = document.getElementById('floppyDiskContainer');
floppyDiskContainer.style.pointerEvents = "auto";
blob.style.pointerEvents = "none";
