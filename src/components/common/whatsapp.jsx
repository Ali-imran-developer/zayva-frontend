import whatsappImage from "/icons/whatsapp-icon.png";
import { Link } from "react-router-dom";

export const WhatsAppButton = ({
  phoneNumber,
  className,
}) => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator?.userAgent);
  const formattedPhoneNumber = "92" + phoneNumber?.slice(1);

  const baseUrl = isMobile
    ? `https://wa.me/${formattedPhoneNumber}`
    : `https://web.whatsapp.com/send?phone=${formattedPhoneNumber}`;

  return (
    <Link to={baseUrl} target="_blank">
      <img src={whatsappImage} alt="Whatsapp Image" className={`w-16 h-16 animate-bounce cursor-pointer ${className}`} />
    </Link>
  );
};
