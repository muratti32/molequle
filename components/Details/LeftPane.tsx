import React from "react";
import styled from "@emotion/styled";
import { size } from "@pasha28198/molequle-web-common";
import { PaneAlignments, usePane } from "./DetailsProvider";
import { LeftPaneSize } from "./constants";

const StyledLeftPane = styled.aside<{ isAligned: boolean, hide?: boolean }>`
  flex: 0 0 auto;
  height: 100%;
  display: ${({hide}) => hide ? 'none' : ''};
  ${size({
    w: {
      default: '80%',
      minitablet: LeftPaneSize.MINITABLET,
      tablet: LeftPaneSize.TABLET,
    },
  })};
  transition: transform 400ms ease-in-out, opacity 400ms ease-in-out;

  ${({ theme }) => theme.media.greaterThan("tablet")`
    opacity: 1;
    transform: translate3d(0, 0, 0);
  `};
`;

const LeftPane = ({ children, hide = false}: any) => {
  const { alignment, ref } = usePane(PaneAlignments.LEFT);

  return (
    <StyledLeftPane hide={hide} ref={ref} isAligned={alignment === PaneAlignments.LEFT}>
      {children}
    </StyledLeftPane>
  );
};

export default LeftPane;
