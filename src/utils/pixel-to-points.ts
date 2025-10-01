export const pixelsToPoints = (px: number) => {
  if (px <= 0) {
    throw new Error("Value must be greater than 0.");
  }

  return px * (72 / 96);
};
