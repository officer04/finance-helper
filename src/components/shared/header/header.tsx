import { FC } from "react";

import { HeaderBase } from "./header-base";
import { HeaderAuth } from "./header-auth";

export const Header: FC = () => {
  const isAuth = false;
  const getHeader = () => {
    if (!isAuth) {
      return <HeaderBase />;
    } else {
      return <HeaderAuth />;
    }
  };

  return getHeader();
};


