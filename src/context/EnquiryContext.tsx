import { createContext, useContext, useState, ReactNode } from "react";

interface EnquiryOptions {
  propertyTitle?: string;
  defaultMessage?: string;
  interest?: string;
}

interface EnquiryContextType {
  isOpen: boolean;
  propertyTitle: string;
  defaultMessage: string;
  interest: string;
  openEnquiry: (options?: EnquiryOptions | string) => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyTitle, setPropertyTitle] = useState("");
  const [defaultMessage, setDefaultMessage] = useState("");
  const [interest, setInterest] = useState("Buying");

  const openEnquiry = (options?: EnquiryOptions | string) => {
    if (typeof options === "string") {
      setPropertyTitle(options);
      setDefaultMessage(`I would like to inquire about ${options} and schedule a private viewing.`);
      setInterest("Buying");
    } else if (options) {
      setPropertyTitle(options.propertyTitle || "");
      setDefaultMessage(
        options.defaultMessage ||
          (options.propertyTitle ? `I would like to inquire about ${options.propertyTitle} and schedule a private viewing.` : "")
      );
      setInterest(options.interest || "Buying");
    } else {
      setPropertyTitle("");
      setDefaultMessage("");
      setInterest("Buying");
    }
    setIsOpen(true);
  };

  const closeEnquiry = () => {
    setIsOpen(false);
  };

  return (
    <EnquiryContext.Provider
      value={{
        isOpen,
        propertyTitle,
        defaultMessage,
        interest,
        openEnquiry,
        closeEnquiry,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}
