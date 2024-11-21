window.addEventListener("load", () => {
  startGradientEffect2();
  startGradientEffect3();
  EnableVanta();
  RotateText();
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
  requestPermissionForiOS();

  const circle = document.querySelector(".overlay");
  circle.style.display = "none";
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          startGradientEffect();
          startGradientEffect2();
          startGradientEffect3();
        } else {
          alert("Permission to access motion data was denied.");
        }
      })
      .catch(console.error);
  } else {
    startGradientEffect();
    startGradientEffect2();
    startGradientEffect3();
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

    // Smooth gradient stop offsets with slight overlap for smooth transitions

    const offset1 = Math.min(100, Math.max(0, 10 + normalizedX * 15));
    const offset2 = Math.min(100, Math.max(0, 25 + normalizedY * 10)); // Reduced spacing for smoother transitions
    const offset3 = Math.min(100, Math.max(0, 50 + normalizedX * 10));
    const offset4 = Math.min(100, Math.max(0, 75 + normalizedY * 15));
    const offset5 = 100;
    // Enhanced color interpolation for better blending
    const color1 = {
      r: Math.round(228 + Math.sin(normalizedX * Math.PI) * 10),
      g: Math.round(14 + Math.sin(normalizedY * Math.PI) * 25),
      b: Math.round(14 + Math.cos(normalizedX * Math.PI) * 35),
    };

    const color2 = {
      r: Math.round(9 + Math.cos(normalizedY * Math.PI) * 25),
      g: Math.round(235 - Math.sin(normalizedX * Math.PI) * 25),
      b: Math.round(156 + Math.sin(normalizedY * Math.PI) * 35),
    };

    const color3 = {
      r: Math.round(32 + Math.sin(normalizedX * Math.PI) * 15),
      g: Math.round(18 + Math.cos(normalizedY * Math.PI) * 25),
      b: Math.round(229 - Math.sin(normalizedX * Math.PI) * 35),
    };

    const color4 = {
      r: Math.round(192 + Math.cos(normalizedX * Math.PI) * 35),
      g: Math.round(168 + Math.sin(normalizedY * Math.PI) * 25),
      b: Math.round(168 - Math.cos(normalizedY * Math.PI) * 15),
    };

    const color5 = {
      r: Math.round(6 + Math.sin(normalizedY * Math.PI) * 35),
      g: Math.round(54 - Math.cos(normalizedX * Math.PI) * 15),
      b: Math.round(5 + Math.sin(normalizedX * Math.PI) * 25),
    };

    // Apply updated colors and offsets to gradient stops
    gradientElements.forEach((gradientElement) => {
      gradientElement.children[0].setAttribute(
        "style",
        `stop-color: rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.95); stop-opacity: 1;`
      );
      gradientElement.children[0].setAttribute("offset", `${offset1}%`);

      gradientElement.children[1].setAttribute(
        "style",
        `stop-color: rgba(${color2.r}, ${color2.g}, ${color2.b}, 0.9); stop-opacity: 1;`
      );
      gradientElement.children[1].setAttribute("offset", `${offset2}%`);

      gradientElement.children[2].setAttribute(
        "style",
        `stop-color: rgba(${color3.r}, ${color3.g}, ${color3.b}, 0.85); stop-opacity: 1;`
      );
      gradientElement.children[2].setAttribute("offset", `${offset3}%`);

      gradientElement.children[3].setAttribute(
        "style",
        `stop-color: rgba(${color4.r}, ${color4.g}, ${color4.b}, 0.9); stop-opacity: 1;`
      );
      gradientElement.children[3].setAttribute("offset", `${offset4}%`);

      gradientElement.children[4].setAttribute(
        "style",
        `stop-color: rgba(${color5.r}, ${color5.g}, ${color5.b}, 0.95); stop-opacity: 1;`
      );
      gradientElement.children[4].setAttribute("offset", `${offset5}%`);
    });
  });
}
function startGradientEffect2() {
  const gradientElements = document.querySelectorAll("#gradient2");

  startMotionHandler((x, y) => {
    // Normalize tilt values and scale sensitivity
    const normalizedX = Math.max(-1, Math.min(1, x / 45)); // Range [-1, 1]
    const normalizedY = Math.max(-1, Math.min(1, y / 45)); // Range [-1, 1]

    const angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);

    // Adjust shadow for dynamic 3D effect
    const shadowOffsetX = Math.round(Math.cos((angle * Math.PI) / 180) * 15); // Increased scale
    const shadowOffsetY = Math.round(Math.sin((angle * Math.PI) / 180) * 15);

    // Smooth gradient stop offsets with slight overlap for smooth transitions
    const offset1 = Math.min(100, Math.max(0, 10 + normalizedX * 12));
    const offset2 = Math.min(100, Math.max(0, 25 + normalizedY * 8)); // Reduced spacing for smoother transitions
    const offset3 = Math.min(100, Math.max(0, 50 + normalizedX * 8));
    const offset4 = Math.min(100, Math.max(0, 75 + normalizedY * 12));
    const offset5 = 100;

    // Static colors
    const colors = ["#f05d83", "yellow", "#3c3c40", "#faacf9", "#824251"];

    // Apply updated colors and offsets to gradient stops
    gradientElements.forEach((gradientElement) => {
      gradientElement.children[0].setAttribute(
        "style",
        `stop-color: ${colors[0]}; stop-opacity: 1;`
      );
      gradientElement.children[0].setAttribute("offset", `${offset1}%`);

      gradientElement.children[1].setAttribute(
        "style",
        `stop-color: ${colors[1]}; stop-opacity: 1;`
      );
      gradientElement.children[1].setAttribute("offset", `${offset2}%`);

      gradientElement.children[2].setAttribute(
        "style",
        `stop-color: ${colors[2]}; stop-opacity: 1;`
      );
      gradientElement.children[2].setAttribute("offset", `${offset3}%`);

      gradientElement.children[3].setAttribute(
        "style",
        `stop-color: ${colors[3]}; stop-opacity: 1;`
      );
      gradientElement.children[3].setAttribute("offset", `${offset4}%`);

      gradientElement.children[4].setAttribute(
        "style",
        `stop-color: ${colors[4]}; stop-opacity: 1;`
      );
      gradientElement.children[4].setAttribute("offset", `${offset5}%`);
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
function updateGradient(tiltX, tiltY) {
  const gradientCircle = document.querySelector(".gradient-circle");

  // Adjust sensitivity by scaling tilt values
  const angleX = (Math.min(Math.max(tiltX, -90), 90) + 90) * 1.5;
  const angleY = (Math.min(Math.max(tiltY, -90), 90) + 90) * 1.5;
  const angle = (angleX * 0.7 + angleY * 0.3) % 360;

  gradientCircle.style.background = `
radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 75%) 50% 50%,
radial-gradient(circle at 50% 50%, rgba(240, 230, 140, 0.3) 0%, rgba(250, 250, 210, 0.2) 30%, rgba(240, 230, 140, 0) 70%) 50% 50%,
linear-gradient(${angle}deg, rgba(255, 154, 158, 0.7), rgba(250, 208, 196, 0.7), rgba(212, 252, 121, 0.7), rgba(150, 230, 161, 0.7), rgba(146, 169, 255, 0.7), rgba(255, 154, 158, 0.7))
`;
}

// Request permission for motion and orientation on iOS
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
    // If not iOS, add the event listener directly
    window.addEventListener("deviceorientation", handleOrientation);
  }
}

function handleOrientation(event) {
  const { beta, gamma } = event; // tilt front/back and left/right
  if (beta !== null && gamma !== null) {
    updateGradient(gamma, beta);
  }
}

if (typeof DeviceOrientationEvent.requestPermission === "function") {
  // document.getElementById("request-permission").style.display = "block";
  document
    .getElementById("request-permission")
    .addEventListener("click", requestPermissionForiOS);
} else {
  // Directly add the event listener on non-iOS devices
  window.addEventListener("deviceorientation", handleOrientation);
}

function EnableVanta() {
  const elm = document.querySelector("#circle-elm");
  elm.style.removeProperty("background-color");
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
}

function RotateText() {
  const elm = document.querySelector("#text");
  elm.style.display = "block";
  const circleType = new CircleType(document.getElementById("text"));

  circleType.radius(45).dir(1);

  const splitter = new GraphemeSplitter();
  new CircleType(
    document.getElementById("text"),
    splitter.splitGraphemes.bind(splitter)
  );
}
function startGradientEffect3() {
  const gradientElements = document.querySelectorAll("#gradient3");

  startMotionHandler((x, y) => {
    // Normalize tilt values and scale sensitivity
    let normalizedX = Math.max(-1, Math.min(1, x / 45)); // Range [-1, 1]
    let normalizedY = Math.max(-1, Math.min(1, y / 45)); // Range [-1, 1]

    const angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);

    // Adjust shadow for neon glow effect
    // const svgElement = document.querySelector("#svglogo");
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
      //   svgElement.style.filter = `
      //   drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 10px ${neonGlowColor}),
      //   drop-shadow(0px 0px 30px ${neonGlowColor}),
      //   drop-shadow(0px 0px 50px ${neonGlowColor})
      // `;

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
