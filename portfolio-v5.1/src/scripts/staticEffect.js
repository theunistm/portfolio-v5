/**
 * Simple TV static background effect
 * Creates a full-screen canvas with animated noise pattern
 */
export function createStaticEffect({
  container = document.body,
  pixelSize = 2,
  opacity = 0.8,
  contrast = 127,
  fps = 24
} = {}) {
  // Create elements
  const staticWrapper = document.createElement('div');
  staticWrapper.className = 'tv-static-wrapper';
  staticWrapper.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    pointer-events: none;
    opacity: ${opacity};
  `;
  
  // Debug message
  console.log('[Static Effect] Created with:', { pixelSize, opacity, contrast, fps });
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.className = 'static-canvas';
  canvas.style.cssText = `
    display: block;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    mix-blend-mode: normal;
  `;
  
  // Add to DOM
  staticWrapper.appendChild(canvas);
  container.appendChild(staticWrapper);
  
  // Get context and set up
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get canvas context');
    return { destroy: () => staticWrapper.remove() };
  }
  
  // Handle resizing
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Set display size (css pixels)
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    
    // Set actual size in memory (scaled to account for extra pixel density)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    
    // Normalize coordinate system to use css pixels
    ctx.scale(dpr, dpr);
  }
  
  // Draw a frame of static
  function drawStatic() {
    // Scale down for pixelated look
    const w = Math.ceil(canvas.width / (pixelSize * (window.devicePixelRatio || 1)));
    const h = Math.ceil(canvas.height / (pixelSize * (window.devicePixelRatio || 1)));
    
    // Create noise data
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;
    
    // Fill with more authentic TV static pattern
    const pixelCount = w * h;
    const noisePattern = [];
    
    // Calculate extreme values based on contrast
    // Higher contrast means more extreme values (whiter and blacker)
    const minValue = Math.max(1, 60 - contrast/2); // Darker for higher contrast
    const maxValue = Math.min(255, 150 + contrast);  // Whiter for higher contrast
    const range = maxValue - minValue;
    
    // Generate base pattern with horizontal scanning influence
    for (let y = 0; y < h; y++) {
      // Create horizontal scan line effect
      const scanIntensity = Math.sin(y * 0.2) * 20; // More pronounced horizontal wave
      
      for (let x = 0; x < w; x++) {
        // Random base value
        const baseValue = Math.random();
        
        // Apply contrast - push values to extremes
        // Values < 0.5 get pushed down, values > 0.5 get pushed up
        let contrastValue;
        if (baseValue < 0.5) {
          contrastValue = Math.pow(baseValue * 2, 1.5) / 2;
        } else {
          contrastValue = 1 - Math.pow((1 - baseValue) * 2, 1.5) / 2;
        }
        
        // Scale to our range
        let v = minValue + (contrastValue * range);
        
        // Some pixels are brighter (white flecks) - 10% of pixels
        const isBrightSpot = Math.random() < 0.1;
        if (isBrightSpot) {
          v = maxValue - 20 + (Math.random() * 20);
        }
        
        // Apply scanline effect
        v += scanIntensity;
        
        // Keep in valid range
        v = Math.max(minValue, Math.min(maxValue, v));
        
        // Store value
        noisePattern.push(Math.floor(v));
      }
    }
    
    console.log(`Static range: ${minValue}-${maxValue} (contrast: ${contrast})`);
    
    
    // Apply to image data
    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      const v = noisePattern[j];
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = 255; // Alpha always full
    }
    
    // Clear and draw scaled up for pixelation effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create a temporary canvas for the small version
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(imgData, 0, 0);
    
    // Draw the small version scaled up
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, w, h, 0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
  }
  
  // Animation variables
  let animationId = null;
  let lastTime = 0;
  const interval = 1000 / fps;
  
  // Animation loop
  function animate(timestamp) {
    if (!timestamp) timestamp = 0;
    animationId = requestAnimationFrame(animate);
    
    const elapsed = timestamp - lastTime;
    if (elapsed > interval) {
      lastTime = timestamp - (elapsed % interval);
      drawStatic();
    }
  }
  
  // Initial setup
  resize();
  window.addEventListener('resize', resize);
  
  // Start animation
  animate();
  
  // Return control methods
  return {
    setOpacity(value) {
      staticWrapper.style.opacity = value;
    },
    setPixelSize(value) {
      pixelSize = value;
    },
    destroy() {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      staticWrapper.remove();
    }
  };
}
