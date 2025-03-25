import React from 'react'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Block from './Block'
import { Linking, TouchableOpacity, View } from 'react-native'
import { aboutCopy, carouselImages, phone, serviceCopy } from '../../utils/constants'
import Carousel from '../carousel'
import Text from '../text'

interface IAboutBlockProps {
  order: number,
}
function AboutBlock({ order, }: IAboutBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { mobile, } = systemStore
  const { Colors, Fonts, Spacing, } = mobile ? systemStore.Mobile : systemStore.Desktop

  return (
    <Block order={order}>
      {mobile ? <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <View style={{padding: Spacing.padding,}}>
            <Text style={{fontSize: Fonts.xl, fontWeight: Fonts.heavyWeight,}}>ABOUT US</Text>
            <Text style={{fontSize: Fonts.lg, marginBottom: 12,}}>{aboutCopy}</Text>
            <Text style={{fontSize: Fonts.xl, fontWeight: Fonts.heavyWeight,}}>WHAT WE DO</Text>
            <Text style={{fontSize: Fonts.lg,}}>{serviceCopy}</Text>
          </View>

          <TouchableOpacity
            onPress={() => Linking.openURL(phone)}
            style={{
              backgroundColor: Colors.lightBlue, borderRadius: 32, paddingHorizontal: 32, paddingVertical: 8,
              marginTop: -16, marginBottom: 32,
            }}
          >
            <Text style={{color: Colors.white, fontSize: Fonts.md, fontWeight: Fonts.heavyWeight,}}>Call Now</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1,}}>
          <Carousel images={carouselImages} />
        </View>
      </> : <>
        <View style={{flex: 1, flexDirection: 'row',}}>
          <View style={{flex: 1,}}>
            <Carousel images={carouselImages.slice(0, carouselImages.length / 2)} />
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <View style={{padding: Spacing.padding,}}>
              <Text style={{fontSize: Fonts.xl, fontWeight: Fonts.heavyWeight,}}>ABOUT US</Text>
              <Text style={{color: Colors.safeDarker, fontSize: Fonts.sm, fontWeight: Fonts.cruiserWeight,}}>{aboutCopy}</Text>
            </View>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row',}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <View style={{padding: Spacing.padding,}}>
              <Text style={{fontSize: Fonts.xl, fontWeight: Fonts.heavyWeight,}}>WHAT WE DO</Text>
              <Text style={{color: Colors.safeDarker, fontSize: Fonts.sm, fontWeight: Fonts.cruiserWeight,}}>{serviceCopy}</Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.lightBlue, borderRadius: 32, paddingHorizontal: 32, paddingVertical: 8,
                marginTop: -16, marginBottom: 32,
              }}
            >
              <Text style={{color: Colors.white, fontSize: Fonts.md, fontWeight: Fonts.heavyWeight,}}>Call Now</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1,}}>
            <Carousel images={carouselImages.slice(carouselImages.length / 2, carouselImages.length)} />
          </View>
        </View>
      </>}
    </Block>
  )
}

export default AboutBlock
