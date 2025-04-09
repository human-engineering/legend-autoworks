import React, { } from 'react'

interface IBlurBackgroundProps {
  dark?: boolean,
  transparent?: boolean,
  zIndex?: number,
  blur?: number,
}
function BlurBackground({ dark, transparent, zIndex, blur, }: IBlurBackgroundProps) {
  return (
    <>
      <div style={{
        filter: transparent ? 'blur(1px)' : undefined,
        position: 'absolute', zIndex: zIndex || -1, width: '100%', height: '100%',
        backgroundColor: dark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: transparent ? undefined : `blur(${blur || 10}px)`,
        WebkitBackdropFilter: transparent ? undefined : `blur(${blur || 10}px)`,
      }} />
    </>
  )
}

export default BlurBackground
