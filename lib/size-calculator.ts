interface Measurements {
  chest: number;
  waist: number;
  hips: number;
  inseam: number;
}

// This is a simplified mock for demonstration.
// Real size calculation would involve more complex logic and data.
export function calculateSize(
  gender: 'male' | 'female',
  itemType: 'tshirt' | 'pants' | 'jacket',
  measurements: Measurements
): string {
  const { chest, waist, hips, inseam } = measurements;

  if (isNaN(chest) || isNaN(waist) || isNaN(hips) || isNaN(inseam)) {
    return "Medidas inválidas";
  }

  if (gender === 'male') {
    if (itemType === 'tshirt') {
      if (chest < 90) return 'S';
      if (chest >= 90 && chest < 100) return 'M';
      if (chest >= 100 && chest < 110) return 'L';
      return 'XL';
    } else if (itemType === 'pants') {
      if (waist < 75) return 'S';
      if (waist >= 75 && waist < 85) return 'M';
      if (waist >= 85 && waist < 95) return 'L';
      return 'XL';
    } else if (itemType === 'jacket') {
      if (chest < 95) return 'S';
      if (chest >= 95 && chest < 105) return 'M';
      if (chest >= 105 && chest < 115) return 'L';
      return 'XL';
    }
  } else if (gender === 'female') {
    if (itemType === 'tshirt') {
      if (chest < 85) return 'S';
      if (chest >= 85 && chest < 95) return 'M';
      if (chest >= 95 && chest < 105) return 'L';
      return 'XL';
    } else if (itemType === 'pants') {
      if (waist < 65) return 'S';
      if (waist >= 65 && waist < 75) return 'M';
      if (waist >= 75 && waist < 85) return 'L';
      return 'XL';
    } else if (itemType === 'jacket') {
      if (chest < 90) return 'S';
      if (chest >= 90 && chest < 100) return 'M';
      if (chest >= 100 && chest < 110) return 'L';
      return 'XL';
    }
  }

  return 'N/A'; // No recommendation found
}
