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
  const gradientElements = document.querySelectorAll("#gradient1");

  // Motion handler for device tilt
  startMotionHandler((x, y) => {
    // Normalize tilt values for smoother transitions
    const normalizedX = x / 45; // Range [-1, 1]
    const normalizedY = y / 45; // Range [-1, 1]

    // Initial base colors
    const baseColors = [
      { r: 255, g: 14, b: 14 }, // Stop 1: Red
      { r: 9, g: 255, b: 156 }, // Stop 2: Green
      { r: 32, g: 18, b: 255 }, // Stop 3: Blue
      { r: 192, g: 168, b: 168 }, // Stop 4: Neutral
      { r: 6, g: 54, b: 5 }, // Stop 5: Dark
    ];

    // Calculate smooth color shifts based on tilt
    const colors = baseColors.map((baseColor, index) => {
      const tiltFactor = index * 0.5; // Create variation among stops
      const shiftR = baseColor.r + Math.sin(normalizedX + tiltFactor) * 20;
      const shiftG = baseColor.g + Math.cos(normalizedY + tiltFactor) * 20;
      const shiftB =
        baseColor.b + Math.sin(normalizedX - normalizedY - tiltFactor) * 20;

      return {
        r: Math.max(0, Math.min(255, Math.round(shiftR))),
        g: Math.max(0, Math.min(255, Math.round(shiftG))),
        b: Math.max(0, Math.min(255, Math.round(shiftB))),
      };
    });

    // Update gradient stops with smoothly adjusted colors
    gradientElements.forEach((gradientElement) => {
      gradientElement.children[0].setAttribute(
        "style",
        `stop-color: rgba(${colors[0].r}, 14, 14, 0.9);`
      );
      gradientElement.children[1].setAttribute(
        "style",
        `stop-color: rgba(9, ${colors[1].g}, 156, 0.9);`
      );
      gradientElement.children[2].setAttribute(
        "style",
        `stop-color: rgba(32, 18, ${colors[2].b}, 0.9);`
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
