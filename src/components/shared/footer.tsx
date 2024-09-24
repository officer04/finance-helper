import React, { FC } from 'react';
import { cn } from '../../lib/utils';

interface Props {
  className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
  return <footer className={cn('', className)}>
    footer
  </footer>;
};
