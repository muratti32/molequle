import React from "react";
import styled from "@emotion/styled";
import { Layout } from "../../../components/Layout";
import { Details } from "../../../components/Details";

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const View: React.FC = ({ children }) => {
  return (
    <Layout title="Molequle | Settings | Profile">
      <Details.Provider rightPaneVisible>
        <Content>{children}</Content>
      </Details.Provider>
    </Layout>
  );
};

export default View;
