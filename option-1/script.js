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
  const gradientElements = document.querySelectorAll("#gradient1");

  // Handle motion changes
  startMotionHandler((x, y) => {
    // Normalize tilt values for smooth transitions
    const normalizedX = x / 45; // Range [-1, 1]
    const normalizedY = y / 45; // Range [-1, 1]
    const angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);

    // Dynamic shadow effect
    const svgElement = document.querySelector("#svglogo");
    const shadowOffsetX = Math.round(Math.cos((angle * Math.PI) / 180) * 10);
    const shadowOffsetY = Math.round(Math.sin((angle * Math.PI) / 180) * 10);
    svgElement.style.filter = `drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 10px rgba(0, 0, 0, 0.5))`;

    // Calculate color shift based on tilt
    const shiftFactor = Math.sin(normalizedX + normalizedY) * 100;

    // Base colors for transition (starting colors)
    const baseColors = [
      { r: 255, g: 0, b: 100 }, // Pink
      { r: 255, g: 100, b: 0 }, // Orange
      { r: 255, g: 255, b: 0 }, // Yellow
      { r: 0, g: 255, b: 100 }, // Green
      { r: 0, g: 100, b: 255 }, // Blue
    ];

    // Calculate a smooth color transition for the current tilt
    const activeColor =
      baseColors[
        Math.floor((shiftFactor / 100) * baseColors.length) % baseColors.length
      ];

    // Smooth color transition based on tilt
    const smoothColor = {
      r: Math.round(activeColor.r + shiftFactor),
      g: Math.round(activeColor.g + shiftFactor),
      b: Math.round(activeColor.b + shiftFactor),
    };

    // Ensure color values stay within the valid range [0, 255]
    const constrainedColor = {
      r: Math.max(0, Math.min(255, smoothColor.r)),
      g: Math.max(0, Math.min(255, smoothColor.g)),
      b: Math.max(0, Math.min(255, smoothColor.b)),
    };

    // Apply the smooth color to all gradient stops
    gradientElements.forEach((gradientElement) => {
      // Since we want one single color, set all stops to this color
      gradientElement.children[0].setAttribute(
        "style",
        `stop-color: rgba(${constrainedColor.r}, ${constrainedColor.g}, ${constrainedColor.b}, 1); stop-opacity: 1;`
      );
      gradientElement.children[0].setAttribute("offset", "0%");

      gradientElement.children[1].setAttribute(
        "style",
        `stop-color: rgba(${constrainedColor.r}, ${constrainedColor.g}, ${constrainedColor.b}, 1); stop-opacity: 1;`
      );
      gradientElement.children[1].setAttribute("offset", "25%");

      gradientElement.children[2].setAttribute(
        "style",
        `stop-color: rgba(${constrainedColor.r}, ${constrainedColor.g}, ${constrainedColor.b}, 1); stop-opacity: 1;`
      );
      gradientElement.children[2].setAttribute("offset", "50%");

      gradientElement.children[3].setAttribute(
        "style",
        `stop-color: rgba(${constrainedColor.r}, ${constrainedColor.g}, ${constrainedColor.b}, 1); stop-opacity: 1;`
      );
      gradientElement.children[3].setAttribute("offset", "75%");

      gradientElement.children[4].setAttribute(
        "style",
        `stop-color: rgba(${constrainedColor.r}, ${constrainedColor.g}, ${constrainedColor.b}, 1); stop-opacity: 1;`
      );
      gradientElement.children[4].setAttribute("offset", "100%");
    });
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
