'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: "/slider-1.png",
      alt: "Colección de verano 717 Store",
      title: "Nueva Colección de Verano",
      description: "Descubre las últimas tendencias en streetwear para esta temporada.",
      buttonText: "Comprar Ahora",
      link: "/productos",
    },
    {
      id: 2,
      image: "/slider-2.png",
      alt: "Ofertas especiales 717 Store",
      title: "Ofertas Exclusivas",
      description: "No te pierdas nuestros descuentos por tiempo limitado en tus prendas favoritas.",
      buttonText: "Ver Ofertas",
      link: "/productos",
    },
    {
      id: 3,
      image: "/slider-3.png",
      alt: "Estilo urbano 717 Store",
      title: "Define Tu Estilo Urbano",
      description: "Prendas únicas que te harán destacar en la ciudad.",
      buttonText: "Explorar",
      link: "/productos",
    },
  ]

  return (
    <section className="w-full max-w-full overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={slide.id === 1}
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white mb-8 max-w-2xl animate-fade-in-up delay-200">
                    {slide.description}
                  </p>
                  <Button asChild className="animate-fade-in-up delay-400">
                    <Link href={slide.link}>{slide.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
      </Carousel>
    </section>
  )
}
