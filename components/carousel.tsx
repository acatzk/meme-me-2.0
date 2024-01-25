import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState, useEffect, ReactNode, FC, ComponentProps } from 'react'

type CarouselProps = {
  children: ReactNode[]
  autoSlide?: boolean
  autoSlideInterval?: number
}

export const Carousel: FC<CarouselProps> = (props): JSX.Element => {
  const { children: slides, autoSlide = false, autoSlideInterval = 3000 } = props

  const [curr, setCurr] = useState<number>(0)

  const prev = (): void => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  }
  const next = (): void => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
  }

  useEffect(() => {
    if (autoSlide !== undefined) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return (): void => {
      clearInterval(slideInterval)
    }
  }, [])

  const isSingleItem = slides?.length > 1

  return (
    <div className="group relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      {isSingleItem && (
        <div
          className={clsx(
            'opacity-0 transition-all  ease-in-out group-hover:opacity-100',
            'absolute inset-0 flex items-center justify-between p-4 duration-200'
          )}
        >
          <ArrowBtn onClick={prev}>
            <ChevronLeft className="h-4 w-4" />
          </ArrowBtn>
          <ArrowBtn onClick={next}>
            <ChevronRight className="h-4 w-4" />
          </ArrowBtn>
        </div>
      )}

      {isSingleItem && (
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={clsx(
                  'h-1.5 w-1.5 rounded-full bg-white transition-all',
                  curr === i ? 'p-0.5' : 'bg-opacity-50'
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

type ArrowBtnProps = {
  children: ReactNode
} & ComponentProps<'button'>

const ArrowBtn: FC<ArrowBtnProps> = ({ children, ...rest }): JSX.Element => {
  return (
    <button
      type="button"
      {...rest}
      className={clsx(
        'rounded-full bg-white/80 p-1 text-core-secondary shadow',
        'outline-none transition duration-150 ease-in-out hover:bg-white'
      )}
    >
      {children}
    </button>
  )
}
