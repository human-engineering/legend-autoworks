import React, { useEffect, useState } from 'react'
import { View, Image, } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'

interface ICarouselProps {
  images: string[]
}

function Carousel({ images }: ICarouselProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { mobile } = systemStore
  const { Colors, Fonts, Spacing } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const [currentIndex, setCurrentIndex] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!dimensions.width) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      // Trigger transition
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        setIsTransitioning(false)
      }, 300) // Duration of transition
    }, 3000)

    return () => clearInterval(interval)
  }, [images, dimensions.width])

  const handleLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout
    setDimensions({ width, height })
  }

  return (
    <View
      style={[
        {
          flex: 1,
          overflow: 'hidden'
        }, 
        { backgroundColor: Colors.black }
      ]}
      onLayout={handleLayout}
    >
      <View 
        style={[
          {
            flexDirection: 'row',
            transition: 'transform 300ms ease-out'
          } as any, 
          isTransitioning && {
            transition: 'transform 300ms ease-out'
          } as any,
          { 
            width: images.length * dimensions.width,
            transform: [{ 
              translateX: -currentIndex * dimensions.width 
            }]
          }
        ]}
      >
        {images.map((img, i) => (
          <Image
            key={i}
            source={{ uri: img }}
            style={[
              {resizeMode: 'cover'},
              { 
                width: dimensions.width, 
                height: dimensions.height 
              }
            ]}
          />
        ))}
      </View>
    </View>
  )
}

export default Carousel
