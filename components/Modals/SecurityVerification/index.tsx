import React, { useState } from "react";
import { Button, PhoneIcon, Modal, CloseModal, TextInput } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";
import { SuccessModal } from "../Success";

export const ButtonSave = styled(Button)`
  background: #e2e2f5;
  border-radius: 30px;
  color: #7b8299;
  padding: 9px 20px;
`;
export const Close = styled(CloseModal)`
  cursor: pointer
`;

export const Input = styled(TextInput)`
  border: 1px solid #cfcfe8;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
`;

export const FooterBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #e2e2f5;
`;

export const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e2e2f5;
`;

export const ResendLink = styled.span`
  color: #ff4e78;
  text-decoration: underline;
  cursor: pointer;
`;

interface SecurityVerificationModalProps {
  open: boolean;
  onClose: () => void;
}

export const SecurityVerificationModal = ({
  open,
  onClose,
}: SecurityVerificationModalProps): JSX.Element => {
  const [modalShownSuccess, toggleModalSuccess] = useState<boolean>(false);
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <HeaderBlock>
          <h2>Security Verification</h2>
          <Close onClick={onClose} />
        </HeaderBlock>
        <div style={{ padding: 20, textAlign: "center" }}>
          <PhoneIcon />
          <p style={{ maxWidth: 300, margin: "10px auto" }}>
            To complete your request, enter the verification code we sent to +380*******93
          </p>
          <Input />
        </div>
        <FooterBlock>
          <span>
            Didn’t get the code? <ResendLink>Resend</ResendLink>
          </span>
          <Button onClick={() => toggleModalSuccess(true)}>Submit</Button>
        </FooterBlock>
      </Modal>
      <SuccessModal open={modalShownSuccess} onClose={() => toggleModalSuccess(false)} />
    </>
  );
};
