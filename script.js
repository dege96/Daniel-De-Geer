const CollectionTitle = document.querySelector('#CollectionTitle');
const AboutTitle = document.querySelector('#AboutTitle');
const ContactTitle = document.querySelector('#ContactTitle');
const AboutPage = document.getElementById('AboutPage');
const CollectionPage = document.getElementById('CollectionPage');
const ContactPage = document.getElementById('ContactPage');
const GlbWrapper =  document.getElementById('wrapper2');

const Bild1 =  document.getElementById('bild1');
const Bild2 =  document.getElementById('bild2');
const Bild3 =  document.getElementById('bild3');
const title = document.querySelector('#title');

/* particlesJS("particles-js", {
  particles: {
    number: {
      value: 3,
      density: {
        enable: true,
        value_area: 80
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "rectangle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 20
      }
    },
    opacity: {
      value: 2,
      random: false,
      anim: {
        enable: false,
        speed: 0.2,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 6,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 1,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
}); */


//Klicka collection title
CollectionTitle.addEventListener('click', (event) => {
  console.log('You clicked the Collection Title!');
  AboutPage.style.display = 'none';
  ContactPage.style.display = 'none';
  CollectionPage.style.display = 'flex';
  GlbWrapper.style.display = "none";
  //ContactPage.classList.add('show');

});

//Klicka collection title
AboutTitle.addEventListener('click', (event) => {
  console.log('You clicked the About Title!');
  ContactPage.style.display = 'none';
  CollectionPage.style.display = 'none';
  AboutPage.style.display = 'flex';
  GlbWrapper.style.display = "none";
});

//Klicka contact title
ContactTitle.addEventListener('click', (event) => {
  console.log('You clicked the Contact Title!');
  AboutPage.style.display = 'none';
  CollectionPage.style.display = 'none';
  ContactPage.style.display = 'flex';
  GlbWrapper.style.display = "none";
});


document.addEventListener('DOMContentLoaded', function() {
  const titleElements = document.querySelectorAll('.header-container .title');

  titleElements.forEach(function(title) {
    title.addEventListener('click', function() {
      titleElements.forEach(function(el) {
        el.classList.remove('active'); // Remove the active class from other titles
      });
      title.classList.add('active'); // Add the active class to the clicked title
    });
  });
});

function canSelect(){

  const Bild2Accordion = document.querySelector('#Bild2Accordion');
  const Bild1Accordion = document.querySelector('#Bild1Accordion');
  const burkbilder = document.querySelector('#bild'); 

  // initiera variabler
  let image = document.getElementsByTagName("img")[0]; //Standardbild

  const itemCards = document.querySelectorAll('.item-card');
  const Gun1 = document.getElementById('SubmachineGun');

function easeOutCallTHREE(element){
  CollectionPage.style.display = 'none';
  console.log(element)
    anime({
      targets: element,
      opacity: 0,
      easing: 'easeOutExpo',
      duration: 1000,
      complete: () => {
        transitionToThreeJS(element, "Gun1.glb", "Gun1")
      }
    })
}
}

//Lägg till fler för varje bild
Bild1.addEventListener('click', () => showThreeJS('Gun1.glb', 'Sniper Rifle', 20));
Bild2.addEventListener('click', () => showThreeJS('Ship_Triangulated.glb', 'The Celestial Voyager', 10));


function showThreeJS(glbLocation, title, scale) {
  CollectionPage.style.display = 'none';
  GlbWrapper.style.display = 'flex';

  // create a new h1 element for the title
edit_title = document.getElementById("title")
edit_title.textContent = title;

  ScaleSet = scale; //Ändrar inte
  console.log(ScaleSet);
  ElementLocation = glbLocation;
  document.querySelector('#loading').style.display = "block";
  Bild1Accordion.classList.remove('show');
  Bild2Accordion.classList.add('show');
  ThreeJS(ElementLocation, glbLocation, ScaleSet);
}


