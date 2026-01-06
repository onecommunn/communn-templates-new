import { FormEvent, useContext, useState } from "react";
import OmIcon from "../../_components/icons/OmIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/contexts/Auth.context";
import { ContactForm } from "@/models/contact.model";
import { sendNotification } from "@/services/contactService";
import { toast } from "sonner";

const ContactFormCollection = () => {
    const auth = useContext(AuthContext);
    const { communityId } = auth;

    const [form, setForm] = useState<ContactForm>({
        name: "",
        lastName: "",
        email: "",
        subject: "",
        phoneNumber: "",
        message: "",
        communityId: communityId || "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload: ContactForm = { ...form, communityId };
            await sendNotification(payload);

            toast.success("Message sent successfully!");
            setForm({
                name: "",
                email: "",
                subject: "",
                phoneNumber: "",
                message: "",
                communityId: communityId || "",
            });
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FAEEDC] p-6 md:p-10 rounded-sm w-full">
            <OmIcon size={60} />
            <h2 className="font-kalnia text-2xl md:text-3xl text-card-foreground mb-3">
                24/7 Support
            </h2>
            <p className="text-muted-foreground font-figtree text-sm mb-6">
                Whether you need help choosing a design, understanding fabric details, tracking an order, or custom requirements, our team responds with care and clarity.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Input
                        type="text"
                        name="name"
                        placeholder="First name"
                        value={form.name}
                        onChange={handleChange}
                        className="
    w-full
    bg-[#F8EEDC] 
    border 
    border-[#C9B9A5]
    rounded-none
    px-5 
    py-4
    min-h-12
    text-base
    text-foreground
    placeholder:text-[#8B8174]
    font-figtree
    focus:outline-none
    focus:border-[#9C8A73]
  "
                        required
                    />
                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={handleChange}
                        className="
    w-full
    bg-[#F8EEDC] 
    border 
    border-[#C9B9A5]
    rounded-none
    px-5 
    min-h-12
    py-4
    text-base
    text-foreground
    placeholder:text-[#8B8174]
    font-figtree
    focus:outline-none
    focus:border-[#9C8A73]
  "
                        required
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Input
                        type="email"
                        name="email"
                        placeholder="Email here"
                        value={form.email}
                        onChange={handleChange}
                        className="
    w-full
    bg-[#F8EEDC] 
    border 
    border-[#C9B9A5]
    rounded-none
    px-5 
    min-h-12
    py-4
    text-base
    text-foreground
    placeholder:text-[#8B8174]
    font-figtree
    focus:outline-none
    focus:border-[#9C8A73]
  "
                        required
                    />
                    <Input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="
    w-full
    bg-[#F8EEDC] 
    border 
    border-[#C9B9A5]
    rounded-none
    px-5 
     min-h-12
    py-4
    text-base
    text-foreground
    placeholder:text-[#8B8174]
    font-figtree
    focus:outline-none
    focus:border-[#9C8A73]
  "
                    />
                </div>
                <Textarea
                    name="message"
                    placeholder="Additional message"
                    value={form.message}
                    onChange={handleChange}
                    className="
    w-full
    bg-[#F8EEDC] 
    border 
    border-[#C9B9A5]
    rounded-none
    px-5 
    min-h-30
    py-4
    text-base
    text-foreground
    placeholder:text-[#8B8174]
    font-figtree
    focus:outline-none
    focus:border-[#9C8A73]
  "
                    required
                />
                <Button
                    type="submit"
                    className="bg-[#C09932] rounded-none  border-none hover:bg-gold-dark text-primary-foreground font-figtree px-8"
                >
                    Send Message
                </Button>
            </form>
        </div>
    );
};

export default ContactFormCollection;
