import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDetailsContext } from "./DetailsProvider";
import { useScrollContext } from "../ScrollProvider";

const StyledHeader = styled.div<{ shouldHide: boolean }>`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space.M};
  width: 100%;
  min-height: 80px;
  max-height: 160px;
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gainsboro};
  transition: transform 300ms ease-out;
  ${({ shouldHide }) => shouldHide && { transform: "translateY(-80px)" }};

  ${({ theme }) => theme.media.greaterThan("tablet")`
    transform: translateY(0);
  `};
`;

type HeaderRenderer = ({
  onAlignmentChange,
}: {
  onAlignmentChange: ReturnType<typeof useDetailsContext>["onAlignmentChange"];
}) => React.ReactNode;

interface HeaderProps {
  children: React.ReactNode | HeaderRenderer;
}

const isRenderProp = (children: HeaderProps["children"]): children is HeaderRenderer => {
  return typeof children === "function";
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [shouldHide, setShouldHide] = useState(false);
  const { onAlignmentChange } = useDetailsContext();

  useScrollContext({
    onScrollChange: (scrollDirection) => {
      if (scrollDirection === "DOWN") {
        setTimeout(() => {
          setShouldHide(true);
        }, 100);
      } else if (scrollDirection === "UP" && shouldHide) {
        setShouldHide(false);
      }
    },
  });

  return (
    <StyledHeader shouldHide={shouldHide}>
      {isRenderProp(children) ? children({ onAlignmentChange }) : children}
    </StyledHeader>
  );
};

export default Header;
