interface SizeGuideEntry {
  size: string;
  chest?: number;
  waist?: number;
  hips?: number;
  length?: number;
}

const sizeGuides: { [key: string]: SizeGuideEntry[] } = {
  camiseta: [
    { size: 'S', chest: 95, waist: 80, hips: 95 },
    { size: 'M', chest: 101, waist: 86, hips: 101 },
    { size: 'L', chest: 107, waist: 92, hips: 107 },
    { size: 'XL', chest: 113, waist: 98, hips: 113 },
  ],
  pantalon: [
    { size: '28', waist: 71, hips: 89 },
    { size: '30', waist: 76, hips: 94 },
    { size: '32', waist: 81, hips: 99 },
    { size: '34', waist: 86, hips: 104 },
  ],
  sudadera: [
    { size: 'S', chest: 100 },
    { size: 'M', chest: 106 },
    { size: 'L', chest: 112 },
    { size: 'XL', chest: 118 },
  ],
}

export function calculateRecommendedSize(
  chest: number,
  waist: number,
  hips: number,
  productType: string
): string | null {
  const guide = sizeGuides[productType]
  if (!guide) {
    return null // No size guide for this product type
  }

  // Find the smallest size that fits all provided measurements
  for (const entry of guide) {
    let fits = true
    if (entry.chest && chest && chest > entry.chest) {
      fits = false
    }
    if (entry.waist && waist && waist > entry.waist) {
      fits = false
    }
    if (entry.hips && hips && hips > entry.hips) {
      fits = false
    }

    if (fits) {
      return entry.size
    }
  }

  // If no size fits, recommend the largest or indicate no fit
  return guide[guide.length - 1]?.size || null // Recommend largest if no smaller fits
}
