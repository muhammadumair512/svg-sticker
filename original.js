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

    // Improved color interpolation using sinusoidal blending
    const color1 = {
      r: Math.round(228 + Math.sin(normalizedX * Math.PI) * 30),
      g: Math.round(14 + Math.sin(normalizedY * Math.PI) * 40),
      b: Math.round(14 + Math.cos(normalizedX * Math.PI) * 30),
    };

    const color2 = {
      r: Math.round(9 + Math.cos(normalizedY * Math.PI) * 30),
      g: Math.round(235 - Math.sin(normalizedX * Math.PI) * 30),
      b: Math.round(156 + Math.sin(normalizedY * Math.PI) * 40),
    };

    const color3 = {
      r: Math.round(32 + Math.sin(normalizedX * Math.PI) * 20),
      g: Math.round(18 + Math.cos(normalizedY * Math.PI) * 30),
      b: Math.round(229 - Math.sin(normalizedX * Math.PI) * 40),
    };

    const color4 = {
      r: Math.round(192 + Math.cos(normalizedX * Math.PI) * 40),
      g: Math.round(168 + Math.sin(normalizedY * Math.PI) * 30),
      b: Math.round(168 - Math.cos(normalizedY * Math.PI) * 20),
    };

    const color5 = {
      r: Math.round(6 + Math.sin(normalizedY * Math.PI) * 40),
      g: Math.round(54 - Math.cos(normalizedX * Math.PI) * 20),
      b: Math.round(5 + Math.sin(normalizedX * Math.PI) * 30),
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

// below works only someextent
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
