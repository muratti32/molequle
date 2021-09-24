import React from 'react';

interface AccordionContextState {
  expandedItemId?: string;
  toggle: (id: string, isOpen: boolean) => void;
}

const AccordionContext = React.createContext<AccordionContextState>({
  expandedItemId: undefined,
  toggle: () => {},
});

export const AccordionProvider: React.FC = ({ children }) => {
  const [expandedItemId, setExpandedItemId] = React.useState<string>('1');
  const toggle = React.useCallback((id: string, isOpen: boolean) => {
    setExpandedItemId((state) => {
      if (id === state && !isOpen) {
        return undefined;
      }
      return id;
    });
  }, []);

  return <AccordionContext.Provider value={{ expandedItemId, toggle }}>{children}</AccordionContext.Provider>;
};

export const useAccordion = () => React.useContext(AccordionContext);
