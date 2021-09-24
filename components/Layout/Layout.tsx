import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Flex,
  Logo,
  People,
  Account,
  Campaign,
  ButtonIcon,
  Person,
  Logout,
} from '@pasha28198/molequle-web-common';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.purple};
  color: #ffffff;
  z-index: 9;
`;

export const FlexItem = styled(Flex.Item)<{
  hiddenMobile?: boolean;
  hiddenDesktop?: boolean;
  index?: number;
  activeIndex?: number;
}>`
  padding: 14px;
  line-height: 1;
  background: ${({ active }) => (active ? '#7e72ff' : '#695FEE')};
  ${({ theme, active, hiddenMobile = false }) => theme.media.lessThan('tablet')`
  background: ${active ? 'none' : 'none'};
  display: ${hiddenMobile ? 'none' : 'block'} !important;
  border-bottom: ${active ? '3px solid #fff' : 'none'};
  display: flex;
  flex-direction: column;
  height: 54px;
  align-items: center !important;
`};
  ${({ theme, hiddenDesktop = false, active, activeIndex, index }: any) => theme.media.greaterThan('tablet')`
    display: ${hiddenDesktop ? 'none' : 'block'} !important
    background: ${active ? '#7e72ff' : '#695FEE'};
    border-bottom-right-radius: ${activeIndex === index + 1 ? '10px' : 0};
    border-top-right-radius: ${activeIndex === index - 1 ? '10px' : 0};
`};
`;

export const HiddenBlock = styled.div<{ activeIndex: number | undefined }>`
  flex: initial;
  display: none;
  background: #695fee;
  width: 100%;
  ${({ theme, activeIndex }) => theme.media.greaterThan('tablet')`
  flex: 1 1 auto;
  display: block;
  border-top-right-radius: ${activeIndex === 3 ? '10px' : 0};
`};
`;

type TitleNavProps = {
  active?: boolean;
};

const TitleNav = styled.div<TitleNavProps>`
  color: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.5)')};
  font-size: 12px;
  line-height: 16px;

  ${({ theme }) => theme.media.greaterThan('tablet')`
   display: none;
`};
`;

const CenteredItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(Flex.Item)`
  z-index: 9;
  justify-content: space-between;
`;

const Profile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  ${({ theme }) => theme.media.lessThan('tablet')`
    display: none
  `}
`;

const FlexWrapper = styled(Flex)`
  ${({ theme }) => theme.media.lessThan('tablet')`
    flex-direction: row-reverse;
  `}
`;
const MobileDropdown = styled.div``;
const Dropdown = styled.div<{ dropdown: boolean | undefined }>`
  position: absolute;
  z-index: -1;
  bottom: 54px;
  left: 0;
  width: 100%;
  background: #7e72ff;
  color: #fff;
  transition: 0.5s ease-in-out;
  ${({ theme, dropdown }) => theme.media.lessThan('tablet')`
    bottom: ${dropdown ? '54px' : '-400px'};
  `}
  ${({ theme, dropdown }) => theme.media.greaterThan('tablet')`
    width: 210px;
    background: #FFFFFF;
    box-shadow: 0px 4px 5px rgba(45, 57, 88, 0.25);
    border-radius: 10px;    
    z-index: 9;
    color: #2D3958 !important;
    left: ${dropdown ? '30px' : '-400px'};
  `}
`;

const SVG = styled.svg`
  ${({ theme }) => theme.media.greaterThan('tablet')`
    display: none
  `}
`;

const DropdownItem = styled.li`
  padding: 14px 20px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
const DropdownAccount = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;

  &:hover,
  &:focus,
  &:visited {
    color: #fff;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  svg {
    margin-right: 6px;
    width: 26px;
    height: 26px;

    path {
      fill: #ff4e78 !important;
      fill-opacity: 1 !important;
    }
  }

  p {
    margin: 0;
  }

  ${({ theme }) => theme.media.greaterThan('tablet')`
    p {
        color: #2D3958;
    }
  `}
`;
const ProfileBlock = styled.a`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  text-decoration: none;
  background: #695fee;

  &:hover,
  &:focus,
  &:visited {
    color: #fff;
  }

  img {
    margin-right: 12px;
  }

  ${({ theme }) => theme.media.greaterThan('tablet')`
    background: #EDF1F2;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    color: #2D3958;
    &:hover, &:focus, &:visited {
        color: #2D3958;
    }
  `}
`;
const ProfileInfo = styled.div`
  p {
    font-weight: 700;
    font-size: 16px;
    margin: 0;
  }

  span {
    font-size: 14px;
  }
`;
const FlexContent = styled(Flex)`
  background: #7e72ff;
  ${({ theme }) => theme.media.greaterThan('tablet')`
    background: #695FEE;
  `}
`;

