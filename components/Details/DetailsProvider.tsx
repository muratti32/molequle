import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useClickOutside } from "@pasha28198/molequle-web-common";
import { useMedia } from "the-platform";
import { em, math } from "polished";
import { useTheme } from "@emotion/react";

export const PaneAlignments = {
  LEFT: "left",
  RIGHT: "right",
  BOTH: "both",
} as const;

export type PaneAlignment = typeof PaneAlignments[keyof typeof PaneAlignments] | null;

interface DetailsContextValue {
  alignment: PaneAlignment;
  onAlignmentChange: (align: PaneAlignment) => void;
  rightPaneVisible: boolean;
}

const DetailsContext = createContext<DetailsContextValue>({
  alignment: null,
  onAlignmentChange: () => {},
  rightPaneVisible: true,
});

export const useDetailsContext = (): DetailsContextValue => useContext(DetailsContext);

export const usePane = (
  paneAlignment: typeof PaneAlignments.LEFT | typeof PaneAlignments.RIGHT,
): {
  alignment: PaneAlignment;
  ref: React.MutableRefObject<HTMLDivElement | null>;
  rightPaneVisible: boolean;
} => {
  const theme = useTheme();
  const isTablet = useMedia({ minWidth: math(em(theme.breakpoints.tablet)) });
  const { alignment, onAlignmentChange, rightPaneVisible } = useDetailsContext();
  const { ref } = useClickOutside<HTMLDivElement>({
    onClickOutside: () => {
      if (!isTablet && alignment === paneAlignment) {
        onAlignmentChange(null);
      }
    },
  });

  return useMemo(() => ({ alignment, ref, rightPaneVisible }), [alignment, ref, rightPaneVisible]);
};

interface DetailsProviderProps {
  rightPaneVisible?: boolean;
}

const DetailsProvider: React.FC<DetailsProviderProps> = ({ children, rightPaneVisible = true }) => {
  const [alignment, setAlignment] = useState<PaneAlignment>(null);

  const onAlignmentChange = useCallback((align: PaneAlignment) => {
    requestAnimationFrame(() => {
      setAlignment((state) => {
        switch (align) {
          case null:
          case PaneAlignments.BOTH:
            return align;
          case PaneAlignments.LEFT:
          case PaneAlignments.RIGHT: {
            if (state === null) {
              return align;
            }

            if (state === PaneAlignments.BOTH) {
              return align === PaneAlignments.LEFT ? PaneAlignments.RIGHT : PaneAlignments.LEFT;
            }

            if (state === align) {
              return null;
            }

            return PaneAlignments.BOTH;
          }
          default:
            return state;
        }
      });
    });
  }, []);

  const value = useMemo(() => ({ alignment, onAlignmentChange, rightPaneVisible }), [
    alignment,
    onAlignmentChange,
    rightPaneVisible,
  ]);

  return <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>;
};

export default DetailsProvider;
