window.addEventListener("load", () => {
  startGradientEffect2();
  handleOrientation();
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

  startMotionHandler((x, y) => {
    // Normalize tilt values and scale sensitivity
    let normalizedX = Math.max(-1, Math.min(1, x / 45)); // Range [-1, 1]
    let normalizedY = Math.max(-1, Math.min(1, y / 45)); // Range [-1, 1]

    const angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);

    // Adjust shadow for neon glow effect
    const svgElement = document.querySelector("#svglogo");
    const shadowOffsetX = Math.round(Math.cos((angle * Math.PI) / 180) * 15);
    const shadowOffsetY = Math.round(Math.sin((angle * Math.PI) / 180) * 15);

    // Generate dynamic neon color
    gradientElements.forEach((gradientElement, index) => {
      let neonColor;
      neonColor = {
        r: Math.round(255 - normalizedX * 128), // Bright range for red
        g: Math.round(100 + normalizedY * 155), // Bright range for green
        b: Math.round(200 + normalizedX * 55), // Bright range for blue
      };
      // console.log(neonColor);
      const neonGlowColor = `rgba(${neonColor.r}, ${neonColor.g}, ${neonColor.b}, 0.9)`;

      // Apply dynamic neon glow using drop-shadow
      svgElement.style.filter = `
      drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 10px ${neonGlowColor}),
      drop-shadow(0px 0px 30px ${neonGlowColor}),
      drop-shadow(0px 0px 50px ${neonGlowColor})
    `;

      // Apply neon effect to gradient colors dynamically
      gradientElement.children[0].setAttribute(
        "style",
        `stop-color: ${neonGlowColor}; stop-opacity: 1;`
      );
      gradientElement.children[0].setAttribute("offset", "10%");

      gradientElement.children[1].setAttribute(
        "style",
        `stop-color: ${neonGlowColor}; stop-opacity: 0.8;`
      );
      gradientElement.children[1].setAttribute("offset", "50%");

      gradientElement.children[2].setAttribute(
        "style",
        `stop-color: ${neonGlowColor}; stop-opacity: 0.6;`
      );
      gradientElement.children[2].setAttribute("offset", "90%");
    });
  });
}
function startGradientEffect2() {
  const gradientElements = document.querySelectorAll("#gradient2");

  startMotionHandler((x, y) => {
    // Normalize tilt values and scale sensitivity
    let normalizedX = Math.max(-1, Math.min(1, x / 45)); // Range [-1, 1]
    let normalizedY = Math.max(-1, Math.min(1, y / 45)); // Range [-1, 1]

    const angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);

    // Adjust shadow for neon glow effect
    const svgElement = document.querySelector("#svglogo");
    const shadowOffsetX = Math.round(Math.cos((angle * Math.PI) / 180) * 15);
    const shadowOffsetY = Math.round(Math.sin((angle * Math.PI) / 180) * 15);

    // Generate dynamic neon color
    gradientElements.forEach((gradientElement, index) => {
      let neonColor;
      neonColor = {
        r: Math.round(255 - normalizedX * 0), // Bright range for red
        g: Math.round(18 + normalizedY * 155), // Bright range for green
        b: Math.round(150 + normalizedX * 200), // Bright range for blue
      };
      // console.log(neonColor);
      const neonGlowColor = `rgba(${neonColor.r}, ${neonColor.g}, ${neonColor.b}, 0.9)`;

      // Apply dynamic neon glow using drop-shadow
      svgElement.style.filter = `
      drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 10px ${neonGlowColor}),
      drop-shadow(0px 0px 30px ${neonGlowColor}),
      drop-shadow(0px 0px 50px ${neonGlowColor})
    `;

      // Apply neon effect to gradient colors dynamically
      gradientElement.children[0].setAttribute(
        "style",
        `stop-color: ${neonGlowColor}; stop-opacity: 1;`
      );
      gradientElement.children[0].setAttribute("offset", "10%");

      gradientElement.children[1].setAttribute(
        "style",
        `stop-color: ${neonGlowColor}; stop-opacity: 0.8;`
      );
      gradientElement.children[1].setAttribute("offset", "50%");

      gradientElement.children[2].setAttribute(
        "style",
        `stop-color: ${neonGlowColor}; stop-opacity: 0.6;`
      );
      gradientElement.children[2].setAttribute("offset", "90%");
    });
  });
}

// Call the function to start the neon effect

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
// Initialize variables for tilt values and gradient angle
let gradientAngle = 45; // Default gradient angle

// Function to update the gradient dynamically
function updateGradient() {
  // Create a new gradient direction based on the current angle
  const gradientDirection = `linear-gradient(${gradientAngle}deg, #ff7eb3, #ff758c, #f9d423, #ff4e50)`;

  // Apply the gradient direction to each h7 element inside .marquee-text
  document.querySelectorAll(".marquee-text h7").forEach((element) => {
    element.style.backgroundImage = gradientDirection;
  });
}

// Function to handle device tilt (orientation) changes
function handleOrientation(event) {
  if (event && event.beta !== null && event.gamma !== null) {
    // `beta` is front-to-back tilt (-180 to 180)
    // `gamma` is left-to-right tilt (-90 to 90)

    // Normalize values for gradient angle calculation
    const tiltX = event.gamma; // Left-to-right tilt
    const tiltY = event.beta; // Front-to-back tilt

    // Map tilt values to gradient angles (0 to 360 degrees)
    gradientAngle = Math.round((tiltX + 90) % 360);

    // Update the gradient based on the new angle
    updateGradient();
  }
}

// Add event listener for device orientation
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", handleOrientation, true);
} else {
  console.log("DeviceOrientationEvent is not supported on this device.");
}

// Initialize the gradient on page load
// updateGradient();
