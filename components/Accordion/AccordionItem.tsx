import { ArrowDown, ArrowRight, Box, HStack, IconButton, useCollapse } from '@pasha28198/molequle-web-common';
import React, { useCallback, useEffect, useMemo } from 'react';

import { useAccordion } from './AccordionProvider';

export interface AccordionItemProps {
  label: any;
  id: string;
  expanded?: boolean;
  disabled?: boolean;
  start?: boolean;
}

type UseAccordionProps = Pick<AccordionItemProps, 'expanded' | 'id' | 'disabled' | 'start'>;
type UseAccordionContextProps = Pick<UseAccordionProps, 'expanded' | 'id'>;

const useAccordionContext = ({ expanded, id }: UseAccordionContextProps) => {
  const { expandedItemId, toggle } = useAccordion();
  const isControlled = typeof expanded === 'boolean';
  const finalState = React.useMemo(() => {
    if (isControlled) {
      return expanded;
    }
    if (expandedItemId) {
      return expandedItemId === id;
    }

    return undefined;
  }, [expanded, expandedItemId, id, isControlled]);

  return useMemo(
    () => ({
      expanded: finalState,
      onToggle: toggle,
    }),
    [finalState, toggle],
  );
};

export const useAccordionItem = ({ id, expanded: expandedProp, disabled, start = false }: UseAccordionProps) => {
  const { expanded, onToggle } = useAccordionContext({ expanded: expandedProp, id });
  const { toggle, containerProps, isOpen } = useCollapse(start);
  const isControlledOutside = Boolean(expanded) === expanded;
  const contentId = `${id}-content`;

  const handleToggleClick = useCallback(
    (forceState?: boolean) => {
      toggle();
      onToggle?.(id, typeof forceState === 'boolean' ? forceState : !isOpen); // Value is reversed because the toggle action was triggered but hook did not update yet
    },
    [id, isOpen, onToggle, toggle],
  );

  useEffect(() => {
    const needToSync = expanded !== isOpen;
    if (isControlledOutside && needToSync) {
      toggle(expanded);
    }
  }, [isControlledOutside, toggle, isOpen, expanded]);

  const labelProps = useMemo(
    () => ({
      htmlFor: id,
    }),
    [id],
  );

  const toggleProps = useMemo(
    () => ({
      id,
      'aria-expanded': isOpen,
      'aria-controls': contentId,
      disabled,
      onClick: () => handleToggleClick(),
    }),
    [contentId, disabled, handleToggleClick, id, isOpen],
  );

  const contentProps = useMemo(
    () => ({
      ...containerProps,
      id: contentId,
      role: 'region',
      'aria-labelledby': id,
    }),
    [containerProps, contentId, id],
  );

  return useMemo(
    () => ({
      labelProps,
      toggleProps,
      contentProps,
      isOpen,
      toggle: handleToggleClick,
    }),
    [contentProps, handleToggleClick, isOpen, labelProps, toggleProps],
  );
};

const AccordionItem: React.FC<AccordionItemProps> = ({ children, label, id, expanded, disabled, start }) => {
  const { contentProps, labelProps, toggleProps, isOpen } = useAccordionItem({
    id,
    expanded,
    disabled,
    start,
  });

  return (
    <Box>
      <HStack alignX='left' gap='XXS'>
        <label {...labelProps}>{label}</label>
        <IconButton title='Toggle content' {...toggleProps}>
          {isOpen ? <ArrowDown width='1rem' height='1rem' baseline /> : <ArrowRight width='1rem' height='1rem' />}
        </IconButton>
      </HStack>
      <Box {...contentProps}>
        <Box py='S'>{children}</Box>
      </Box>
    </Box>
  );
};

export default AccordionItem;
