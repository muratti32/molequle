import React, { useState, ChangeEvent, FC } from "react";
import {Box, Button, Paper, Avatar, Pencil} from "@pasha28198/molequle-web-common";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import {Endpoints, fetchUser, updateUser} from "../../lib/user";
import {Input} from "../../components/Modals/SecurityVerification";

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  ${({ theme }) => theme.media.lessThan("tablet")`
  grid-template-columns: 1fr;
`};
`;

export const InputUpload = styled(Input)`
    display: none;
`;

export const Title = styled.div`
  color: #2d3958;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
`;

export const BlockPhoto = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 20px;
  margin-top: -76px;

  ${({ theme }) => theme.media.lessThan("tablet")`
   margin-top: -50px;
  `};
  ${({ theme }) => theme.media.lessThan("desktop")`
   margin-top: -50px;
  `};
`;

export const PaperBlock = styled(Paper)`
  position: relative;
  border-bottom: 1px solid #DBE4E5;
  border-radius: 0;
  background: none;
`;

export const Name = styled.p`
  font-weight: bold;
  font-size: 26px;
  line-height: 24px;
  color: #FF4E78;
  margin-top: 12px;
  margin-bottom: 0;
  ${({ theme }) => theme.media.lessThan("tablet")`
   font-size: 22px;
  `};
`

export const EditButton = styled(Button)`
  border: none;
  background: none;
  color: #FF4E78;
  position: absolute;
  right: 8px;
  top: 11px;
  svg {
    width: 22px;
    margin-right: 4px;
  }
`

export const EditField = styled.div`
    width: 100%;
  ${({edit}: any) => edit ? `
        border-bottom: 1px solid #DBE4E5;
      ` : ''}
`

export const EditInput = styled.input`
  border: none !important;
  font-size: 14px;
  line-height: 16px;
  color: #7B8299;
  padding: 5px 0;
  outline: none;
  width: 100%;
  ${({ theme }) => theme.media.lessThan("tablet")`
   font-size: 12px;
  `};
  
  ${({edit}: any) => !edit ? `
        color: #2D3958;
        border-bottom: 1px solid #DBE4E5;
        ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 12px;
        `};
      ` : ''}
`

export const InputLabel = styled.p<{ edit: boolean }>`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #2D3958;
  margin: 0;
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
  }
  ${({ theme }) => theme.media.lessThan("tablet")`
   font-size: 12px;
  `};
  
  ${({edit}: any) => edit ? `
        font-weight: normal;
        font-size: 14px;
        line-height: 100%;
        color: #7B8299;
        ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 12px;
        `};
      ` : ''}
`

export const EditActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  width: 100%;
`

export const ActionCancel = styled(Button)`
  border: none;
  background: none;
  color: #2D3958;
  font-size: 16px;
  ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 14px;
        `};
`

export const UpdateButton = styled(Button)`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  ${({ theme }: any) => theme.media.lessThan("tablet")`
            font-size: 14px;
        `};
`

export const Wrapper = styled.div`
  background: #ffffff;
  padding: 24px;
  margin-top: 52px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`

const Account: FC = () => {
  const { data: user } = useQuery<any>(Endpoints.ME, fetchUser, {
        staleTime: Infinity,
    });
  const [name, setName] = useState<string>(user.name || '');
  const [lastName, setLastName] = useState<string>(user.name || '');
  const [provider, setProvider] = useState<string>(user.nickname || '');
  const [email, setEmail] = useState<string>(user.email || '');
  const [avatar, setAvatar] = useState<string>(user.picture)

  const [edit, setEdit] = useState<boolean>(false)

  const onSubmit = () => {
      updateUser(user.sub, {name, email, provider})
          .then((res: any) => console.log(res))
  }

  const editSubmit = () => {
      setEdit(prev => !prev)
  }

  const convertBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
              resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
              reject(error);
          }
      })
  }

  const uploadPhoto = async (e: any) => {
        const file = e.target.files[0]
        const base64: any = await convertBase64(file)
        setAvatar(base64)
        updateUser(user.sub, {avatar: base64})
            .then((res: any) => console.log(res))
    }

  // @ts-ignore
    return (
    <PaperBlock>
        <Wrapper>
            {!edit && <EditButton onClick={editSubmit}><Pencil/>Edit</EditButton>}
            <BlockPhoto>
                <label>
                    <Avatar src={avatar} size="large" />
                    {edit && <InputUpload type="file" onChange={uploadPhoto}/>}
                </label>
                {!edit && <Name>{name}</Name>}
            </BlockPhoto>
            <Form>
                {edit &&
                <EditField>
                    <InputLabel edit={edit}>
                        First Name
                    </InputLabel>
                    <EditInput
                        placeholder='First Name'
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        disabled={!edit}
                    />
                </EditField>
                }
                {edit &&
                <EditField>
                    <InputLabel edit={edit}>
                        Last Name
                    </InputLabel>
                    <EditInput
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                        disabled={!edit}
                    />
                </EditField>
                }
                <EditField>
                    <InputLabel edit={false}>
                        <InputLabel edit={edit}>
                            {!edit && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.59259 3.99999C1.59259 3.07952 2.33878 2.33333 3.25926 2.33333H12.7407C13.6612 2.33333 14.4074 3.07952 14.4074 3.99999V5.36541C14.4074 6.03891 14.0021 6.64621 13.3801 6.90457L8.63934 8.8738C8.23006 9.04381 7.76993 9.04381 7.36065 8.8738L2.61991 6.90457C1.99794 6.64621 1.59259 6.03891 1.59259 5.36541V3.99999ZM0.59259 5.36541V3.99999C0.59259 2.52724 1.7865 1.33333 3.25926 1.33333H12.7407C14.2135 1.33333 15.4074 2.52724 15.4074 3.99999V5.36541V12C15.4074 13.4728 14.2135 14.6667 12.7407 14.6667H3.25926C1.7865 14.6667 0.59259 13.4728 0.59259 12V5.36541ZM14.4074 7.44724V12C14.4074 12.9205 13.6612 13.6667 12.7407 13.6667H3.25926C2.33878 13.6667 1.59259 12.9205 1.59259 12V7.44724C1.78513 7.6014 2.00103 7.73034 2.23631 7.82807L6.97705 9.7973C7.63189 10.0693 8.3681 10.0693 9.02295 9.7973L13.7637 7.82807C13.999 7.73034 14.2149 7.6014 14.4074 7.44724Z" fill="#FF4E78"/>
                            </svg>}
                            Email Address
                        </InputLabel>
                    </InputLabel>
                    <EditInput
                        placeholder='Email Address'
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        disabled={!edit}
                    />
                </EditField>
                {!edit && <EditField>
                    <InputLabel edit={edit}>
                        Identity Provider
                    </InputLabel>
                    <EditInput
                        placeholder='Identity Provider'
                        value={provider}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setProvider(e.target.value)}
                        disabled={!edit}
                    />
                </EditField>}
            </Form>
            {edit && <EditActions>
                <UpdateButton onClick={onSubmit}>
                    Update
                </UpdateButton>
                <ActionCancel onClick={editSubmit}>
                    Cancel
                </ActionCancel>
            </EditActions>}
        </Wrapper>
    </PaperBlock>
  );
};

export default Account;
