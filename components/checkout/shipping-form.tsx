import { useFormContext } from "react-hook-form"

const departamentos = [
  "Amazonas",
  "Antioquia",
  "Arauca",
  "Atlántico",
  "Bolívar",
  "Boyacá",
  "Caldas",
  "Caquetá",
  "Casanare",
  "Cauca",
  "Cesar",
  "Chocó",
  "Córdoba",
  "Cundinamarca",
  "Guainía",
  "Guaviare",
  "Huila",
  "La Guajira",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte de Santander",
  "Putumayo",
  "Quindío",
  "Risaralda",
  "San Andrés y Providencia",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle del Cauca",
  "Vaupés",
  "Vichada",
  "Bogotá D.C.",
]

const shippingOptions = [
  { id: "standard", name: "Envío Estándar (5-7 días)", price: 25000 },
  { id: "express", name: "Envío Express (2-3 días)", price: 35000 },
  { id: "overnight", name: "Envío Inmediato (1 día)", price: 50000 },
]

const ShippingForm = () => {
  const { register } = useFormContext()

  return (
    <div>
      <h2>Información de Envío</h2>
      <div>
        <label htmlFor="firstName">Nombre:</label>
        <input type="text" id="firstName" {...register("firstName", { required: true })} />
      </div>
      <div>
        <label htmlFor="lastName">Apellido:</label>
        <input type="text" id="lastName" {...register("lastName", { required: true })} />
      </div>
      <div>
        <label htmlFor="address">Dirección:</label>
        <input type="text" id="address" {...register("address", { required: true })} />
      </div>
      <div>
        <label htmlFor="city">Ciudad:</label>
        <input type="text" id="city" {...register("city", { required: true })} />
      </div>
      <div>
        <label htmlFor="departamento">Departamento:</label>
        <select id="departamento" {...register("departamento", { required: true })}>
          {departamentos.map((departamento) => (
            <option key={departamento} value={departamento}>
              {departamento}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="postalCode">Código Postal:</label>
        <input type="text" id="postalCode" {...register("postalCode", { required: true })} />
      </div>
      <div>
        <label htmlFor="phone">Teléfono:</label>
        <input type="tel" id="phone" {...register("phone", { required: true })} />
      </div>
      <div>
        <label htmlFor="shippingOption">Opción de Envío:</label>
        <select id="shippingOption" {...register("shippingOption", { required: true })}>
          {shippingOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} - ${option.price}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ShippingForm
