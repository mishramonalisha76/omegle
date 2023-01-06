import { useLivepeerProvider } from "@livepeer/react";

function Header() {
  const livepeerProvider = useLivepeerProvider();
  const providerName = livepeerProvider.getConfig()
    ? livepeerProvider.getConfig().name
    : "None";
  return (
    <div className="Header">
    </div>
  );
}

export default Header;