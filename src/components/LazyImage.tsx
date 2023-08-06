import React, { useEffect, useRef } from 'react'

interface LazyImageProps {
  src: string
  alt: string
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && imageRef.current) {
          // Load the image when it becomes visible
          imageRef.current.src = src
          imageRef.current.classList.add('lazy-image--loaded')
          if (observer.current) {
            observer.current.unobserve(entry.target) // Unobserve after loading
          }
        }
      })
    }

    observer.current = new IntersectionObserver(handleIntersect, options)

    if (imageRef.current) {
      observer.current.observe(imageRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect() // Disconnect the observer when the component unmounts
      }
    }
  }, [src])

  return <img ref={imageRef} className={`lazy-image`} src='' alt={alt} />
}

export default LazyImage
