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

  startMotionHandler((x, y) => {
    // Normalize tilt values and scale sensitivity
    const normalizedX = Math.max(-1, Math.min(1, x / 45)); // Range [-1, 1]
    const normalizedY = Math.max(-1, Math.min(1, y / 45)); // Range [-1, 1]

    const angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);

    // Adjust shadow for dynamic 3D effect
    const svgElement = document.querySelector("#svglogo");
    const shadowOffsetX = Math.round(Math.cos((angle * Math.PI) / 180) * 15); // Increased scale
    const shadowOffsetY = Math.round(Math.sin((angle * Math.PI) / 180) * 15);
    svgElement.style.filter = `drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 10px rgba(0, 0, 0, 0.5))`;

    // Smooth gradient stop offsets
    const offset1 = Math.min(100, Math.max(0, 10 + normalizedX * 20));
    const offset2 = Math.min(100, Math.max(0, 30 + normalizedY * 20));
    const offset3 = Math.min(100, Math.max(0, 50 + normalizedX * 20));
    const offset4 = Math.min(100, Math.max(0, 70 + normalizedY * 20));
    const offset5 = 100;

    // Improved color interpolation using sinusoidal and blended smoothing
    const blendFactor = (val1, val2, weight) =>
      Math.round(val1 * (1 - weight) + val2 * weight);

    const color1 = {
      r: blendFactor(228, 255, Math.abs(normalizedX)),
      g: blendFactor(14, 128, Math.abs(normalizedY)),
      b: blendFactor(14, 200, Math.abs(normalizedX)),
    };

    const color2 = {
      r: blendFactor(9, 128, Math.abs(normalizedY)),
      g: blendFactor(235, 200, Math.abs(normalizedX)),
      b: blendFactor(156, 220, Math.abs(normalizedY)),
    };

    const color3 = {
      r: blendFactor(32, 100, Math.abs(normalizedX)),
      g: blendFactor(18, 120, Math.abs(normalizedY)),
      b: blendFactor(229, 250, Math.abs(normalizedX)),
    };

    const color4 = {
      r: blendFactor(192, 230, Math.abs(normalizedX)),
      g: blendFactor(168, 190, Math.abs(normalizedY)),
      b: blendFactor(168, 180, Math.abs(normalizedY)),
    };

    const color5 = {
      r: blendFactor(6, 80, Math.abs(normalizedY)),
      g: blendFactor(54, 100, Math.abs(normalizedX)),
      b: blendFactor(5, 150, Math.abs(normalizedX)),
    };

    // Apply updated colors and offsets to gradient stops
    gradientElements.forEach((gradientElement) => {
      gradientElement.children[0].setAttribute(
        "style",
        `stop-color: rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.9); stop-opacity: 1;`
      );
      gradientElement.children[0].setAttribute("offset", `${offset1}%`);

      gradientElement.children[1].setAttribute(
        "style",
        `stop-color: rgba(${color2.r}, ${color2.g}, ${color2.b}, 0.9); stop-opacity: 1;`
      );
      gradientElement.children[1].setAttribute("offset", `${offset2}%`);

      gradientElement.children[2].setAttribute(
        "style",
        `stop-color: rgba(${color3.r}, ${color3.g}, ${color3.b}, 0.9); stop-opacity: 1;`
      );
      gradientElement.children[2].setAttribute("offset", `${offset3}%`);

      gradientElement.children[3].setAttribute(
        "style",
        `stop-color: rgba(${color4.r}, ${color4.g}, ${color4.b}, 0.9); stop-opacity: 1;`
      );
      gradientElement.children[3].setAttribute("offset", `${offset4}%`);

      gradientElement.children[4].setAttribute(
        "style",
        `stop-color: rgba(${color5.r}, ${color5.g}, ${color5.b}, 0.9); stop-opacity: 1;`
      );
      gradientElement.children[4].setAttribute("offset", `${offset5}%`);
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
