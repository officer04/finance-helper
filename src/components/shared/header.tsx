import React, { FC } from 'react';
import { cn } from '../../lib/utils';

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  return <header className={cn('', className)}>
    header
    <hr/>
  </header>;
};
