import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CarouselContext, useCarousel, type CarouselProps } from "./carousel-context"

type EmblaOptionsType = NonNullable<Parameters<typeof useEmblaCarousel>[0]>

// Main Carousel component
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
        loop: opts?.loop !== undefined ? opts.loop : true, // Enable loop by default for circular scrolling
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((emblaApi: UseEmblaCarouselType[1]) => {
      if (!emblaApi) {
        return
      }

      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      if (api) {
        api.scrollPrev()
      }
    }, [api])

    const scrollNext = React.useCallback(() => {
      if (api) {
        api.scrollNext()
      }
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", () => onSelect(api))
      api.on("select", () => onSelect(api))

      return () => {
        api.off("select", () => onSelect(api))
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

// CarouselContent component - updated to set proper overflow
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-visible">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", 
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

// CarouselItem component
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full p-4",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        "card-partial-visible", // Class for partial visibility styling
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

// CarouselPrevious component - updated for better visibility and position
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-9 w-9 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",
        orientation === "horizontal"
          ? "left-0 top-1/2 -translate-y-1/2" 
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        "embla__button embla__button--prev", 
        className
      )}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      data-carousel-button="prev"
      data-embla-prev
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

// CarouselNext component - updated for better visibility and position
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-9 w-9 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",
        orientation === "horizontal"
          ? "right-0 top-1/2 -translate-y-1/2" 
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        "embla__button embla__button--next", 
        className
      )}
      onClick={scrollNext}
      disabled={!canScrollNext}
      data-carousel-button="next"
      data-embla-next
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

// Export all components
export {
  type UseEmblaCarouselType as CarouselApi,
  type EmblaOptionsType as CarouselOptions,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
}

// Export all the components and types from this single file for now
export * from "./carousel-context"
export * from "./carousel-filters"
