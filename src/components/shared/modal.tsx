import React, { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

type Props = {
  className?: string;
};

export const Modal: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return createPortal(
    <div className={cn('fixed top-0 left-0 right-0 bottom-0 bg-black/50', className)}>
      {children}
    </div>,
    document.body,
  );
};
