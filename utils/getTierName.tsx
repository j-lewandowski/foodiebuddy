export const getTierName = (rating: number) => {
  if (rating >= 1 && rating <= 2.0) {
    return "F";
  } else if (rating >= 2.1 && rating <= 3.4) {
    return "E";
  } else if (rating >= 3.5 && rating <= 4.9) {
    return "D";
  } else if (rating >= 5.0 && rating <= 6.4) {
    return "C";
  } else if (rating >= 6.5 && rating <= 7.9) {
    return "B";
  } else if (rating >= 8.0 && rating <= 8.9) {
    return "A";
  } else {
    return "S";
  }
};
