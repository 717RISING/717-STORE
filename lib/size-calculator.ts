interface UserMeasurements {
  gender: "male" | "female" | "unisex"
  height: number // in cm
  weight: number // in kg
  chest: number // in cm
  waist: number // in cm
}

export function calculateRecommendedSize(measurements: UserMeasurements): string {
  const { gender, height, weight, chest, waist } = measurements

  // Base size calculation based on general body mass and height
  let sizeScore = 0

  // Height contribution
  if (height < 160) sizeScore += 1
  else if (height >= 160 && height < 170) sizeScore += 2
  else if (height >= 170 && height < 180) sizeScore += 3
  else if (height >= 180 && height < 190) sizeScore += 4
  else sizeScore += 5

  // Weight contribution
  if (weight < 50) sizeScore += 1
  else if (weight >= 50 && weight < 65) sizeScore += 2
  else if (weight >= 65 && weight < 80) sizeScore += 3
  else if (weight >= 80 && weight < 95) sizeScore += 4
  else sizeScore += 5

  // Chest contribution
  if (chest < 90) sizeScore += 1
  else if (chest >= 90 && chest < 98) sizeScore += 2
  else if (chest >= 98 && chest < 106) sizeScore += 3
  else if (chest >= 106 && chest < 114) sizeScore += 4
  else sizeScore += 5

  // Waist contribution
  if (waist < 75) sizeScore += 1
  else if (waist >= 75 && waist < 83) sizeScore += 2
  else if (waist >= 83 && waist < 91) sizeScore += 3
  else if (waist >= 91 && waist < 99) sizeScore += 4
  else sizeScore += 5

  // Adjustments based on gender (example, can be more complex)
  if (gender === "female") {
    // Female sizes might run slightly smaller or have different proportions
    sizeScore -= 0.5 // Slight adjustment
  } else if (gender === "male") {
    // Male sizes might run slightly larger
    sizeScore += 0.5 // Slight adjustment
  }

  // Map score to sizes
  if (sizeScore <= 6) return "S"
  if (sizeScore <= 10) return "M"
  if (sizeScore <= 14) return "L"
  if (sizeScore <= 18) return "XL"
  return "XXL"
}
