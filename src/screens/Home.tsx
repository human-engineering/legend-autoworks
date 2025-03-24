import React, { useRef, } from 'react'
import Header from '../components/header'
import BlockBox from '../components/blocks/BlockBox'
import MediaBlock from '../components/blocks/MediaBlock'
import AboutBlock from '../components/blocks/AboutBlock'
import ServicesBlock from '../components/blocks/ServicesBlock'
import ContactBlock from '../components/blocks/ContactBlock'

export interface IHomeProps {

}
function Home({ }: IHomeProps) {
  const masterRef = useRef<any>(null)

  return (
    <>
      <Header masterRef={masterRef} />

      <BlockBox masterRef={masterRef}>
        <MediaBlock order={0} />
        <AboutBlock order={1} />
        <ServicesBlock order={2} />
        <ContactBlock order={3} />
      </BlockBox>
    </>
  )
}

export default Home
