import React from "react";
import styled from "@emotion/styled";
import { size } from "@pasha28198/molequle-web-common";
import { PaneAlignments, usePane } from "./DetailsProvider";
import { RightPaneSize } from "./constants";

const StyledRightPane = styled.aside<{ isAligned: boolean }>`
  overflow: auto;
  ${size({
    maxw: {
      default: RightPaneSize.MOBILE,
      minitablet: RightPaneSize.MINITABLET,
      tablet: RightPaneSize.TABLET,
    },
  })};
  margin-left: -80%;
  width: 100%;
  transition: transform 400ms ease-in-out, opacity 400ms ease-in-out;
  transform: translate3d(${({ isAligned }) => (isAligned ? 0 : "50%")}, 0, 0);
  opacity: ${({ isAligned }) => (isAligned ? 1 : 0)};

  ${({ theme }) => theme.media.greaterThan("tablet")`
    margin-left: 0;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  `};
`;

const RightPane: React.FC = ({ children }) => {
  const { alignment, ref } = usePane(PaneAlignments.RIGHT);

  return (
    <StyledRightPane ref={ref} isAligned={alignment === PaneAlignments.RIGHT}>
      {children}
    </StyledRightPane>
  );
};

export default RightPane;
