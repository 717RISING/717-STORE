export function calculateSize(chest: number, waist: number, hip: number, unit: "cm" | "in"): string {
  let c = chest
  let w = waist
  let h = hip

  if (unit === "in") {
    c = chest * 2.54
    w = waist * 2.54
    h = hip * 2.54
  }

  if (c >= 80 && c <= 85 && w >= 65 && w <= 70 && h >= 85 && h <= 90) {
    return "XS"
  } else if (c >= 86 && c <= 91 && w >= 71 && w <= 76 && h >= 91 && h <= 96) {
    return "S"
  } else if (c >= 92 && c <= 97 && w >= 77 && w <= 82 && h >= 97 && h <= 102) {
    return "M"
  } else if (c >= 98 && c <= 103 && w >= 83 && w <= 88 && h >= 103 && h <= 108) {
    return "L"
  } else if (c >= 104 && c <= 109 && w >= 89 && w <= 94 && h >= 109 && h <= 114) {
    return "XL"
  } else {
    return "No se encontró una talla exacta. Por favor, revisa tus medidas o consulta la tabla de tallas."
  }
}
