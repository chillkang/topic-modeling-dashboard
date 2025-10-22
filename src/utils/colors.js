export const TOPIC_COLORS = {
  0: '#3b82f6',  // blue
  1: '#ef4444',  // red
  2: '#f97316',  // orange
  3: '#22c55e',  // green
  4: '#a855f7',  // purple
  5: '#06b6d4',  // cyan
  6: '#ec4899',  // pink
  7: '#f59e0b',  // amber
  8: '#84cc16',  // lime
  9: '#6366f1',  // indigo
  10: '#14b8a6', // teal
  11: '#f43f5e', // rose
  12: '#8b5cf6', // violet
  13: '#0ea5e9', // sky
  14: '#10b981', // emerald
};

export function getContrastColor(backgroundColor) {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
}