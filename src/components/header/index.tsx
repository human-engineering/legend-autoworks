import React, { } from 'react'
import { Dimensions, TouchableOpacity, View, } from 'react-native'
import { IStores } from '../../state/store'
import { useSelector } from 'react-redux'
import Text from '../text'
import BlurBackground from '../blurBackground'

interface IHeaderProps {
  masterRef?: any,
}
function Header({ masterRef, }: IHeaderProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { mobile, minHeight, } = systemStore
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const handleScroll = (index: number) => {
    masterRef.current.scrollTop = (Dimensions.get('window').height > minHeight ? Dimensions.get('window').height : minHeight) * index
  }

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999, width: '100%',}}>
        <BlurBackground />

        <View style={{
          width: '100%', flexDirection: 'row', justifyContent: 'center',
          paddingHorizontal: Spacing.padding, paddingVertical: Spacing.paddingMd,
        }}>
          <TouchableOpacity
            onPress={() => handleScroll(0)}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}
          >
            <Text style={{fontSize: Fonts.md, fontWeight: Fonts.heavyWeight,}}>HOME</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleScroll(1)}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}
          >
            <Text style={{fontSize: Fonts.md, fontWeight: Fonts.heavyWeight,}}>ABOUT US</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleScroll(2)}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}
          >
            <Text style={{fontSize: Fonts.md, fontWeight: Fonts.heavyWeight,}}>SERVICES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleScroll(3)}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}
          >
            <Text style={{fontSize: Fonts.md, fontWeight: Fonts.heavyWeight,}}>CONTACT</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  )
}

export default Header