interface LayoutProps {
  title?: string;
  showBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Molequle', showBar = true }) => {
  const { user }: any = useUser();
  const router = useRouter();
  const [dropdown, setDropdown] = useState<boolean | undefined>(false);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);
  const activePath = (path: string) => {
    if (path === '/people' && (router.pathname === '/people' || router.pathname === '/')) {
      return true;
    } else {
      return router.pathname.split('/')[1] === path.split('/')[1];
    }
  };

  useEffect(() => {
    if (router.pathname === '/people' || router.pathname === '/') {
      setActiveIndex(1);
    } else if (router.pathname === '/campaigns') {
      setActiveIndex(2);
    } else if (router.pathname === '/account') {
      setActiveIndex(3);
    } else {
      setActiveIndex(undefined);
    }
  }, [router.pathname]);

  return (
    <Box h={1} w={1}>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <FlexContent direction={{ default: 'column', tablet: 'row-reverse' }} h={1} w={1} bg={'purple'}>
        <Flex.Item size='auto' h={{ default: showBar ? 0.8 : 1, tablet: 1 }} w={1}>
          <Container>{children}</Container>
        </Flex.Item>
        <Wrapper size='fixed'>
          <Box as='nav' h={1} bg='#7e72ff'>
            <FlexWrapper
              as='ul'
              direction={{ default: 'row', tablet: 'column' }}
              alignX={{ default: 'space-around', tablet: 'start' }}
              alignY={{ default: 'center', tablet: 'center' }}
              h={1}
              w={'100%'}
            >
              <FlexItem as='li' index={0} activeIndex={activeIndex}>
                <a
                  href='/'
                  onClick={() => {
                    setDropdown(false);
                    setActiveIndex(1);
                  }}
                >
                  <ButtonIcon>
                    <Logo />
                  </ButtonIcon>
                </a>
              </FlexItem>
              <FlexItem
                as='li'
                active={activePath('/people')}
                onClick={() => {
                  setDropdown(false);
                  setActiveIndex(1);
                }}
                index={1}
                activeIndex={activeIndex}
              >
                <a
                  href='/people'
                  onClick={() => {
                    setDropdown(false);
                    setActiveIndex(1);
                  }}
                >
                  <CenteredItem>
                    <ButtonIcon>
                      <People active={true} />
                    </ButtonIcon>
                  </CenteredItem>
                </a>
              </FlexItem>
              <FlexItem
                as='li'
                active={activePath('/campaigns')}
                hiddenMobile={true}
                index={2}
                activeIndex={activeIndex}
              >
                <a
                  href='/campaigns'
                  onClick={() => {
                    setDropdown(false);
                    setActiveIndex(2);
                  }}
                >
                  <CenteredItem>
                    <ButtonIcon>
                      <Campaign active={true} />
                    </ButtonIcon>
                  </CenteredItem>
                </a>
              </FlexItem>
              <FlexItem as='li' active={activePath('/account')} hiddenMobile={true} index={3} activeIndex={activeIndex}>
                <a
                  href='/account'
                  onClick={() => {
                    setDropdown(false);
                    setActiveIndex(3);
                  }}
                >
                  <CenteredItem>
                    <ButtonIcon>
                      <Account active={true} />
                    </ButtonIcon>
                  </CenteredItem>
                </a>
              </FlexItem>
              {/* spacer div */}
              <HiddenBlock activeIndex={activeIndex}>
                <Flex.Item
                  size='auto'
                  // @ts-ignore
                  gap='NONE'
                />
              </HiddenBlock>
              <MobileDropdown>
                <Dropdown dropdown={dropdown}>
                  <DropdownItem>
                    <DropdownAccount href={'/account'}>
                      <Person />
                      <p>Account</p>
                    </DropdownAccount>
                  </DropdownItem>
                  <DropdownItem>
                    <DropdownAccount href={'/account'}>
                      <p>Status Page</p>
                    </DropdownAccount>
                    <DropdownAccount href={'/account'}>
                      <p>Help Center</p>
                    </DropdownAccount>
                    <DropdownAccount href={'/account'}>
                      <p>Terms & Policies</p>
                    </DropdownAccount>
                  </DropdownItem>
                  <DropdownItem>
                    <DropdownAccount href={'/api/auth/logout'}>
                      <Logout />
                      <p>Logout</p>
                    </DropdownAccount>
                  </DropdownItem>
                  <ProfileBlock href={'/profile'}>
                    <Profile src={user?.picture} alt={'profile'} />
                    <ProfileInfo>
                      <p>{user?.name}</p>
                      <span>{user?.email}</span>
                    </ProfileInfo>
                  </ProfileBlock>
                </Dropdown>
                <FlexItem as='li' hiddenDesktop={true} onClick={() => setDropdown((prev) => !prev)}>
                  <CenteredItem>
                    <SVG width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <circle cx='12' cy='5' r='1.5' fill='white' />
                      <circle cx='12' cy='12' r='1.5' fill='white' />
                      <circle cx='12' cy='19' r='1.5' fill='white' />
                    </SVG>
                    <Profile src={user?.picture} alt={'profile'} />
                  </CenteredItem>
                </FlexItem>
              </MobileDropdown>
            </FlexWrapper>
          </Box>
        </Wrapper>
      </FlexContent>
    </Box>
  );
};

export default Layout;