function ThreeJS(element, SelectedElement, ScaleSet){
  async function main() {
    const loader = new THREE.GLTFLoader();
    // Ladda den första modellen
    const gltf1 = await loader.loadAsync(element);
    if (gltf1.scene) {
      let Mesh1 = gltf1.scene;
      Mesh1.scale.set(ScaleSet, ScaleSet, ScaleSet);
      Mesh1.position.y = 0;
      Mesh1.position.x = 0;
      Mesh1.name = SelectedElement;
      Mesh1.material = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 100, specular: 0xffffff, flatShading: true});
      scene.add(Mesh1);
      console.log(Mesh1);
      //Mesh1.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(0, 0, 10);
      scene.add(light);
    
    } else {
      console.log('GLTF model not loaded');
    }
  


    // Tona i toppfältet, används med openingAnimation()
    MakeBackgroundScene();
    setUpEventListeners();
    animate();
    lights();
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
  scene.fog = new THREE.Fog( 0x111111, 150, 200 );
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
  camera.lookAt(scene.position); //add this line
  
  // Ställ in "controllers"
  const controls = new THREE.OrbitControls(camera, testCanvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = spinSpeed;
  //controls.minPolarAngle = 75 * Math.PI/180;
  //controls.maxPolarAngle = 100 * Math.PI/180;
  
  //HDRi
  function MakeBackgroundScene(element){
    new THREE.RGBELoader().load("./HDRI/MR_INT-001_NaturalStudio_NAD.hdr", function(texture){ 
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = null;
      scene.environment = texture;
      console.log("Background set");
      openingAnimation();
    });
  }
  
  //Ljussättning
  function lights(){
    object = scene.children[1];
  
    //top of the object
    const topLight = new THREE.DirectionalLight(0xADD8E6, 0.75);
    topLight.position.set(object.position.x, object.position.y + 25, object.position.z);
    const helper1 = new THREE.DirectionalLightHelper( topLight, 1 );
    scene.add(topLight);
  
    //bottom of the object
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.1, 100);
    bottomLight.position.set(object.position.x, object.position.y, object.position.z+1);
    const helper2 = new THREE.DirectionalLightHelper( bottomLight, 1 );
    scene.add(bottomLight);
  
    //left of the object
    const leftLight = new THREE.SpotLight(0xADD8E6, 0.15);
    leftLight.position.set(object.position.x - 1335, object.position.y, object.position.z);
    scene.add(leftLight);
  
    //right of the object
    const rightLight = new THREE.SpotLight(0xffffff, 0.25);
    rightLight.position.set(object.position.x + 1335, object.position.y, object.position.z);
    scene.add(rightLight); 
  
    //front of the object
    const frontLight = new THREE.SpotLight(0xffffff, 0.5);
    frontLight.position.set(object.position.x, object.position.y, object.position.z + 1335);
    scene.add(frontLight); 
  
    //back of the object
    const backLight = new THREE.SpotLight(0xffffff, 0.15);
    backLight.position.set(object.position.x, object.position.y, object.position.z - 1335);
    scene.add(backLight);
  }
  
  //Funktion för alla event-listeners
  function setUpEventListeners() {
    // Uppdatera storleken på gränssnittet när fönstret ändras
    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      console.log(sizes.width, sizes.height);
  
      // Updatera kamera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });
  
    // Uppdatera musens position, klick och tangenttryckningar
    window.addEventListener( "pointermove", onPointerMove );
    window.addEventListener( "click", onClick );
    window.addEventListener( "keydown", (event) => {
    });
  
    console.log("Event listeners set up");
  }
  
  //Funktion för att se vart musen är
  function onPointerMove(event) {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
  
    if (isRaycasting) {
      return;
    }
  
    isRaycasting = true;
    mouseOn3DObject();
    changeProperties();
    resetMouseOn3DObject();
    // Schemalägg nästa strålsändning om 50 millisekunder (för bättre prestanda)
    setTimeout(() => {
      isRaycasting = false;
    }, 50);
  }
  
  function onClick(event) {
    // Updatera raycaster
    raycaster.setFromCamera(mouse, camera);
    raycaster.params.Line.threshold = 1;
    const intersects = raycaster.intersectObjects(scene.children, true);
    }
  
  // Funktion för att återställa musen när den är på objektet
  function resetMouseOn3DObject() {
      onObject = false;
  }
  
  // Funktion för att kontrollera om musen är på objektet
  function mouseOn3DObject() {
    raycaster.setFromCamera(mouse, camera);
    raycaster.params.Line.threshold = 1;
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.type === "Mesh") {
        onObject = true;
      }
    }
  }
  

  function changeProperties() {
    // Skapa en tidslinje för objektanimering
    const tl = gsap.timeline({ defaults: { ease: "power3.easeInOut" } });
    if (onObject) {
      testCanvas.style.cursor = "pointer";
      tl.to(scene.getObjectByName(SelectedElement).scale, {z:(ScaleSet*1.1), x:(ScaleSet*1.1), y:(ScaleSet*1.1), duration: 0.5});
    } else {
      testCanvas.style.cursor = "default";
      tl.to(scene.getObjectByName(SelectedElement).scale, {z:ScaleSet, x:ScaleSet, y:ScaleSet, duration: 0.5});
    }
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

  function openingAnimation() {
    
    //Tar bort loading screen
    document.querySelector('#loading').style.display = "none";
  // Skapa en tidslinje för sidanimering
    const mainPageTimeline = gsap.timeline({ defaults: { ease:Elastic.easeInOut } });
    mainPageTimeline.to(".top", {y: 0, duration: 3});
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

