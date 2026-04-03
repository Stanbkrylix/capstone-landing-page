import emailjs from "emailjs-com";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicId = import.meta.env.VITE_EMAILJS_PUBLIC_ID;

export default async function SendEmailReal() {
    emailjs
        .send(
            serviceId,
            templateId,
            {
                to_email: "juniordelva1@gmail.com",
                message:
                    "look at this out: https://stanbkrylix.github.io/capstone-landing-page/",
            },
            publicId,
        )
        .then((response) => {
            console.log("Success", response);
        })
        .catch((error) => {
            console.log("failed...", error);
        });
}
