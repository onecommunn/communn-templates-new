import React from 'react'
import YoganaLayout from './layout'
import YoganaHero from './_components/YoganaHero'
import YoganaServices from './_components/YoganaServices'
import YoganaAbout from './_components/YoganaAbout'
import YoganaPlans from './_components/YoganaPlans/YoganaPlans'
import YoganaEvents from './_components/YoganaEvents'
import YoganaCourses from './_components/YoganaCourses/YoganaCourses'
import YoganaProducts from './_components/YoganaProducts'
import YoganaTestimonial from './_components/YoganaTestimonial'
import YoganaGallery from './_components/YoganaGallery'
import YoganaBlogs from './_components/YoganaBlogs'
import YoganaContact from './_components/YoganaContact'
import YoganaCTA from './_components/YoganaCTA'

const YoganaRoot = () => {
  return (
    <>
      <YoganaHero/>
      <YoganaServices/>
      <YoganaAbout/>
      <YoganaPlans/>
      <YoganaEvents/>
      <YoganaCourses/>
      <YoganaProducts/>
      <YoganaTestimonial/>
      <YoganaGallery/>
      <YoganaBlogs/>
      <YoganaContact/>
      <YoganaCTA/>
    </>
  )
}

export default YoganaRoot