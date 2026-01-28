
import React from 'react'
import IdCardUI from '../_components/IdCardUI'

const MemberShipCardPageRoot = () => {
    return (
        <>
            <IdCardUI
                primaryColor="#1F514C"
                data={{
                    name: "JAKE RILEYY",
                    role: "Owner",
                    idNumber: "9876 - 5432",
                    dob: "26 Dec 2004",
                    city: "Bangalore",
                    phone: "+91 039840948092",
                    email: "jakeriley@gmail.com",
                    caste: "+91 039840948092",
                    subCaste: "jakeriley@gmail.com",
                    image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/95eacd45-1680-493c-bd7a-32feb5afb50d.png",
                }}
            // onDownload={() => console.log("download")}
            />

        </>
    )
}

export default MemberShipCardPageRoot
