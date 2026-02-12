import Link from "next/link";

type BreadcumProps = {
    title: string;
    breadcrumb: {
        label: string;
        href?: string;
    }[];
    backgroundColor?: string;
};

const Breadcum = ({
    title,
    breadcrumb,
    backgroundColor,
}: BreadcumProps) => {


    return (
        <section className="relative h-[200px] md:h-[330px] w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundColor: backgroundColor || "#C2A74E" }}
            >
                <div className="absolute inset-0 bg-foreground/40" />
            </div>

            <div className="relative flex h-full flex-col items-center justify-center text-center">
                <h1 className="font-kalnia text-4xl md:text-5xl text-primary-foreground mb-4">
                    {title}
                </h1>

                <nav className="text-primary-foreground/80 text-sm flex items-center gap-2">
                    {breadcrumb.map((item, index) => (
                        <span key={index} className=" font-figtree flex items-center gap-2">
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className=" font-figtree hover:text-primary cursor-pointer "
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span>{item.label}</span>
                            )}

                            {index < breadcrumb.length - 1 && <span>/</span>}
                        </span>
                    ))}
                </nav>

            </div>
        </section>
    );
};

export default Breadcum;
