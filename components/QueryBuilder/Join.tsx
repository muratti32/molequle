import { Button } from '@pasha28198/molequle-web-common';
import React from 'react';

interface JoinProps {
  type: 'AND' | 'OR' | string;
  onToggle: () => void;
}

const Join = ({ type, onToggle }: JoinProps) => {
  return (
    <Button variant='inline' onClick={() => onToggle()}>
      {type?.toLowerCase()}
    </Button>
  );
};

export default React.memo(Join);
