import React from 'react'
import { View, DimensionValue, } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'

interface IBlockProps {
  order: number,
  children?: React.ReactNode,
  style?: any,
  fillContainer?: boolean,
}
function Block({ order, children, style, fillContainer, }: IBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  return (
    <>
      <View style={{
        position: 'absolute', top: `${order}00%` as DimensionValue, width: '100%', height: '100%',
        alignItems: 'center', justifyContent: 'center',
        ...style,
      }}>
        <View style={{width: '100%', height: '100%', maxWidth: fillContainer ? undefined : 1200,}}>
          {children}
        </View>
      </View>
    </>
  )
}

export default Block
