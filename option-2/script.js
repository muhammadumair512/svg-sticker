window.addEventListener("load", () => {
  RotateText();
});
const gradientElements = document.querySelectorAll("#gradient1");

const red = 228;
const green = 235;
const blue = 229;

gradientElements.forEach((gradientElement) => {
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
});

const multGamma = 1.0;
const multBeta = 0.7;
const colorMultiplier = 3;

function initializeMotionAccess() {
  requestPermissionForiOS();
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

    // Using the color palette from the reference CSS
    const color1 = `rgba(${vibrantColor(
      255,
      normalizedX * 100
    )}, 0, ${vibrantColor(128, normalizedY * 100)}, 1)`; // Neon Magenta
    const color2 = `rgba(0, ${vibrantColor(
      255,
      normalizedY * 100
    )}, ${vibrantColor(255, -normalizedX * 100)}, 1)`; // Neon Cyan
    const color3 = `rgba(${vibrantColor(
      255,
      normalizedY * 100
    )}, ${vibrantColor(255, -normalizedX * 100)}, 0, 0.8)`; // Neon Yellow
    const color4 = `rgba(${vibrantColor(
      255,
      -normalizedY * 100
    )}, 0, ${vibrantColor(255, normalizedX * 100)}, 1)`; // Neon Red
    const color5 = `rgba(${vibrantColor(
      255,
      normalizedX * 100
    )}, ${vibrantColor(0, -normalizedY * 100)}, 255, 1)`; // Neon Blue

    gradientElement.children[0].setAttribute("stop-color", color1);
    gradientElement.children[1].setAttribute("stop-color", color2);
    gradientElement.children[2].setAttribute("stop-color", color3);
    gradientElement.children[3].setAttribute("stop-color", color4);
    gradientElement.children[4].setAttribute("stop-color", color5);

    // Neon text pulse effect (Optional, if you want to add neon text like the reference)
    const neonText = document.querySelector(".neon-text");
    if (neonText) {
      neonText.style.textShadow = `
        0 0 15px ${color1}, 
        0 0 30px ${color2}, 
        0 0 40px ${color3}, 
        0 0 50px ${color4}, 
        0 0 60px ${color5}`;
    }
  });
}

// script for diagonal text move

function calculatePosition(degree, radius) {
  const radians = (degree - 60) * (Math.PI / 180);
  return {
    x: radius * Math.cos(radians),
    y: radius * Math.sin(radians),
  };
}

function updateGradient(tiltX, tiltY) {
  const gradientCircle = document.querySelector(".gradient-circle");

  const angleX = (Math.min(Math.max(tiltX, -90), 90) + 90) * 1.5;
  const angleY = (Math.min(Math.max(tiltY, -90), 90) + 90) * 1.5;
  const angle = (angleX * 0.7 + angleY * 0.3) % 360;

  gradientCircle.style.background = `
radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 75%) 50% 50%,
radial-gradient(circle at 50% 50%, rgba(240, 230, 140, 0.3) 0%, rgba(250, 250, 210, 0.2) 30%, rgba(240, 230, 140, 0) 70%) 50% 50%,
linear-gradient(${angle}deg, rgba(255, 154, 158, 0.7), rgba(250, 208, 196, 0.7), rgba(212, 252, 121, 0.7), rgba(150, 230, 161, 0.7), rgba(146, 169, 255, 0.7), rgba(255, 154, 158, 0.7))
`;
}

function requestPermissionForiOS() {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
          document.getElementById("request-permission").style.display = "none";
        } else {
          alert("Permission to access motion data was denied.");
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("deviceorientation", handleOrientation);
  }
}

function handleOrientation(event) {
  const { beta, gamma } = event;
  if (beta !== null && gamma !== null) {
    updateGradient(gamma, beta);
  }
}

// Check for iOS and show the permission request button if needed
if (typeof DeviceOrientationEvent.requestPermission === "function") {
  document.getElementById("request-permission").style.display = "block";
  document
    .getElementById("request-permission")
    .addEventListener("click", requestPermissionForiOS);
} else {
  // Directly add the event listener on non-iOS devices
  window.addEventListener("deviceorientation", handleOrientation);
}

function RotateText() {
  const elm = document.querySelector("#text");
  elm.style.display = "block";
  const circleType = new CircleType(document.getElementById("text"));

  circleType.radius(45).dir(1);

  // @see https://github.com/orling/grapheme-splitter
  const splitter = new GraphemeSplitter();
  new CircleType(
    document.getElementById("text"),
    splitter.splitGraphemes.bind(splitter)
  );
}
