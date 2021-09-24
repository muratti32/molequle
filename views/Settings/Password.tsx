import React, {FC} from "react";
import {Button, Paper, NotificationProvider, Notifications, useNotification} from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";
import {Endpoints, fetchUser, resetPassword} from "../../lib/user";
import {useQuery} from "react-query";

export const ButtonUpload = styled(Button)`
  margin: 12px 0 0;
  font-size: 16px;
  ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 14px;
        `};
`;

export const Title = styled.div`
  color: #2d3958;
  font-weight: bold;
  font-size: 26px;
  line-height: 28px;
  margin: 0;
  ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 18px;
        `};
`;

export const PasswordDescription = styled.p`
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  color: #7B8299;
  margin-top: 12px;
  margin-bottom: 0;
  ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 12px;
        `};
`

export const PaperBlock = styled(Paper)`
  padding: 24px;
  border-radius: 0;
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
  }
`

const Trigger = ({label, onSubmit, ...notificationProps}: any) => {
    const { notify } = useNotification();
    const onClick = () => {
        notify(notificationProps)
        onSubmit()
    };
    return <ButtonUpload onClick={onClick}>
        Send Password Reset Email
    </ButtonUpload>;
};

const Password: FC = () => {
  const { data: user } = useQuery<any>(Endpoints.ME, fetchUser, {
    staleTime: Infinity,
  });

  const onSubmit = () => {
    resetPassword({email: user.email})
  }

  return (
    <PaperBlock>
      <Title>Password</Title>
      <PasswordDescription>
          Your password was last changed on 2 April 2021. To verify your identity, our process for changing passwords requires email confirmation.
      </PasswordDescription>
        <Trigger
            text={
                <Notification>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8891 5.17156C13.0844 5.34512 13.0844 5.62653 12.8891 5.8001L6.87932 11.1421L3.68753 8.3148C3.49193 8.14153 3.49138 7.86012 3.6863 7.68626C3.88123 7.51239 4.19781 7.5119 4.39341 7.68517L6.87809 9.88614L12.182 5.17156C12.3773 4.99799 12.6939 4.99799 12.8891 5.17156Z" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.0961 4.98757C13.4057 5.26276 13.4057 5.70893 13.0961 5.98412L7.43923 11.0124L6.87964 11.5098L6.31908 11.0133L3.48084 8.49913C3.17072 8.22442 3.16985 7.77825 3.4789 7.50259C3.78795 7.22692 4.28989 7.22615 4.60001 7.50086L6.8777 9.51847L11.975 4.98757C12.2846 4.71238 12.7865 4.71238 13.0961 4.98757Z" fill="white"/>
                    </svg>
                    Send Password Reset Email
                </Notification>
            }
            type="info"
            label=""
            onSubmit={onSubmit}
        />
        <NotificationProvider>
            <Notifications />
        </NotificationProvider>
    </PaperBlock>
  );
};

export default Password;
