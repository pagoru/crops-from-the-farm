import React, { useMemo } from "react";
import { NesterComponent } from "shared/components";
import { AppComponent } from "./app.component.tsx";
import { InitialLoaderComponent } from "./initial-loader.component.tsx";
import { CoreLoaderComponent } from "./core-loader.component.tsx";
import { RouterProvider, TickerProvider } from "shared/hooks";

export const ApplicationComponent = () => {
  const providers = useMemo(
    () => [
      //
      AppComponent,
      TickerProvider,
      InitialLoaderComponent,
      CoreLoaderComponent,
      RouterProvider,
    ],
    [],
  );

  return <NesterComponent components={providers} />;
};
