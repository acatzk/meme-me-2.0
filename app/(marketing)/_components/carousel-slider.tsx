import React from 'react'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'

import { carouselImages } from '~/constant/carouselImages'

export const CarouselSlider = (): JSX.Element => {
  return (
    <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false} showStatus={false}>
      {carouselImages.map((item, index) => (
        <Image
          key={index}
          src={item}
          width={500}
          height={500}
          placeholder="blur"
          loading="lazy"
          blurDataURL={item}
          onError={() => '/images/image-error.png'}
          alt=""
        />
      ))}
    </Carousel>
  )
}
