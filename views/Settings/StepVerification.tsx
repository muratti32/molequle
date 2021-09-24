import React, { useState, FC } from "react";
import {Add, Box, Button, Paper, Reload, TextField, TextMessage, TOTP} from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";
import { SecurityVerificationModal } from "../../components/Modals/SecurityVerification";

export const Title = styled.div`
  color: #2d3958;
  font-weight: bold;
  font-size: 26px;
  line-height: 28px;
  margin-bottom: 12px;
  border: none
  ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 18px;
        `};
`;

export const PaperBlock = styled(Paper)`
  padding: 24px;
  border-radius: 0;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  background: #EDF1F2;
`;

export const Text = styled.p`
  margin-top: 30px;
  color: #2d3958;
  font-size: 16px;
  line-height: 18px;
  ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 14px;
        `};
`;

export const Verification = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 12px 10px;
  &:not(:last-child) {
    border-bottom: 1px solid #DBE4E5;
  }
  align-items: center;
`
export const Enroll = styled(Button)<{ last: boolean }>`
  border: none;
  background: none;
  color: #FF4E78;
  font-size: 14px;
  ${({ theme }: any) => theme.media.lessThan("tablet")`
     font-size: 12px;
  `};
  ${({ last }) => last ? `
     svg {
        width: 20px;
        height: 20px;
        margin-right: 6px;
     }
  ` : ''};
}
`

export const VerificationLeft = styled.div`
  display: flex;
  svg {
    margin-right: 12px;
  }
`

export const VerificationText = styled.div`

`

export const VerificationTitle = styled.p`
  color: #2D3958;
  font-size: 14px;
  line-height: 16px;
  margin: 0;
  ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 12px;
        `};
`

export const VerificationDescription = styled.p`
  color: #7B8299;
  font-size: 14px;
  line-height: 16px;
  margin: 0;
  ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 12px;
        `};
`

const StepVerification: FC = () => {
  const [modalShown, toggleModal] = useState<boolean>(false);

  return (
    <PaperBlock headerContent={<Title>Multi-Factor Auth</Title>}>
        <Verification>
            <VerificationLeft>
                <TOTP />
                <VerificationText>
                    <VerificationTitle>
                        TOTP (one-time code)
                    </VerificationTitle>
                    <VerificationDescription>
                        Not enrolled
                    </VerificationDescription>
                </VerificationText>
            </VerificationLeft>
            <Enroll last={false}>
                <Add />
                Enroll
            </Enroll>
        </Verification>
        <Verification>
            <VerificationLeft>
                <TextMessage />
                <VerificationText>
                    <VerificationTitle>
                        Text Message
                    </VerificationTitle>
                    <VerificationDescription>
                        Not enrolled
                    </VerificationDescription>
                </VerificationText>
            </VerificationLeft>
            <Enroll last={false} onClick={() => toggleModal(true)}>
                <Add />
                Enroll
            </Enroll>
        </Verification>
        <Verification>
            <VerificationLeft>
                <Reload />
                <VerificationText>
                    <VerificationTitle>
                        Recovery Codes
                    </VerificationTitle>
                    <VerificationDescription>
                        Not Generated
                    </VerificationDescription>
                </VerificationText>
            </VerificationLeft>
            {/*<Enroll last={true}>*/}
            {/*    <Reload />*/}
            {/*    Regenerate*/}
            {/*</Enroll>*/}
        </Verification>
      <SecurityVerificationModal open={modalShown} onClose={() => toggleModal(false)} />
    </PaperBlock>
  );
};

export default StepVerification;
