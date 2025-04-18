import React, { useEffect, useRef } from 'react'
import { View, Image, } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Block from './Block'
import { organization, videoSrc } from '../../utils/constants'
import Text from '../text'
import BlurBackground from '../blurBackground'

interface IMediaBlockProps {
  order: number,
}
function MediaBlock({ order, }: IMediaBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const videoRef = useRef<HTMLVideoElement>(null)
  if (videoRef.current) {
    videoRef.current.defaultMuted = true
    videoRef.current.muted = true
    videoRef.current.playsInline = true
    videoRef.current.autoplay = true
    videoRef.current.loop = true
    videoRef.current.preload = 'auto'
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.playsInline = true
      videoRef.current.autoplay = true
      videoRef.current.loop = true
      videoRef.current.preload = 'auto'
    }
    const removeEventListeners = () => {
      document.removeEventListener('touchstart', tryPlayVideo)
      document.removeEventListener('scroll', tryPlayVideo)
      document.removeEventListener('click', tryPlayVideo)
      document.removeEventListener('keypress', tryPlayVideo)
      document.removeEventListener('mousemove', tryPlayVideo)
      window.removeEventListener('focus', tryPlayVideo)
      window.removeEventListener('load', tryPlayVideo)
    }
    const tryPlayVideo = () => {
      if (videoRef.current && videoRef.current.readyState >= 3) {
        videoRef.current.play().then(() => {}).catch((error) => console.log('Autoplay error', error))
        removeEventListeners()
      }
    }
    tryPlayVideo()
    document.addEventListener('touchstart', tryPlayVideo)
    document.addEventListener('scroll', tryPlayVideo)
    document.addEventListener('click', tryPlayVideo)
    document.addEventListener('keypress', tryPlayVideo)
    document.addEventListener('mousemove', tryPlayVideo)
    window.addEventListener('focus', tryPlayVideo)
    window.addEventListener('load', tryPlayVideo)
    return () => removeEventListeners()
  }, [])

  return (
    <Block order={order} fillContainer={true}>
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        loop
        preload={'auto'}
        style={{position: 'absolute', zIndex: -1, width: '100%', height: '100%', objectFit: 'cover',}}
      >
        <source
          src={videoSrc}
          type={'video/mp4'}
        />
      </video>

      <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Image
          source={require('../../assets/icons/autoworks.png')}
          style={{width: '100%', maxWidth: 800, aspectRatio: 1, resizeMode: 'contain',}}
        />

        <View style={{position: 'absolute', zIndex: -1, width: '100%', height: 200, justifyContent: 'center', alignItems: 'center',}}>
          <BlurBackground zIndex={0} />
        </View>
      </View>
    </Block>
  )
}

export default MediaBlock
