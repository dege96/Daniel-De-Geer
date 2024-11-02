const CollectionPage = document.getElementById('CollectionPage');
const GlbWrapper =  document.getElementById('GlbWrapper');

const Bild1 =  document.getElementById('bild1');
const Bild2 =  document.getElementById('bild2');
const Bild3 =  document.getElementById('bild3');
const title = document.querySelector('#title');

//storlek på bilder
[Bild1, Bild2, Bild3].forEach(bild => {
  bild.addEventListener('mouseover', () => {
    gsap.to(bild, { scale: 1.05, duration: 0.5, ease: 'power3.out' });
  });
  bild.addEventListener('mouseout', () => {
    gsap.to(bild, { scale: 1, duration: 0.5, ease: 'power3.out' });
  });
});

function canSelect(){
  const Bild1Accordion = document.querySelector('#Bild1Accordion');
  const Bild2Accordion = document.querySelector('#Bild2Accordion');
}

//Lägg till fler för varje bild
Bild1.addEventListener('click', () => showThreeJS('Gun1.glb', 'KOMMANDER 879', 20));
Bild2.addEventListener('click', () => showThreeJS('SHIP_TRIANGULATED.GLB', 'THE CELESTIAL VOYAGER', 10));

class AccordionItem extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define("accordion-item", AccordionItem);

// Function to display the accordion content based on the clicked image
function handleAccordionDisplay(clickedImage) {
  const accordion1 = document.querySelector('#Bild1Accordion');
  const accordion2 = document.querySelector('#Bild2Accordion');

  // Hide all accordions initially
  accordion1.style.display = 'none';
  accordion2.style.display = 'none';

  // Show the appropriate accordion based on the clicked image
  if (clickedImage === 'bild1') {
    accordion1.style.display = 'block';
  } else if (clickedImage === 'bild2') {
    accordion2.style.display = 'block';
  }
}

// Click event listeners for images
Bild1.addEventListener('click', () => handleAccordionDisplay('bild1'));
Bild2.addEventListener('click', () => handleAccordionDisplay('bild2'));


// Function to handle the display of accordion items
function toggleAccordion(accordionIdToShow) {
  // Get all accordion items
  const allAccordions = document.querySelectorAll('.accordion-content');
  
  // Hide all accordion items
  allAccordions.forEach(accordion => {
    accordion.classList.remove('show');
  });
  
  // Show the selected accordion item
  const accordionToShow = document.getElementById(accordionIdToShow);
  if (accordionToShow) {
    accordionToShow.classList.add('show');
  }
}

// Accordion shower depending on image clicked
Bild1.addEventListener('click', () => {
  toggleAccordion('Bild1Accordion');
});

Bild2.addEventListener('click', () => {
  toggleAccordion('Bild2Accordion');
});


//Lägger till glb beroende på bild klickad
function showThreeJS(glbLocation, title, scale) {
  console.log(`showThreeJS called with glbLocation: ${glbLocation}, title: ${title}, scale: ${scale}`);
  CollectionPage.style.display = 'none';
  GlbWrapper.style.display = 'block';
  const edit_title = document.getElementById("title");
  edit_title.textContent = title;
  console.log(`edit_title.textContent set to ${title}`);
  ScaleSet = scale;
  console.log(`ScaleSet set to ${scale}`);
  ElementLocation = glbLocation;
  console.log(`ElementLocation set to ${glbLocation}`);
  
  ThreeJS(ElementLocation, glbLocation, ScaleSet);
  console.log('Calling ThreeJS function');
}

