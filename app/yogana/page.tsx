import React from 'react'
import YoganaLayout from './layout'
import YoganaHero from './_components/YoganaHero'
import YoganaServices from './_components/YoganaServices'
import YoganaAbout from './_components/YoganaAbout'

const YoganaRoot = () => {
  return (
    <YoganaLayout>
      <YoganaHero/>
      <YoganaServices/>
      <YoganaAbout/>
    </YoganaLayout>
  )
}

export default YoganaRoot