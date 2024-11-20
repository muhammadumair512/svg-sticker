document.addEventListener("DOMContentLoaded", () => {
  startGradientEffect();
});

function Marqueertl(selector, speed) {
  const parentSelector = document.querySelector(selector);
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];
  let i = 0;

  parentSelector.insertAdjacentHTML("beforeend", clone);
  parentSelector.insertAdjacentHTML("beforeend", clone);

  function animate() {
    firstElement.style.marginLeft = `-${i}px`;
    if (i > firstElement.clientWidth) {
      i = 0;
    }
    i += speed;
    requestAnimationFrame(animate);
  }
  animate();
}

function Marqueeltr(selector, speed) {
  const parentSelector = document.querySelector(selector);
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];
  let i = firstElement.clientWidth;
  parentSelector.insertAdjacentHTML("beforeend", clone);
  parentSelector.insertAdjacentHTML("beforeend", clone);

  function animate() {
    firstElement.style.marginLeft = `-${i}px`;
    if (i <= 0) {
      i = firstElement.clientWidth;
    }
    i -= speed;
    requestAnimationFrame(animate);
  }
  animate();
}

window.addEventListener("load", () => {
  Marqueertl(".text1", 0.7);
  Marqueertl(".text3", 0.7);
  Marqueertl(".text5", 0.7);
  Marqueertl(".text7", 0.7);
  Marqueertl(".text9", 0.7);
  Marqueertl(".text11", 0.7);
  Marqueeltr(".text2", 0.7);
  Marqueeltr(".text4", 0.7);
  Marqueeltr(".text6", 0.7);
  Marqueeltr(".text8", 0.7);
  Marqueeltr(".text10", 0.7);
  Marqueeltr(".text12", 0.7);
});

const gradientElement = document.querySelector("#gradient1");

const red = 228;
const green = 235;
const blue = 229;

gradientElement.children[0].setAttribute(
  "style",
  `stop-color: rgba(${red}, 14, 14, 0.9);`
);
gradientElement.children[1].setAttribute(
  "style",
  `stop-color: rgba(9, ${green}, 156, 0.9);`
);
gradientElement.children[2].setAttribute(
  "style",
  `stop-color: rgba(32, 18, ${blue}, 0.9);`
);
gradientElement.children[3].setAttribute(
  "style",
  `stop-color: rgba(192, 168, 168, 0.9);`
);
gradientElement.children[4].setAttribute(
  "style",
  `stop-color: rgba(6, 54, 5, 0.9);`
);

const multGamma = 1.0;
const multBeta = 0.7;
const colorMultiplier = 3;

function initializeMotionAccess() {
  const circle = document.querySelector(".overlay");
  circle.style.display = "none";
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          startGradientEffect();
        } else {
          alert("Permission to access motion data was denied.");
        }
      })
      .catch(console.error);
  } else {
    startGradientEffect();
  }
}

function startMotionHandler(onMotionUpdate) {
  const isMacSafari =
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  if (isMacSafari) {
    let xPosition = 0;
    let yPosition = 0;
    let stepX = 0.1;
    let stepY = 0.1;

    setInterval(() => {
      xPosition += stepX;
      yPosition += stepY;

      if (xPosition >= 5 || xPosition <= -5) stepX = -stepX;
      if (yPosition >= 5 || yPosition <= -5) stepY = -stepY;
      onMotionUpdate(xPosition, yPosition);
    }, 10);
  } else if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (event) => {
      let gamma = event.gamma || 0;
      let beta = event.beta || 0;
      onMotionUpdate(gamma, beta);
    });
  } else {
    alert("Device orientation not supported on this device/browser.");
  }
}

function startGradientEffect() {
  const gradientElement = document.querySelector("#gradient1");
  const svgElement = document.querySelector("#svglogo");

  // Start the motion handler
  startMotionHandler((x, y) => {
    const normalizedX = x / 15; // Increased intensity for more dramatic neon glow
    const normalizedY = y / 15;

    const angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);

    // Calculate shadow offsets for neon-like glow
    const shadowOffsetX = Math.round(Math.cos((angle * Math.PI) / 180) * 25);
    const shadowOffsetY = Math.round(Math.sin((angle * Math.PI) / 180) * 25);

    // Neon-like shadow effect
    svgElement.style.filter = `
      drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 20px rgba(0, 255, 255, 0.8))
      drop-shadow(${-shadowOffsetX}px ${-shadowOffsetY}px 20px rgba(255, 0, 255, 0.8))
      drop-shadow(${shadowOffsetY}px ${-shadowOffsetX}px 30px rgba(255, 255, 0, 0.8))
    `;

    // Adjust gradient colors dynamically for vibrant neon effect
    const vibrantColor = (base, offset) =>
      Math.max(0, Math.min(255, base + offset));
    const color1 = `rgba(${vibrantColor(
      255,
      normalizedX * 100
    )}, 0, ${vibrantColor(128, normalizedY * 100)}, 1)`;
    const color2 = `rgba(0, ${vibrantColor(
      255,
      normalizedY * 100
    )}, ${vibrantColor(255, -normalizedX * 100)}, 1)`;
    const color3 = `rgba(${vibrantColor(
      128,
      -normalizedY * 100
    )}, 0, ${vibrantColor(255, normalizedX * 100)}, 1)`;
    const color4 = `rgba(0, ${vibrantColor(
      128,
      normalizedX * 100
    )}, ${vibrantColor(255, normalizedY * 100)}, 1)`;
    const color5 = `rgba(${vibrantColor(
      255,
      normalizedY * 100
    )}, ${vibrantColor(0, -normalizedX * 100)}, 255, 1)`;

    gradientElement.children[0].setAttribute("stop-color", color1);
    gradientElement.children[1].setAttribute("stop-color", color2);
    gradientElement.children[2].setAttribute("stop-color", color3);
    gradientElement.children[3].setAttribute("stop-color", color4);
    gradientElement.children[4].setAttribute("stop-color", color5);
  });
}

function calculatePosition(degree, radius) {
  const radians = (degree - 60) * (Math.PI / 180);
  return {
    x: radius * Math.cos(radians),
    y: radius * Math.sin(radians),
  };
}

//vanta elm design
document.addEventListener("DOMContentLoaded", function () {
  try {
    VANTA.WAVES({
      el: "#circle-elm",
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x1e8fffc5,
      shininess: 50,
      waveHeight: 20,
      waveSpeed: 1,
    });
  } catch (error) {
    console.error("Vanta initialization error:", error);
  }
});
