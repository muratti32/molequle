import React from "react";
import { ThemeProvider } from "@emotion/react";
import type { Theme } from "@pasha28198/molequle-web-common";
import { GlobalStyles, NotificationProvider } from "@pasha28198/molequle-web-common";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { Hydrate } from "react-query/hydration";

interface ProviderProps {
  theme: Theme;
  queryCache: QueryCache;
  dehydratedState?: unknown;
}

const Provider: React.FC<ProviderProps> = ({ theme, children, dehydratedState }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <NotificationProvider>
        <ReactQueryCacheProvider>
          <Hydrate state={dehydratedState}>{children}</Hydrate>
          <ReactQueryDevtools />
        </ReactQueryCacheProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default Provider;
