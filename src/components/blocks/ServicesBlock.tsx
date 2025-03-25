import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Block from './Block'
import { Animated, TouchableOpacity, Image, View, } from 'react-native'
import Text from '../text'
import { services, } from '../../utils/constants'

interface IServicesBlockProps {
  order: number,
}
function ServicesBlock({ order, }: IServicesBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { mobile, } = systemStore
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const animations = useRef(services.map(() => new Animated.Value(2))).current
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handlePress = (index: number) => {
    const newIndex = expandedIndex === index ? null : index
    setExpandedIndex(newIndex)
    animations.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === newIndex ? (mobile ? 4 : 5) : 2,
        duration: 200,
        useNativeDriver: false,
      }).start()
    })
  }

  return (
    <Block order={order}>
      {services.map((service, index) => {
        return (
          <Animated.View
            key={index}
            style={{flex: animations[index],}}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handlePress(index)}
              style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', overflow: 'hidden',}}
            >                    
              <div
                onTouchStart={(e) => e.preventDefault()}
                style={{
                  position: 'absolute', zIndex: 1, width: '100%', height: '100%',
                  pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none',
                }}
              />

              <View style={{width: '100%', height: '100%', flexDirection: 'row',}}>
                <View style={{flex: 1, borderColor: Colors.black, borderBottomWidth: index === services.length - 1 ? 0 : 2,}}>
                  <Image
                    source={{ uri: service.image, }}
                    style={{position: 'absolute', zIndex: -1, width: '100%', height: '100%', resizeMode: 'cover',}}
                  />
                </View>

                <View style={{flex: 1, borderColor: Colors.lightGrey, borderTopWidth: 0.3,}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.paddingMd,}}>
                    <Text style={{fontSize: Fonts.lg, fontWeight: Fonts.heavyWeight,}}>{service.title} <Text style={{color: expandedIndex === index ? Colors.red : Colors.lightBlue, fontSize: Fonts.sm, fontWeight: Fonts.heavyWeight, bottom: 2,}}>{expandedIndex === index ? ' ▲' : ' ▼'}</Text></Text>
                    <Text style={{color: Colors.safeDarker, fontSize: Fonts.md, fontWeight: Fonts.featherWeight,}}>{service.subtitle}</Text>
                    {expandedIndex === index &&
                      <Text style={{color: Colors.safeDarker, fontSize: Fonts.md, fontWeight: Fonts.cruiserWeight, textAlign: 'center',}}>{service.description}</Text>
                    }
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )
      })}
    </Block>
  )
}

export default ServicesBlock
