// single color

function startGradientEffect() {
  const neonElements = document.querySelectorAll("#gradient1");

  startMotionHandler((x, y) => {
    // Normalize tilt values and scale sensitivity
    const normalizedX = Math.max(-1, Math.min(1, x / 45)); // Range [-1, 1]
    const normalizedY = Math.max(-1, Math.min(1, y / 45)); // Range [-1, 1]

    const angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);

    // Neon effect parameters
    const shadowOffsetX = Math.round(Math.cos((angle * Math.PI) / 180) * 15);
    const shadowOffsetY = Math.round(Math.sin((angle * Math.PI) / 180) * 15);

    // Dynamic neon color based on tilt
    const neonColor = {
      r: Math.round((255 * (1 + normalizedX)) / 2), // Red: stronger with right tilt
      g: Math.round((255 * (1 + normalizedY)) / 2), // Green: stronger with upward tilt
      b: 255, // Fixed blue for a neon blue base
    };

    const neonGlowColor = `rgba(${neonColor.r}, ${neonColor.g}, ${neonColor.b}, 1)`;
    const shadowGlow = `${shadowOffsetX}px ${shadowOffsetY}px 20px ${neonGlowColor}, 0px 0px 30px ${neonGlowColor}`;

    // Apply the neon glow effect to each gradient element
    neonElements.forEach((element) => {
      element.style.filter = `drop-shadow(${shadowGlow})`;
    });

    // If there's an SVG logo, apply the same neon effect
    const svgElement = document.querySelector("#svglogo");
    if (svgElement) {
      svgElement.style.filter = `drop-shadow(${shadowGlow})`;
    }
  });
}
