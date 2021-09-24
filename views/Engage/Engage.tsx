import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  Box,
  Calendar,
  Close,
  Group,
  Line,
  Skeleton,
  Slidable,
  Theme,
  VStack
} from "@pasha28198/molequle-web-common";
import { css, useTheme } from "@emotion/react";
import { Flipper, Flipped, spring } from "react-flip-toolkit";
import { useMedia } from "the-platform";
import WorkflowDetails from "./WorkflowDetails";
import styled from "@emotion/styled";

interface EngageProps {
  isVisible: boolean;
  onClickOutside: () => void;
}

const engageWorkflows = [
  {
    id: '123',
    name: 'This is a worklow name',
    description: 'And this is a potentially longer workflow description describing what the workflow will do. It can be longer than the truncated version on the left.',
    lastRun: '5 hours ago',
    triggers: [
      {
        name: 'Trigger Workflow in Marketo',
        description: 'Optional description for Marketo. For certain workflows, users need to provide some additional information.',
        inputs: [
          {
            label: 'Lorem Ipsum dolor sit',
            name: 'test',
          },
          {
            label: 'Consecutor lorem ipsum',
            name: 'consecutor',
          }
        ],
        button: {
          type: 'regular',
          label: 'Continue',
        }
      },
      {
        name: 'Do something in other system',
        description: 'And this is a potentially longer workflow description describing what the workflow will do. It can be longer than the truncated version on the left.',
        button: {
          type: 'premium',
          label: 'Run workflow',
        }
      },
      {
        name: 'Lorem Ipsum dolor',
        description: 'And this is a potentially longer workflow description describing what the workflow will do. It can be longer than the truncated version on the left.',
      }
    ]
  },
  {
    id: '234',
    name: 'Lorem Ipsum dolor sit amet',
    description: 'Nullam in aliquam turpis. Nullam eleifend, purus eget posuere facilisis.',
    lastRun: 'Yesterday at 5pm',
  },
  {
    id: '345',
    name: 'Curabitur quis ornare sem',
    description: 'Fusce fringilla tristique mauris, molestie tincidunt sapien condimentum sed. Sed malesuada nisi et est posuere, a tempor...',
    lastRun: '3 months ago',
    triggers: [
      {
        name: 'Do something in other system',
        description: 'And this is a potentially longer workflow description describing what the workflow will do. It can be longer than the truncated version on the left.',
        button: {
          type: 'regular',
          label: 'Some text',
        }
      }
    ]
  }
]

const flipperStyles = (expanded: boolean) => (theme: Theme) => css`
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: ${expanded ? undefined : theme.colors.white};
`;

const onAppear = (isMobile: boolean) => (el: HTMLElement) =>
    spring({
      onUpdate: (val) => {
        if (isMobile) {
          // eslint-disable-next-line no-param-reassign
          el.style.transform = `translateX(-${(val as number) * 100}%)`;
        }
        // eslint-disable-next-line no-param-reassign
        el.style.opacity = `${val as number}`;
      },
    });

const onExit = (isMobile: boolean) => (
    el: HTMLElement,
    index: number,
    removeElement: () => void,
) => {
  spring({
    onUpdate: (val) => {
      if (isMobile) {
        // eslint-disable-next-line no-param-reassign
        el.style.transform = `translateX(${(val as number) * 100}%)`;
      }
      // eslint-disable-next-line no-param-reassign
      el.style.opacity = `${1 - (val as number)}`;
    },
    onComplete: removeElement,
  });

  return () => {
    // eslint-disable-next-line no-param-reassign
    el.style.opacity = "";
    // eslint-disable-next-line no-param-reassign
    el.style.transform = "";
    removeElement();
  };
};

const Header = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    cursor: pointer
  }
