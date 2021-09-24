import React from "react";
import styled from "@emotion/styled";
import { Layout } from "../../components/Layout";
import { Details } from "../../components/Details";

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const View: React.FC = ({ children }) => {
  return (
    <Layout title="Molequle | Best Bets">
      <Details.Provider rightPaneVisible={false}>
        <Content>{children}</Content>
      </Details.Provider>
    </Layout>
  );
};

export default View;
