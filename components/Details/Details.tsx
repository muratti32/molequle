import React, { useRef } from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import { PaneAlignment, PaneAlignments, useDetailsContext } from "./DetailsProvider";
import { LeftPaneSize, RightPaneSize } from "./constants";
import { ScrollProvider } from "../ScrollProvider";

const mobileStyles = (align: PaneAlignment, rightPaneVisible: boolean) => {
  let styles: SerializedStyles | string = "";
  if (align === PaneAlignments.LEFT) {
    styles = css`
      transform: translate3d(${LeftPaneSize.MOBILE}, 0, 0);
    `;
  } else if (align === PaneAlignments.RIGHT && rightPaneVisible) {
    styles = css`
      transform: translate3d(-${RightPaneSize.MOBILE}, 0, 0);
    `;
  }

  return styles;
};

const minitabletStyles = (align: PaneAlignment, rightPaneVisible: boolean) => {
  let styles: SerializedStyles | string = "";
  if (align === PaneAlignments.LEFT) {
    styles = css`
      transform: translate3d(${LeftPaneSize.MINITABLET}, 0, 0);
    `;
  } else if (align === PaneAlignments.RIGHT && rightPaneVisible) {
    styles = css`
      transform: translate3d(-${RightPaneSize.MINITABLET}, 0, 0);
    `;
  }

  return styles;
};

const tabletStyles = (align: PaneAlignment, rightPaneVisible: boolean) => {
  let styles: SerializedStyles | string = "";
  if (align === PaneAlignments.LEFT) {
    styles = css`
      transform: translate3d(${LeftPaneSize.TABLET}, 0, 0);
    `;
  } else if (align === PaneAlignments.RIGHT && rightPaneVisible) {
    styles = css`
      transform: translate3d(-${RightPaneSize.TABLET}, 0, 0);
    `;
  }

  return styles;
};

const desktopStyles = (align: PaneAlignment, rightPaneVisible: boolean) => {
  let styles: SerializedStyles | string = "";
  if (align === PaneAlignments.LEFT) {
    styles = css`
      left: 0;
    `;
  } else if (align === PaneAlignments.RIGHT && rightPaneVisible) {
    styles = css`
      right: 0;
    `;
  } else if (align === PaneAlignments.BOTH) {
    styles = css`
      right: 0;
      left: 0;
    `;
  }

  return styles;
};

export const StyledDetails = styled.div<{
  align: PaneAlignment;
  rightPaneVisible: boolean;
  fullHeight: boolean;
  background: boolean;
  flex: boolean;
  openSidebar: boolean;
}>`
  margin: 0 auto;
  overflow-y: hidden;
  z-index: 2;
  top: 0;
  bottom: 0;
  flex: 1 100%;
  width: 100%;
  height: 100%;
  display: ${({flex}) => flex ? 'flex' : 'block'};
  justify-content: center;
  color: #000000;
  transition: transform 300ms ease-in-out;
  ${({ background }) => background ? `background: #ffffff` : ''};
  
  ${({ fullHeight }) => fullHeight ? `
    height: 100%;
  ` : `height: max-content;`}
  
  ${({ align, rightPaneVisible }) => mobileStyles(align, rightPaneVisible)};

  ${({ theme, align, rightPaneVisible }) => theme.media.greaterThan("mobile")`
    ${minitabletStyles(align, rightPaneVisible)}
  `}

  ${({ theme, align, rightPaneVisible }) => theme.media.greaterThan("minitablet")`
    ${minitabletStyles(align, rightPaneVisible)}
  `}

  ${({ theme, align, rightPaneVisible }) => theme.media.greaterThan("tablet")`
    ${tabletStyles(align, rightPaneVisible)};
  `}

  ${({ theme, align, rightPaneVisible }) => theme.media.greaterThan("fullhd")`
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: ${rightPaneVisible ? "10px" : 0};
    border-bottom-right-radius: ${rightPaneVisible ? "10px" : 0};
    transition: left 300ms ease-in-out, right 300ms ease-in-out;
    width: 100%;
  `};
`;

const StyledDetailsInner = styled.div<{fullWidth: boolean}>`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: ${({fullWidth}) => fullWidth ? '100%' : 'auto'};
`;

interface DetailsInterface {
  children: any;
  fullHeight?: boolean;
  background?: boolean
  flex?: boolean;
  openSidebar?: boolean;
  fullWidth?: boolean;
}

const Details = ({
                   children,
                   fullHeight = false,
                   background = true,
                   flex = true,
                   openSidebar = false,
                   fullWidth = false
}: any) => {
  const { alignment, rightPaneVisible } = useDetailsContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <StyledDetails
        flex={flex}
        align={alignment}
        rightPaneVisible={rightPaneVisible}
        fullHeight={fullHeight}
        background={background}
        openSidebar={openSidebar}
    >
      <StyledDetailsInner fullWidth={fullWidth} ref={scrollRef}>
        <ScrollProvider element={scrollRef.current}>{children}</ScrollProvider>
      </StyledDetailsInner>
    </StyledDetails>
  );
};

export default Details;
