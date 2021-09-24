import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Global = Window & typeof globalThis;

interface ScrollProviderAPI {
  element: Global | HTMLElement | null;
  scrollDirection: "UP" | "DOWN" | "IDLE";
}

const ScrollContext = createContext<ScrollProviderAPI>(null!);

interface UseScrollContextProps {
  onScrollChange?: (scrollDirection: "UP" | "DOWN" | "IDLE") => void;
}

export const useScrollContext = ({
  onScrollChange,
}: UseScrollContextProps = {}): ScrollProviderAPI => {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error("This hook must be used inside ScrollProvider.");
  }

  useEffect(() => {
    if (context.scrollDirection) {
      onScrollChange?.(context.scrollDirection);
    }
  }, [context.scrollDirection, onScrollChange]);

  return context;
};

interface ScrollProviderProps {
  element: Global | HTMLElement | null;
}

const ScrollProvider: React.FC<ScrollProviderProps> = ({ children, element: _element }) => {
  let element = _element;
  if (!element) {
    element = typeof window !== "undefined" ? window : null;
  }
  const timerRef = useRef<NodeJS.Timer | null>();
  const tickRef = useRef(false);
  const scrollTopRef = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<"UP" | "DOWN" | "IDLE" | null>(null);

  const onScroll = useCallback(() => {
    let currentScroll = (element as HTMLDivElement).scrollTop;
    if (currentScroll < 0) {
      currentScroll = 0;
    }

    if (!tickRef.current) {
      requestAnimationFrame(() => {
        if (currentScroll > scrollTopRef.current) {
          setScrollDirection("DOWN");
        } else {
          setScrollDirection("UP");
        }

        scrollTopRef.current = currentScroll;

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          timerRef.current = null;
          setScrollDirection("IDLE");
        }, 200);

        tickRef.current = false;
      });
      tickRef.current = true;
    }
  }, [element]);

  useEffect(() => {
    element?.addEventListener?.("scroll", onScroll);
    return () => element?.removeEventListener?.("scroll", onScroll);
  }, [element, onScroll]);

  const value = useMemo(() => ({ element, scrollDirection: scrollDirection || "IDLE" }), [
    element,
    scrollDirection,
  ]);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};

export default ScrollProvider;
