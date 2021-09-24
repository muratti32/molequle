import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import Accordion from './Accordion';
import { GlobalStyles, theme } from '@pasha28198/molequle-web-common';

const Wrapper: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

const items = [
  { id: 'item-1', label: 'Accordion item 1' },
  { id: 'item-2', label: 'Accordion item 2' },
  { id: 'item-3', label: 'Accordion item 3' },
];

test('displays accordion in uncontrolled mode', async () => {
  const { container } = render(
    <Wrapper>
      <Accordion>
        {items.map((item) => (
          <Accordion.Item id={item.id} key={item.id} label={item.label}>
            {`${item.label} Content`}
          </Accordion.Item>
        ))}
      </Accordion>
    </Wrapper>,
  );

  items?.forEach((item) => fireEvent.click(screen.getByLabelText(item.label)));
  await waitFor(() => container.querySelectorAll('[aria-expanded="true"]'));
  expect(container.querySelectorAll('[aria-expanded="true"]').length).toEqual(items.length);
});

test('displays accordion in controlled mode', async () => {
  const { container } = render(
    <Wrapper>
      <Accordion allowMultiple={false}>
        {items.map((item) => (
          <Accordion.Item id={item.id} key={item.id} label={item.label}>
            {`${item.label} Content`}
          </Accordion.Item>
        ))}
      </Accordion>
    </Wrapper>,
  );

  items?.forEach((item) => fireEvent.click(screen.getByLabelText(item.label)));
  await waitFor(() => container.querySelectorAll('[aria-expanded="true"]'));
  expect(container.querySelectorAll('[aria-expanded="true"]').length).toEqual(1);
  expect(container.querySelectorAll('[aria-expanded="false"]').length).toEqual(2);
});

test('displays accordion in mixed mode', async () => {
  const { container } = render(
    <Wrapper>
      <Accordion allowMultiple={false}>
        {items.map((item, i) => (
          <Accordion.Item
            id={item.id}
            key={item.id}
            label={item.label}
            disabled={i === 0}
            expanded={i === 0 ? true : undefined}
          >
            {`${item.label} Content`}
          </Accordion.Item>
        ))}
      </Accordion>
    </Wrapper>,
  );

  items?.forEach((item) => fireEvent.click(screen.getByLabelText(item.label)));
  await waitFor(() => container.querySelectorAll('[aria-expanded="true"]'));
  expect(container.querySelectorAll('[aria-expanded="true"]').length).toEqual(2);
});
