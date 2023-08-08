import Logo from "@/shared/ui/logo";
import HowItWorksButton from "./how-it-works-button";

export default function Header() {
  return (
    <div className="flex h-[60px] flex-1 items-center justify-between px-5 py-2">
      {/* Branding */}
      <div className="flex flex-1 items-center space-x-6">
        <Logo />

        {/* Description */}
        <div>
          <p className="heading-4">Los Angeles Parking Citation Data</p>
          <p className="paragraph-2 font-medium">
            Helping L.A. make informed decisions about parking policies
          </p>
        </div>
      </div>

      {/* Actions */}
      <HowItWorksButton/> 
    </div>
  );
}
