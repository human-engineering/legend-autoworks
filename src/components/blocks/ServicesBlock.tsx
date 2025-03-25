import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Block from './Block'
import { Animated, TouchableOpacity, Image, View, } from 'react-native'
import Text from '../text'

interface IServicesBlockProps {
  order: number,
}
function ServicesBlock({ order, }: IServicesBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { mobile, } = systemStore
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const services = [
    {
      title: 'Wheels',
      subtitle: 'Starting at $109.99',
      description: `
Wheel alignment
Suspension
Steering calibration
Camber & caster adjustment
      `,
      image: 'https://www.shutterstock.com/image-photo/mechanics-using-tools-fix-car-260nw-2490496777.jpg',
    },

    {
      title: 'Brakes',
      subtitle: 'Starting at $199.99',
      description: `
Brake pads
Rotor resurfacing/replacement
ABS diagnostics & repair
Brake line repair
      `,
      image: 'https://www.shutterstock.com/image-photo/brake-pad-repair-car-on-260nw-2493428825.jpg',
    },

    {
      title: 'Tires',
      subtitle: 'Starting at $49.99',
      description: `
Installations & balancing
Tire rotation
Flat tire repair
TPMS service
Seasonal tire changes & storage
      `,
      image: 'https://www.shutterstock.com/image-photo/mechanic-works-tire-repair-shop-260nw-2493428903.jpg',
    },

    {
      title: 'Oil & fluids',
      subtitle: 'Starting at $74.99',
      description: `
Engine oil
Transmission fluid
Coolant flush & replacement
Brake fluid
Power steering
      `,
      image: 'https://www.shutterstock.com/image-photo/car-mechanic-pouring-engine-oil-260nw-2450363423.jpg',
    },

    {
      title: 'Engine repairs',
      subtitle: 'Contact for pricing',
      description: `
Check engine light diagnostics
Spark plugs & ignition coils
Timing belts & chains
Fuel system & injectors
Engine rebuilds & performance tuning
`,
      image: 'https://www.shutterstock.com/image-photo/mechanic-using-wrench-while-working-260nw-2184125681.jpg',
    },
    
    {
      title: 'Custom',
      subtitle: 'Contact for pricing',
      description: `
Performance tuning & ECU remapping
Turbo & supercharger installation
Custom exhaust fabrication
Interior customization (leather seats, LED lighting)
      `,
      image: 'https://www.shutterstock.com/image-photo/hand-car-mechanic-wrench-auto-260nw-2507631219.jpg',
    },
  ]

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
                <View style={{flex: 1,}}>
                  <Image
                    source={{ uri: service.image, }}
                    style={{position: 'absolute', zIndex: -1, width: '100%', height: '100%', resizeMode: 'cover',}}
                  />
                </View>

                <View style={{flex: 1, borderColor: Colors.lightGrey, borderBottomWidth: 0.3,}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.paddingMd,}}>
                    <Text style={{fontSize: Fonts.lg, fontWeight: Fonts.heavyWeight,}}>{service.title} <Text style={{color: expandedIndex === index ? Colors.red : Colors.lightBlue, fontSize: Fonts.sm, fontWeight: Fonts.heavyWeight, bottom: 2,}}>{expandedIndex === index ? ' ▲' : ' ▼'}</Text></Text>
                    <Text style={{color: Colors.safeDarkest, fontSize: Fonts.md, fontWeight: Fonts.featherWeight,}}>{service.subtitle}</Text>
                    {expandedIndex === index &&
                      <Text style={{color: Colors.safeDarker, fontSize: Fonts.md, fontWeight: Fonts.featherWeight, textAlign: 'center',}}>{service.description}</Text>
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
