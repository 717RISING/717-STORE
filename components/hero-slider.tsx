"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/slider-1.png",
    alt: "Colección de ropa urbana 717",
    title: "Nueva Colección Urbana",
    description: "Descubre los diseños más frescos para tu estilo.",
    buttonText: "Comprar Ahora",
    buttonLink: "/productos",
  },
  {
    id: 2,
    image: "/slider-2.png",
    alt: "Ofertas especiales en 717 Store",
    title: "Ofertas Exclusivas",
    description: "No te pierdas nuestros descuentos por tiempo limitado.",
    buttonText: "Ver Ofertas",
    buttonLink: "/productos",
  },
  {
    id: 3,
    image: "/slider-3.png",
    alt: "Ropa de alta calidad 717",
    title: "Calidad que Sientes",
    description: "Prendas diseñadas para durar y destacar.",
    buttonText: "Conocer Más",
    buttonLink: "/productos",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000) // Cambia de slide cada 5 segundos
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.alt}
            fill
            priority={index === 0} // Carga prioritaria para la primera imagen
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">{slide.title}</h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up delay-200">
              {slide.description}
            </p>
            <Button
              className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22] text-lg px-8 py-3 rounded-full animate-fade-in-up delay-400"
              asChild
            >
              <a href={slide.buttonLink}>{slide.buttonText}</a>
            </Button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/20 rounded-full p-2 z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/20 rounded-full p-2 z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-gray-400/70 hover:bg-white/70"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
