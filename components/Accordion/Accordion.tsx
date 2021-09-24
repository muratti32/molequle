import React from 'react';
import type { AccordionItemProps } from './AccordionItem';
import { AccordionProvider } from './AccordionProvider';
import AccordionItem from './AccordionItem';

export interface AccordionProps {
  allowMultiple?: boolean;
}

const Accordion: React.FC<AccordionProps> & { Item: React.FC<AccordionItemProps> } = ({
  children,
  allowMultiple = true,
}) => {
  const Container = allowMultiple ? React.Fragment : AccordionProvider;

  require('react-dom');
  // @ts-ignore
  window.React2 = require('react');
  // @ts-ignore
  // console.log(window.React1 === window.React2);

  return <Container>{children}</Container>;
};

Accordion.Item = AccordionItem;

export default Accordion;
