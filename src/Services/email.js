import emailjs from "emailjs-com";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicId = import.meta.env.VITE_EMAILJS_PUBLIC_ID;

export default function SendEmailReal(email) {
    return emailjs.send(
        serviceId,
        templateId,
        {
            to_email: email,
            message:
                "Please click on this site to download the game: thelaststrongholdgame.pages.dev",
        },
        publicId,
    );
}
