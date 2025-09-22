import React from 'react'
import YoganaLayout from './layout'
import YoganaHero from './_components/YoganaHero'
import YoganaServices from './_components/YoganaServices'
import YoganaAbout from './_components/YoganaAbout'
import YoganaPlans from './_components/YoganaPlans/YoganaPlans'
import YoganaEvents from './_components/YoganaEvents'

const YoganaRoot = () => {
  return (
    <YoganaLayout>
      <YoganaHero/>
      <YoganaServices/>
      <YoganaAbout/>
      <YoganaPlans/>
      <YoganaEvents/>
    </YoganaLayout>
  )
}

export default YoganaRoot