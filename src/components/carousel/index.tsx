import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, Image, Easing } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'

interface ICarouselProps {
  images: string[]
}

function Carousel({ images }: ICarouselProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { mobile } = systemStore
  const { Colors } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const translateX = useRef(new Animated.Value(0)).current
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const animate = (toValue: number) => {
    Animated.timing(translateX, {
      toValue: -toValue,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    if (!width) return

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length
      setCurrentIndex(nextIndex)
      animate(nextIndex * width)
    }, 3000)

    return () => clearInterval(interval)
  }, [images, width, currentIndex])

  return (
    <View
      style={{flex: 1, overflow: 'hidden', backgroundColor: Colors.black}}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout
        setWidth(width)
        setHeight(height)
      }}
    >
      <Animated.View 
        style={{
          flexDirection: 'row', 
          width: images.length * width,
          transform: [{translateX}]
        }}
      >
        {images.map((img, i) => (
          <Image
            key={i}
            source={{ uri: img }}
            style={{
              width: width, 
              height: height, 
              resizeMode: 'cover'
            }}
          />
        ))}
      </Animated.View>
    </View>
  )
}

export default Carousel
