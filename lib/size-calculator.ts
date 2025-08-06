export function calculateSize(chest: number, waist: number, hip: number): string {
  // Define size ranges (example values, adjust as needed)
  const sizes = [
    { name: 'XS', chest: [80, 85], waist: [65, 70], hip: [85, 90] },
    { name: 'S', chest: [86, 91], waist: [71, 76], hip: [91, 96] },
    { name: 'M', chest: [92, 97], waist: [77, 82], hip: [97, 102] },
    { name: 'L', chest: [98, 103], waist: [83, 88], hip: [103, 108] },
    { name: 'XL', chest: [104, 109], waist: [89, 94], hip: [109, 114] },
  ]

  for (const size of sizes) {
    const isChestMatch = chest >= size.chest[0] && chest <= size.chest[1]
    const isWaistMatch = waist >= size.waist[0] && waist <= size.waist[1]
    const isHipMatch = hip >= size.hip[0] && hip <= size.hip[1]

    if (isChestMatch && isWaistMatch && isHipMatch) {
      return size.name
    }
  }

  // If no exact match, find the closest one or suggest custom
  // For simplicity, we'll just return a generic message if no match
  return 'No se encontró una talla exacta. Considera una talla personalizada o consulta la tabla.'
}
