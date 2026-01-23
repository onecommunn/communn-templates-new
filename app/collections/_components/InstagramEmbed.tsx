'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import OmIcon from './icons/OmIcon';

export default function InstagramFullWidth() {
    useEffect(() => {
        if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
        }
    }, []);



    return (
        <>

            <div
                style={{
                    width: '100vw',
                    marginLeft: 'calc(-50vw + 50%)',
                    padding: '0px 40px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <div className="flex flex-col items-center text-center mb-10">
                    <OmIcon size={60} color={"#C09932"} />
                    <h3 className="text-3xl md:text-[42px]/[50px] text-[#C09932] text-center font-kalnia whitespace-normal break-words">
                        Follow us on Instagram
                    </h3>

                </div>
                <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/vinuthasareeverse/"
                    data-instgrm-version="12"
                    style={{
                        maxWidth: '100%',
                        width: '100%',
                        borderRadius: '16px'
                    }}
                />
            </div>

            <Script
                src="https://www.instagram.com/embed.js"
                strategy="lazyOnload"
            />
        </>
    );
}
