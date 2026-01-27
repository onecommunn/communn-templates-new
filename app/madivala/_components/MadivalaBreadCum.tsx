// app/components/HeroKannada.tsx
"use client";



type Props = {
    title?: string;

};

export default function MadivalaBreadCum({ title }: Props) {
    return (
        <section className="w-full my-5">
            <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6 lg:px-0">
                <div className="flex flex-col justify-center rounded-[24px] bg-[#1f5652] h-[300px] p-6 sm:p-6">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-white">
                            <span className="block text-[34px] leading-[1.1] sm:text-[54px] text-center font-hedvig decoration-[#2aa7ff] decoration-[3px] underline-offset-[10px]">
                                {title}
                            </span>
                        </h1>

                    </div>
                </div>
            </div>
        </section>
    );
}
