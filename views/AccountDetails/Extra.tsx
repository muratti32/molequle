import React from "react";
import Link from "next/link";
import { VStack, Heading } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";
import { RawPerson } from "../../lib/persons";

export const StyledContent = styled.div`
  padding: ${({ theme }) => theme.space.L};
  background: ${({ theme }) => theme.colors.purple};
  height: 100%;
  width: 100%;
`;

const CampaignBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid white;
  padding: 10px 0;
`;

const Content = ({ people }: { people: RawPerson[] }) => {
  return (
    <StyledContent>
      <VStack gap="S">
        {people &&
          people.map((person: RawPerson) => {
            return (
              <div key={person.id}>
                <CampaignBlock>
                  <Heading level={4}>Name</Heading>
                  <Link href={`/people/${person.id}`} as={`/people/${person.id}`}>
                    <a>
                      {person.first_name} {person.last_name}
                    </a>
                  </Link>
                  <Heading level={4}>Email</Heading>
                  <span>{person.email}</span>
                  <Heading level={4}>Country</Heading>
                  <span>{person.country_code}</span>
                </CampaignBlock>
              </div>
            );
          })}
      </VStack>
    </StyledContent>
  );
};

export default Content;
