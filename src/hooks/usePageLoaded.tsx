import { createContext, useContext, useState, ReactNode } from "react";

interface PageLoadContextType {
  isPageLoaded: boolean;
  setPageLoaded: (loaded: boolean) => void;
}

const PageLoadContext = createContext<PageLoadContextType | undefined>(undefined);

export const PageLoadProvider = ({ children }: { children: ReactNode }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const setPageLoaded = (loaded: boolean) => {
    setIsPageLoaded(loaded);
  };

  return (
    <PageLoadContext.Provider value={{ isPageLoaded, setPageLoaded }}>
      {children}
    </PageLoadContext.Provider>
  );
};

export const usePageLoaded = () => {
  const context = useContext(PageLoadContext);
  if (context === undefined) {
    throw new Error("usePageLoaded must be used within a PageLoadProvider");
  }
  return context;
};