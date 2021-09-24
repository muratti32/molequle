import React from "react";
import { Button, Modal, SuccessIcon } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";

export const ButtonSave = styled(Button)`
  background: #e2e2f5;
  border-radius: 30px;
  color: #7b8299;
  padding: 9px 20px;
`;

export const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const FooterBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
`;

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ open, onClose }: SuccessModalProps): JSX.Element => {
  return (
    <Modal open={open} onClose={onClose}>
      <TitleBlock>
        <SuccessIcon />
        <h2>Success!</h2>
      </TitleBlock>
      <div style={{ padding: "0 20px" }}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
      <FooterBlock>
        <Button onClick={onClose}>Okay</Button>
      </FooterBlock>
    </Modal>
  );
};
