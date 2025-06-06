interface UserMeasurements {
  height: number
  weight: number
  chest: number
  waist: number
  hips: number
  productType: string
  fitPreference: string
}

interface SizeRecommendation {
  recommendedSize: string
  explanation: string
  tips: string[]
  alternativeSize?: string
  alternativeReason?: string
  confidence: number
}

// Tablas de tallas por tipo de producto
const SIZE_CHARTS = {
  camiseta: {
    XS: { chest: [86, 91], waist: [71, 76] },
    S: { chest: [91, 96], waist: [76, 81] },
    M: { chest: [96, 101], waist: [81, 86] },
    L: { chest: [101, 106], waist: [86, 91] },
    XL: { chest: [106, 111], waist: [91, 96] },
    XXL: { chest: [111, 116], waist: [96, 101] },
  },
  hoodie: {
    XS: { chest: [88, 93], waist: [73, 78] },
    S: { chest: [93, 98], waist: [78, 83] },
    M: { chest: [98, 103], waist: [83, 88] },
    L: { chest: [103, 108], waist: [88, 93] },
    XL: { chest: [108, 113], waist: [93, 98] },
    XXL: { chest: [113, 118], waist: [98, 103] },
  },
  pantalon: {
    28: { waist: [71, 74], hips: [86, 89] },
    30: { waist: [76, 79], hips: [91, 94] },
    32: { waist: [81, 84], hips: [96, 99] },
    34: { waist: [86, 89], hips: [101, 104] },
    36: { waist: [91, 94], hips: [106, 109] },
    38: { waist: [96, 99], hips: [111, 114] },
  },
}

export function calculateRecommendedSize(measurements: UserMeasurements): SizeRecommendation {
  const { chest, waist, hips, productType, fitPreference } = measurements

  let recommendedSize = "M"
  let explanation = ""
  let tips: string[] = []
  let alternativeSize: string | undefined
  let alternativeReason: string | undefined
  let confidence = 85

  if (productType === "camiseta" || productType === "hoodie") {
    const chart = SIZE_CHARTS[productType as keyof typeof SIZE_CHARTS]

    // Buscar la talla que mejor se ajuste al pecho
    for (const [size, measurements] of Object.entries(chart)) {
      const chestRange = measurements.chest
      const waistRange = measurements.waist

      if (chest >= chestRange[0] && chest <= chestRange[1]) {
        recommendedSize = size
        break
      }
    }

    // Ajustar según preferencia de ajuste
    if (fitPreference === "ajustado" && recommendedSize !== "XS") {
      const sizes = Object.keys(chart)
      const currentIndex = sizes.indexOf(recommendedSize)
      if (currentIndex > 0) {
        alternativeSize = sizes[currentIndex - 1]
        alternativeReason = "si prefieres un ajuste más ceñido"
      }
    } else if (fitPreference === "holgado" && recommendedSize !== "XXL") {
      const sizes = Object.keys(chart)
      const currentIndex = sizes.indexOf(recommendedSize)
      if (currentIndex < sizes.length - 1) {
        alternativeSize = sizes[currentIndex + 1]
        alternativeReason = "si prefieres un ajuste más holgado"
      }
    }

    explanation = `Basado en tu medida de pecho (${chest}cm), la talla ${recommendedSize} te proporcionará el ajuste ${fitPreference} que buscas.`

    tips = [
      `Tu medida de pecho está en el rango ideal para talla ${recommendedSize}`,
      `El ajuste ${fitPreference} es perfecto para este tipo de prenda`,
      "Recuerda que nuestras prendas están diseñadas con corte regular",
      "Si tienes dudas, puedes contactar a nuestro equipo de soporte",
    ]
  } else if (productType === "pantalon") {
    const chart = SIZE_CHARTS.pantalon

    // Buscar la talla que mejor se ajuste a la cintura
    for (const [size, measurements] of Object.entries(chart)) {
      const waistRange = measurements.waist

      if (waist >= waistRange[0] && waist <= waistRange[1]) {
        recommendedSize = size
        break
      }
    }

    explanation = `Basado en tu medida de cintura (${waist}cm), la talla ${recommendedSize} te dará el ajuste perfecto.`

    tips = [
      `Tu cintura está en el rango perfecto para talla ${recommendedSize}`,
      "Nuestros pantalones tienen un corte moderno y cómodo",
      "El material tiene un ligero stretch para mayor comodidad",
      "Considera el largo según tu altura para el ajuste perfecto",
    ]
  } else if (productType === "gorra") {
    // Para gorras, usar medidas estándar
    if (chest < 56) {
      recommendedSize = "S/M"
    } else {
      recommendedSize = "L/XL"
    }

    explanation = "La mayoría de nuestras gorras son ajustables y se adaptan a diferentes tamaños de cabeza."

    tips = [
      "Nuestras gorras tienen cierre ajustable en la parte trasera",
      "El material es cómodo y transpirable",
      "Perfectas para completar tu look streetwear",
    ]
  }

  // Ajustar confianza basada en qué tan bien encajan las medidas
  if (productType === "camiseta" || productType === "hoodie") {
    const chart = SIZE_CHARTS[productType as keyof typeof SIZE_CHARTS]
    const sizeData = chart[recommendedSize as keyof typeof chart]

    if (sizeData) {
      const chestFit = chest >= sizeData.chest[0] && chest <= sizeData.chest[1]
      const waistFit = waist >= sizeData.waist[0] && waist <= sizeData.waist[1]

      if (chestFit && waistFit) {
        confidence = 95
      } else if (chestFit || waistFit) {
        confidence = 80
      } else {
        confidence = 65
      }
    }
  }

  return {
    recommendedSize,
    explanation,
    tips,
    alternativeSize,
    alternativeReason,
    confidence,
  }
}