function ThreeJS(element, SelectedElement, ScaleSet){
  async function main() {
    console.log("Starting main function");
    const loader = new THREE.GLTFLoader();
    console.log("GLTFLoader initialized");
    
    try {
      const gltf1 = await loader.loadAsync(element);
      console.log("Model loaded successfully");
      
      if (gltf1.scene) {
        let Mesh1 = gltf1.scene;
        Mesh1.scale.set(ScaleSet, ScaleSet, ScaleSet);
        console.log("Mesh scale set to:", ScaleSet);
        
        Mesh1.position.y = 0;
        Mesh1.position.x = 0;
        Mesh1.name = SelectedElement;
        console.log("Mesh positioned and named:", SelectedElement);
        
        scene.add(Mesh1);
        console.log("Mesh added to scene");
        
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 0, 10);
        scene.add(light);
        console.log("Point light added to scene");
      
      } else {
        console.log('GLTF model not loaded');
      }
      
    } catch (error) {
      console.error("Error loading model:", error);
    }
    
    MakeBackgroundScene();
    console.log("Background scene initialized");
    
    setUpEventListeners();
    console.log("Event listeners set up");
    
    animate();
    console.log("Animation started");
    
    lights();
    console.log("Lighting setup completed");
  }
  
  main();
  
  
  //Storlek på fönstret
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  
  // Ställ in scenen, kameran och renderaren
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: testCanvas, antialias: true, alpha: true});
  renderer.setSize(sizes.width, sizes.height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  
  // Hastighet för objekts rotation
  const spinSpeed = 2;
  
  // Markör på objekt = false
  let onObject = false;
  
  //Ställ in "raycaster"
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let isRaycasting = false;
  
  // Kameraposition
  camera.position.set(0, 50, 100);
  camera.lookAt(scene.position);
  
  // Ställ in "controllers"
  const controls = new THREE.OrbitControls(camera, testCanvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = spinSpeed;
  
  //HDRi
  function MakeBackgroundScene(element){
    new THREE.RGBELoader().load("./HDRI/lilienstein_2k.hdr", function(texture){ 
      console.log("Texture loaded");
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = null;
      scene.environment = texture;

    });
  }
  
  //Ljussättning
  function lights(){
    console.log("Setting up light sources");
    object = scene.children[1];
  
    //top of the object
    const topLight = new THREE.DirectionalLight(0xADD8E6, 0.75);
    topLight.position.set(object.position.x, object.position.y + 25, object.position.z);
    const helper1 = new THREE.DirectionalLightHelper( topLight, 1 );
    scene.add(topLight);
    console.log("Top light added");
  
    //bottom of the object
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.1, 100);
    bottomLight.position.set(object.position.x, object.position.y, object.position.z+1);
    const helper2 = new THREE.DirectionalLightHelper( bottomLight, 1 );
    scene.add(bottomLight);
    console.log("Bottom light added");
  
    //left of the object
    const leftLight = new THREE.SpotLight(0xADD8E6, 0.15);
    leftLight.position.set(object.position.x - 1335, object.position.y, object.position.z);
    scene.add(leftLight);
    console.log("Left light added");
  
    //right of the object
    const rightLight = new THREE.SpotLight(0xffffff, 0.25);
    rightLight.position.set(object.position.x + 1335, object.position.y, object.position.z);
    scene.add(rightLight); 
    console.log("Right light added");
  
    //front of the object
    const frontLight = new THREE.SpotLight(0xffffff, 0.5);
    frontLight.position.set(object.position.x, object.position.y, object.position.z + 1335);
    scene.add(frontLight); 
    console.log("Front light added");
  
    //back of the object
    const backLight = new THREE.SpotLight(0xffffff, 0.15);
    backLight.position.set(object.position.x, object.position.y, object.position.z - 1335);
    scene.add(backLight);
    console.log("Back light added");
  }

  
  //Funktion för alla event-listeners
  function setUpEventListeners() {
    // Uppdatera storleken på gränssnittet när fönstret ändras
    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      console.log(`Window resized to ${sizes.width}x${sizes.height}`);
  
      // Updatera kamera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });
  
    // Uppdatera musens position, klick och tangenttryckningar
    window.addEventListener( "pointermove", onPointerMove );
    window.addEventListener( "click", onClick );
    window.addEventListener( "keydown", (event) => {
      console.log(`Key pressed: ${event.key}`);
    });
  
    console.log("Event listeners set up");
  }
  
  //Funktion för att se vart musen är
  function onPointerMove(event) {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
    
    console.log(`Pointer moved: x=${mouse.x}, y=${mouse.y}`);
  
    if (isRaycasting) {
      console.log("Raycasting in progress, skipping...");
      return;
    }
  
    isRaycasting = true;
    console.log("Starting raycasting...");
    
    mouseOn3DObject();
    console.log("Checked mouse on 3D object");
    
    changeProperties();
    console.log("Changed properties based on raycast");
    
    resetMouseOn3DObject();
    console.log("Reset mouse on 3D object");
    
    // Schemalägg nästa strålsändning om 50 millisekunder (för bättre prestanda)
    setTimeout(() => {
      isRaycasting = false;
      console.log("Raycasting completed");
    }, 50);
  }
  
  function onClick(event) {
    console.log("Clicked on the screen");
    
    // Updatera raycaster
    raycaster.setFromCamera(mouse, camera);
    console.log("Updated raycaster");
    
    raycaster.params.Line.threshold = 1;
    const intersects = raycaster.intersectObjects(scene.children, true);
    console.log(`Intersects length: ${intersects.length}`);
    console.log("Clicked on: ", intersects);
    }

  
  // Funktion för att återställa musen när den är på objektet
  function resetMouseOn3DObject() {
      onObject = false;
  }
  
  // Funktion för att kontrollera om musen är på objektet
  function mouseOn3DObject() {
    console.log("Running mouseOn3DObject()");
    raycaster.setFromCamera(mouse, camera);
    raycaster.params.Line.threshold = 1;
    const intersects = raycaster.intersectObjects(scene.children, true);
    console.log(`Intersects length in mouseOn3DObject(): ${intersects.length}`);
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.type === "Mesh") {
        onObject = true;
        console.log("Mouse is on a mesh");
      } else {
        console.log("Mouse is not on a mesh");
      }
    }
    console.log(`onObject value after mouseOn3DObject(): ${onObject}`);
  }
  
  function changeProperties() {
    console.log("Running changeProperties()");
    // Skapa en tidslinje för objektanimering
    const tl = gsap.timeline({ defaults: { ease: "power3.easeInOut" } });
    if (onObject) {
      testCanvas.style.cursor = "pointer";
      console.log("Mouse is on an object, scaling up");
      tl.to(scene.getObjectByName(SelectedElement).scale, {z:(ScaleSet*1.1), x:(ScaleSet*1.1), y:(ScaleSet*1.1), duration: 0.5});
    } else {
      testCanvas.style.cursor = "default";
      console.log("Mouse is not on an object, scaling down");
      tl.to(scene.getObjectByName(SelectedElement).scale, {z:ScaleSet, x:ScaleSet, y:ScaleSet, duration: 0.5});
    }
    console.log("Leaving changeProperties()");
  }

  function animateDisappear(currentObject, NoncurrentObject) {
  
    controls.autoRotate = false;
  
    console.log(currentObject.name);
    console.log(NoncurrentObject);
  
    setTimeout(changeObject, 1700);
  
    // Återställ objektets rotation
    currentObject.rotation.set(0, 0, 0);
    NoncurrentObject.rotation.set(0, 0, 0);
  
    disappearTimeline = gsap.timeline({ defaults: {ease:Elastic.easeInOut}});
    disappearTimeline.to(currentObject.rotation, {y: endValue, duration: startTime}, "<");
    disappearTimeline.to(NoncurrentObject.rotation, {y: endValue, duration: NoncurrentObjectDuration, onComplete: rotera}, "<");
    disappearTimeline.play();
  
    function rotera(){
      controls.autoRotate = true
    }
  }

  function removeLoading() {
    
    //Tar bort loading screen
    //document.querySelector('#loading').style.display = "none";

  }


  function displayInfoBox(){
    // Kontrollera om inforutan är inaktiv
    if (!document.getElementsByClassName("infoBox")[0].classList.contains("active")) {
  
    // Skapa en tidslinje för objektanimering
    const displayInfoBoxTimeline = gsap.timeline({ defaults: {ease: Power1.easeInOut}}).pause();
  
    displayInfoBoxTimeline.eventCallback("onStart", () => {
      const writing = true;
      console.log("writing is: " + writing);
    });
    displayInfoBoxTimeline.eventCallback("onComplete", () => {
      const writing = false;
      console.log("writing is: " + writing);
      });
  
    displayInfoBoxTimeline.fromTo("#infoBox", {opacity: 0}, {opacity: 1, duration: 0.2},);
    displayInfoBoxTimeline.to(".infoBox h2", {duration: 2, text: "Famas", delay: 0.2},">");
  
    displayInfoBoxTimeline.play();
  
    //Sätt infobox till aktiv
    document.getElementsByClassName("infoBox")[0].classList.add("active");
    
    }
  }
  
  function hideInfoBox(){
    // Kontrollera om inforutan är aktiv
    if (document.getElementsByClassName("infoBox")[0].classList.contains("active")) {
    // Skapa en tidslinje för objektanimering
    console.log("hideInfoBox");
    const hideInfoBoxTimeline = gsap.timeline({ defaults: {ease: Power1.easeInOut}}).pause();
    hideInfoBoxTimeline.to("#infoBox", {duration: 2, text: " ", delay: 0.2});
    hideInfoBoxTimeline.to(".infoBox h2", {duration: 4, text: " "}, "-=2");
    hideInfoBoxTimeline.to("#p2", {duration: 2.8, text: " "}, "-=3");
    hideInfoBoxTimeline.play();
  
    //Sätt info box tagg till inaktive
    document.getElementsByClassName("infoBox")[0].classList.remove("active");
    }
  }
  
  const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
  
    // Renderar konstant
    renderer.render(scene, camera);
  }; 
  
  }


canSelect()

