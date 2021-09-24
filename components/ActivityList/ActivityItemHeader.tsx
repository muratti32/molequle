import React, {useState} from "react";
import {
    Flex,
    Line,
    Skeleton,
    Calendar,
    Accordion,
    AccordionItem,
    ArrowUp,
    ArrowDown
} from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";

const Container = styled.div`
  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.gainsboro};
  }
`;

const DateContent = styled.div`
  display: flex;
  align-content: center;
  line-height: 29px;

  svg {
    margin-right: 10px;
  }
`

const Placehodler = () => (
  <Skeleton>
    <Line width={0.8} />
  </Skeleton>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  width: 100%;
`
const Content = styled.div`
  display: flex;
  padding: 15px 20px;
  width: 100%;
`

const Name = styled.div`
  width: 155px;
`

const Dropdown = styled.div<{active: boolean}>`
  transition: 1s ease-in-out;
  ${({active}) => `
    display: ${active ? 'block' : 'none'};
  `}
`

const ActivityItemHeader = ({ data }: { data: any }) => {

  const [active, setActive] = useState<boolean>(false)

  return (
    <Container>
        <Wrapper>
            <Content>
                <Name>
                    <strong>{data.name}</strong>
                </Name>
                  <div>
                    {data.description}
                      <Dropdown active={active}>
                          {data.attributes.map((data: any) => (
                              <p>{data.id} - {data.name} - {data.type}</p>
                          ))}
                      </Dropdown>
                  </div> 
            </Content>
            {active ? <ArrowDown width={20} onClick={() => setActive(prev => !prev)}/> : <ArrowUp width={30} onClick={() => setActive(prev => !prev)}/>}

        </Wrapper>
    </Container>
  );
};

export default React.memo(ActivityItemHeader);
