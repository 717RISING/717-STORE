"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    image: "/slider-1.png",
    alt: "Colección de Verano 717 Store",
    title: "Nueva Colección de Verano",
    description: "Descubre las últimas tendencias y piezas exclusivas para esta temporada.",
    buttonText: "Comprar Ahora",
    link: "/productos",
  },
  {
    id: 2,
    image: "/slider-2.png",
    alt: "Ofertas Especiales 717 Store",
    title: "Ofertas Exclusivas",
    description: "No te pierdas nuestros descuentos por tiempo limitado en artículos seleccionados.",
    buttonText: "Ver Ofertas",
    link: "/productos?filter=ofertas",
  },
  {
    id: 3,
    image: "/slider-3.png",
    alt: "Lanzamientos Recientes 717 Store",
    title: "Lanzamientos Recientes",
    description: "Sé el primero en tener lo más nuevo de 717 Store. ¡Stock limitado!",
    buttonText: "Explorar",
    link: "/productos?filter=nuevos",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.alt}
            fill
            priority={index === 0} // Prioritize loading the first image
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 animate-fade-in-up delay-200">
              {slide.description}
            </p>
            <Button asChild className="bg-[#4A1518] hover:bg-[#6B1E22] text-white text-lg px-8 py-3 animate-fade-in-up delay-400">
              <Link href={slide.link}>{slide.buttonText}</Link>
            </Button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white rounded-full p-2"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white rounded-full p-2"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-3 w-3 rounded-full bg-white transition-all duration-300",
              index === currentSlide ? "w-8 bg-[#4A1518]" : "bg-white/50"
            )}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
