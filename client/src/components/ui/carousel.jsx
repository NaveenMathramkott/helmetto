"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

function Carousel({
  opts,
  plugins,
  orientation = "horizontal",
  setApi,
  className,
  children,
  ...props
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(opts, plugins);
  const [scrollSnaps, setScrollSnaps] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [direction, setDirection] = React.useState("ltr");

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  React.useEffect(() => {
    if (!emblaApi) return;

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
      // In Embla v8, options() is removed. Use the orientation prop instead.
      setDirection(orientation === "horizontal" ? "ltr" : "ttb");
    };
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onScroll = () => setScrollProgress(emblaApi.scrollProgress());

    emblaApi.on("init", onInit);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);

    onInit();

    return () => {
      emblaApi.off("init", onInit);
      emblaApi.off("reInit", onInit);
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    if (setApi) setApi(emblaApi);
  }, [emblaApi, setApi]);

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      ref={emblaRef}
      className={cn(
        "relative overflow-hidden",
        isHorizontal ? "flex" : "flex-col",
        className,
      )}
      {...props}
    >
      <div className={cn("flex", isHorizontal ? "flex-row" : "flex-col")}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                className: cn(
                  "flex-[0_0_100%] min-w-0",
                  isHorizontal ? "min-h-0" : "min-w-0",
                  child.props.className,
                ),
              })
            : child,
        )}
      </div>
      <button
        type="button"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
          isHorizontal ? "left-2" : "top-2 left-1/2 -translate-x-1/2",
        )}
        onClick={scrollPrev}
        disabled={selectedIndex === 0}
        aria-label="Scroll previous"
      >
        {isHorizontal ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5 rotate-90" />
        )}
      </button>
      <button
        type="button"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
          isHorizontal ? "right-2" : "bottom-2 left-1/2 -translate-x-1/2",
        )}
        onClick={scrollNext}
        disabled={selectedIndex === scrollSnaps.length - 1}
        aria-label="Scroll next"
      >
        {isHorizontal ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5 -rotate-90" />
        )}
      </button>
    </div>
  );
}

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex", className)} {...props} />
));
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex min-w-0 shrink-0 grow basis-full", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
      className,
    )}
    {...props}
  />
));
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
      className,
    )}
    {...props}
  />
));
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
