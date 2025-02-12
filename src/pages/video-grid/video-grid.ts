export const perColumn = 4;
export const aspectRatio = 16 / 9;

export const calculateColumnCount = (width: number) =>
  width < 768 ? 1 : width < 1024 ? 2 : width < 1480 ? 3 : 4;
