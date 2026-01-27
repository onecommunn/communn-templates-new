import MadivalaAboutus from "./_components/MadivalaAboutus";
import MadivalaHero from "./_components/MadivalaHero";
import MadivalaTeamOne from "./_components/MadivalaTeamOne";
import MadivalaTeamSlide, { MemberSlide } from "./_components/MadivalaTeamSlide";
import MembersSlider from "./_components/MadivalaTeamSlide";




const MadivalaRoot = () => {

    const membersSlides: MemberSlide[] = [
        { id: "1", title: "Annual Spiritual &\nCultural Fest", image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ChatGPT Image Jan 27, 2026, 01_17_30 PM.webp" },
        { id: "2", title: "Madivala Machideva\nJayanti", image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/tems1.png" },
        { id: "3", title: "Mass Marriage\nProgram", image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ChatGPT Image Jan 27, 2026, 01_17_30 PM.webp" },
        { id: "4", title: "School Kit\nDistribution", image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/tems1.png" },
        { id: "5", title: "School Kit\nDistribution", image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/tems1.png" },
        { id: "6", title: "School Kit\nDistribution", image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/tems1.png" },
    ];


    const primaryColor = "#1F514C"
    const secondaryColor = ""
    return (
        <>
            <MadivalaHero photoSrc="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ChatGPT Image Jan 27, 2026, 01_17_30 PM.webp" />
            <MadivalaAboutus primaryColor={primaryColor} secondaryColor="" />
            <MadivalaTeamOne />
            <MadivalaTeamSlide items={membersSlides} />
        </>
    )
}
export default MadivalaRoot;