`

const FilterWrapper = styled.div<{showFilter: boolean}>`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  span {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #2D3958;
  }
  svg {
    ${({showFilter}) => `
      transform: rotate(${showFilter ? '180deg' : 0})
    `
    }
`
const FilterDropdown = styled.div<{showFilter: boolean}>`
  background: #ffffff;
  padding: 5px;
  position: absolute;
  transition: .5s;
  z-index: 10;
  box-shadow: 0px 4px 5px rgba(45, 57, 88, 0.25);
  border-radius: 10px;
  min-width: 100px;
  margin-left: 70px;
  ${({showFilter}) => `
    opacity: ${showFilter ? 1 : 0};
    transform: ${showFilter ? 'translateY(10px)' : 'translateY(-100%)'};
  `}
`

const WorkflowItem = styled.div<{active: boolean}>`
  cursor: pointer;
  padding: 12px 20px;
  &:not(:last-child) {
    border-bottom: 1px solid #DBE4E5;
  }
  ${({active}) => `
    border-left: ${active ? '2px solid #FF4E78' : ''}
  `}
`

const LastActive = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 6px;
    path {
      fill: #FF4E78;
    }
  }
  p {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`
const WorkflowName = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`
const WorkflowDescription = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`

const Engage: React.FC<EngageProps> = ({ isVisible, onClickOutside }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMedia({ maxWidth: theme.breakpoints.minitablet });
  const onElementAppear = useMemo(() => onAppear(isMobile), [isMobile]);
  const onElementExit = useMemo(() => onExit(isMobile), [isMobile]);
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [activeWorkflow, setActiveWorkflow] = useState<string>('')

  const changeWorkflow = (id: string) => {
    if (!activeWorkflow) {
      setActiveWorkflow(id)
    } else if (activeWorkflow === id) {
      setActiveWorkflow('')
    } else {
      setActiveWorkflow(id)
    }
  }

  return (
      <Slidable
          side="right"
          isVisible={isVisible}
          onClickOutside={() => {
            onClickOutside()
            setActiveWorkflow('')
          }}
      >
        <Flipper
            flipKey={expanded}
            // @ts-ignore
            css={flipperStyles(expanded)}
        >
          <Flipped flipId="workflow-list" translate>
            {(flipperContainerProps) => (
                <Box
                    view="flex"
                    textColor="textDark"
                    bg="white"
                    h={1}
                    w={1}
                    {...flipperContainerProps}
                >
                  <Slidable.Pane>
                    <Header>
                      <h2>Workflows</h2>
                      <Close onClick={() => {
                        onClickOutside()
                        setExpanded(false)
                      }} width={22} height={22}/>
                    </Header>
                    <div onClick={() => setShowFilter(prev => !prev)}>
                      <FilterWrapper showFilter={showFilter}>
                        <span>All Tags</span> <ArrowDown width={20} height={20}/>
                      </FilterWrapper>
                      <FilterDropdown showFilter={showFilter}>
                        <p>test1</p>
                        <p>test2</p>
                        <p>test3</p>
                      </FilterDropdown>
                    </div>
                    {engageWorkflows?.map((data: any) => (
                        <WorkflowItem active={activeWorkflow === data.id} key={data.id} onClick={() => {
                          changeWorkflow(data.id)
                        }}>
                          <WorkflowName>
                            {data.name}
                          </WorkflowName>
                          <WorkflowDescription>
                            {data.description}
                          </WorkflowDescription>
                          <LastActive>
                            <Calendar />
                            <p>Last run: {data.lastRun}</p>
                          </LastActive>
                        </WorkflowItem>
                    ))}
                  </Slidable.Pane>
                  {expanded ? (
                      <Flipped
                          flipId="workflow-details"
                          onAppear={onElementAppear}
                          onExit={onElementExit}
                      >
                        {(flipperDetailsProps) => (
                            <Slidable.Pane {...flipperDetailsProps}>
                              <WorkflowDetails engageWorkflows={engageWorkflows}/>
                            </Slidable.Pane>
                        )}
                      </Flipped>
                  ) : null}
                </Box>
            )}
          </Flipped>
        </Flipper>
      </Slidable>
  );
};

// @ts-ignore
export default Engage;