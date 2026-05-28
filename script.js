const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const mixButton = document.getElementById('mixButton');
const resultHexOutput = document.getElementById('resultHex');
const resultSwatch = document.getElementById('resultSwatch');
const gradientDisplay = document.getElementById('gradientDisplay');

function normalizeHex(value) {
  const normalized = value.trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(normalized)) {
    return normalized;
  }
  if (/^[0-9a-f]{6}$/.test(normalized)) {
    return `#${normalized}`;
  }
  return null;
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  const hex = (value) => clamp(value).toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function mixColors(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const mixedR = (rgb1.r + rgb2.r) / 2;
  const mixedG = (rgb1.g + rgb2.g) / 2;
  const mixedB = (rgb1.b + rgb2.b) / 2;
  return rgbToHex(mixedR, mixedG, mixedB);
}

function updateDisplay() {
  const color1 = normalizeHex(color1Input.value);
  const color2 = normalizeHex(color2Input.value);

  if (!color1 || !color2) {
    resultHexOutput.textContent = 'Invalid input';
    resultSwatch.style.background = 'repeating-linear-gradient(45deg, #fff 0 10px, #f5f5f5 10px 20px)';
    gradientDisplay.style.background = 'linear-gradient(90deg, #eee, #ccc)';
    return;
  }

  const mixed = mixColors(color1, color2);
  resultHexOutput.textContent = mixed;
  resultSwatch.style.background = mixed;
  gradientDisplay.style.background = `linear-gradient(90deg, ${color1}, ${mixed}, ${color2})`;
}

mixButton.addEventListener('click', updateDisplay);

window.addEventListener('DOMContentLoaded', updateDisplay);
