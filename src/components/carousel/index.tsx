import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
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

  useEffect(() => {
    if (!dimensions.width) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
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
        styles.container, 
        { backgroundColor: Colors.black }
      ]}
      onLayout={handleLayout}
    >
      <View 
        style={[
          styles.carouselContent, 
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
              styles.image,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  carouselContent: {
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'cover'
  }
})

export default Carousel
