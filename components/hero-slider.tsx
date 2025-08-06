"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  {
    id: 1,
    image: "/slider-1.png",
    alt: "Nueva Colección de Verano",
    title: "Descubre la Nueva Era del Streetwear",
    description: "Explora nuestra última colección con diseños exclusivos y la mejor calidad.",
    buttonText: "Comprar Ahora",
    buttonLink: "/productos",
  },
  {
    id: 2,
    image: "/slider-2.png",
    alt: "Ofertas Especiales",
    title: "Estilo Único, Precios Irresistibles",
    description: "Aprovecha nuestras ofertas especiales por tiempo limitado en tus prendas favoritas.",
    buttonText: "Ver Ofertas",
    buttonLink: "/productos?category=ofertas",
  },
  {
    id: 3,
    image: "/slider-3.png",
    alt: "Colección de Accesorios",
    title: "Completa tu Look con Nuestros Accesorios",
    description: "Desde gorras hasta mochilas, encuentra el complemento perfecto para tu estilo.",
    buttonText: "Explorar Accesorios",
    buttonLink: "/productos?category=Accesorios",
  },
]

export function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="p-0">
              <Card className="rounded-none border-none">
                <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    priority={slide.id === 1} // Prioritize loading the first image
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4 md:p-8">
                    <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-white text-base md:text-lg mb-8 max-w-2xl drop-shadow-md">
                      {slide.description}
                    </p>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-primary-foreground bg-black/50 hover:bg-black/70 rounded-full p-2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-primary-foreground bg-black/50 hover:bg-black/70 rounded-full p-2" />
    </Carousel>
  )
}
