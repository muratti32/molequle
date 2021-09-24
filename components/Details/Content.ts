import styled from "@emotion/styled";

const Content = styled.div`
  ${({ theme }) => theme.media.lessThan("fullhd")`
   width: 100%;
   align-self: center;
  `};
  height: 100vh;
`;

export default Content;
