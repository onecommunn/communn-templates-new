"use client";

import { FC } from "react";
import YoganaContact from "../_components/YoganaContact";
import { ContactDetails, HomeSection, YoganaHomePage } from "@/models/templates/yogana/yogana-home-model";
import { useCMS } from "../CMSProvider.client";
import { dummyData } from "../dummyData";
import Breadcum from "../_components/Breadcum";



const YoganaContactPage: FC = () => {


    const { home } = useCMS();
    const isLoading = home === undefined;
    const source: YoganaHomePage | undefined = !isLoading
        ? (home as YoganaHomePage | undefined) ?? dummyData
        : undefined;
    const contactSection = source?.sections?.find(
        (s: HomeSection): s is ContactDetails => s.sectionName === "contactSection" && s.isActive
    );

    const primaryColor = source?.color?.primary || "#C2A74E";
    const secondaryColor = source?.color?.secondary || "#000";
    const neutralColor = source?.color?.neutral || "#707070";

    return (
        <>
            <Breadcum
                title={"Contact Us"}
                backgroundColor={primaryColor}
                breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
            />
            {contactSection && (
                <YoganaContact
                    data={contactSection}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    neutralColor={neutralColor}
                />
            )}
        </>
    );
};

export default YoganaContactPage;