import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Block from './Block'
import { Animated, Linking, TouchableOpacity, View, Image, } from 'react-native'
import Text from '../text'
import { address, email, hours, organization, phone } from '../../utils/constants'
import BlurBackground from '../blurBackground'

interface IContactBlockProps {
  order: number,
}
function ContactBlock({ order, }: IContactBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { mobile, } = systemStore
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const cols: Array<Array<any>> = mobile
    ? [
      [
        {
          name: 'Book a service',
          description: `(${phone})`,
          image: 'https://www.shutterstock.com/image-photo/alanya-turkey-may-9-2023-600nw-2305938287.jpg',
          onPress: () => Linking.openURL(`tel:${phone}`),
        },
        {
          name: 'Email us',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetLTJeqehmcL00Q-6Mr5r_DXW21SsE8_CwA&s',
          onPress: () => Linking.openURL(`mailto:${email}`),
        },
      ],
      [
        {
          name: 'Google maps',
          description: `${address}`,
          image: 'https://img.freepik.com/premium-vector/google-map-icon-vector_528910-97.jpg',
          onPress: () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`),
        },
        {
          name: 'Apple maps',
          description: `${address}`,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRya129uQz3S6yZM7_0T-Jm8qgNklN1ruUItQ&s',
          onPress: () => Linking.openURL(`maps://?q=${encodeURIComponent(address)}`),
        },
      ],
      [
        {
          name: 'Hours of operation',
          description: hours,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdY2x21Fdx3RHUEtC2VLUarhnPpY_Vg5I7nA&s',
        },
      ],
    ] : [
    [
      {
        name: 'Book a service',
        description: `(${phone})`,
        image: 'https://www.shutterstock.com/image-photo/alanya-turkey-may-9-2023-600nw-2305938287.jpg',
        onPress: () => Linking.openURL(`tel:${phone}`),
      },
      {
        name: 'Email us',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetLTJeqehmcL00Q-6Mr5r_DXW21SsE8_CwA&s',
        onPress: () => Linking.openURL(`mailto:${email}`),
      },
    ],
    [
      {
        name: 'Google maps',
        description: `${address}`,
        image: 'https://img.freepik.com/premium-vector/google-map-icon-vector_528910-97.jpg',
        onPress: () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`),
      },
      {
        name: 'Apple maps',
        description: `${address}`,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRya129uQz3S6yZM7_0T-Jm8qgNklN1ruUItQ&s',
        onPress: () => Linking.openURL(`maps://?q=${encodeURIComponent(address)}`),
      },
      {
        name: 'Hours of operation',
        description: hours,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdY2x21Fdx3RHUEtC2VLUarhnPpY_Vg5I7nA&s',
      },
    ],
  ]

  const animationsCol = cols.map(() => new Animated.Value(8))
  const animationsRow = cols.map(row => row.map(() => new Animated.Value(8)))
  const handleFocusCol = (index: number, focus: boolean) => {
    Animated.timing(animationsCol[index], {
      toValue: focus ? (mobile ? 10 : 9) : 8,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }
  const handleFocusRow = (colIndex: number, rowIndex: number, focus: boolean) => {
    Animated.timing(animationsRow[colIndex][rowIndex], {
      toValue: focus ? (mobile ? 10 : 9) : 8,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  return (
    <Block order={order}>
      <View style={{flex: 1,}}>
        {cols.map((col, colIndex) => (
          <Animated.View
            key={colIndex}
            onPointerEnter={mobile ? undefined : () => handleFocusCol(colIndex, true)}
            onPointerLeave={mobile ? undefined : () => handleFocusCol(colIndex, false)}
            style={{flex: animationsCol[colIndex], flexDirection: 'row',}}
          >
            {col.map((contact, rowIndex) => (
              <Animated.View
                key={rowIndex}
                onPointerEnter={mobile ? undefined : () => handleFocusRow(colIndex, rowIndex, true)}
                onPointerLeave={mobile ? undefined : () => handleFocusRow(colIndex, rowIndex, false)}
                style={{flex: animationsRow[colIndex][rowIndex],}}
              >
                <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
                  <div
                    onTouchStart={(e) => e.preventDefault()}
                    style={{
                      position: 'absolute', zIndex: 1, width: '100%', height: '100%',
                      pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none',
                    }}
                  />

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => contact.onPress?.()}
                    onPressIn={mobile ? () => {
                      handleFocusCol(colIndex, true)
                      handleFocusRow(colIndex, rowIndex, true)
                    } : undefined}
                    onPressOut={mobile ? () => {
                      handleFocusCol(colIndex, false)
                      handleFocusRow(colIndex, rowIndex, false)
                    } : undefined}
                    style={{
                      width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                      borderColor: Colors.lightGrey, borderWidth: 0.3, backgroundColor: Colors.white,
                      padding: Spacing.paddingMd, overflow: 'hidden',
                    }}
                  >
                    <Text style={{color: Colors.white, fontSize: Fonts.xl, fontWeight: Fonts.heavyWeight, textAlign: 'center',}}>{contact.name}</Text>
                    {contact.description &&
                      <Text style={{color: Colors.white, fontSize: Fonts.lg, fontWeight: Fonts.featherWeight, textAlign: 'center',}}>{contact.description}</Text>
                    }
                    {contact.image &&
                      <>
                        <Image
                          source={{ uri: contact.image, }}
                          style={{position: 'absolute', zIndex: -1, width: '100%', height: '100%', resizeMode: 'cover',}}
                        />

                        <BlurBackground dark={true} zIndex={0} />
                      </>
                    }
                    <View style={{height: 16,}} />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ))}
          </Animated.View>
        ))}
      </View>

      <View style={{flex: 0, flexDirection: 'row', paddingVertical: Spacing.paddingMd, borderColor: Colors.lightGrey, borderTopWidth: 0.3,}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{fontSize: Fonts.sm, fontWeight: Fonts.featherWeight,}}>{organization} Ltd.</Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{fontSize: Fonts.sm, fontWeight: Fonts.featherWeight,}}>All right reserved.</Text>
        </View>
      </View>

      {mobile && <View style={{flex: 0, width: '100%', minHeight: 156,}} />}
    </Block>
  )
}

export default ContactBlock
