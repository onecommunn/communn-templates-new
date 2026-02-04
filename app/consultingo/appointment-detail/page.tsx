import React, { Suspense } from 'react'
import ConsultingoAppointmentDetailsPage from './_components/ConsultingoAppointmentDetailsPage'

const ConsultingoAppointmentDetailsPageRoot = () => {
  return (
    <Suspense fallback={<></>}>
        <ConsultingoAppointmentDetailsPage/>
    </Suspense>
  )
}

export default ConsultingoAppointmentDetailsPageRoot