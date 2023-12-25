export const rgbToHex = (r: number, g: number, b: number): string => {
  const index = ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  return index;
};

export const brightnessRGB = (r: number, g: number, b: number): number => {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness;
}
