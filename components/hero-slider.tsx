'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const slides = [
  {
    id: 1,
    imageUrl: '/slider-1.png',
    alt: 'Nueva Colección de Verano',
    title: 'Nueva Colección de Verano',
    description: 'Descubre las últimas tendencias para esta temporada.',
    buttonText: 'Comprar Ahora',
    buttonLink: '/productos',
  },
  {
    id: 2,
    imageUrl: '/slider-2.png',
    alt: 'Ofertas Exclusivas',
    title: 'Ofertas Exclusivas',
    description: 'No te pierdas nuestros descuentos por tiempo limitado.',
    buttonText: 'Ver Ofertas',
    buttonLink: '/productos',
  },
  {
    id: 3,
    imageUrl: '/slider-3.png',
    alt: 'Estilo Urbano',
    title: 'Estilo Urbano',
    description: 'Prendas únicas para tu look diario.',
    buttonText: 'Explorar',
    buttonLink: '/productos',
  },
]

export default function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <section className="relative w-full max-w-full mx-auto overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="p-1">
                <Card className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-none overflow-hidden">
                  <Image
                    src={slide.imageUrl || "/placeholder.svg"}
                    alt={slide.alt}
                    fill
                    priority={slide.id === 1}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover"
                  />
                  <CardContent className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/30 text-white p-4 md:p-8">
                    <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-base md:text-xl mb-4 md:mb-6 max-w-2xl drop-shadow-md">
                      {slide.description}
                    </p>
                    <Button asChild size="lg" className="text-lg px-6 py-3">
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </section>
  )
}
