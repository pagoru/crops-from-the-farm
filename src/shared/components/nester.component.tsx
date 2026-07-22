import React, { useMemo } from "react";

type Props = {
  components: React.FC<React.PropsWithChildren<any>>[];
} & React.PropsWithChildren;

export const NesterComponent: React.FC<Props> = ({ components, children }) => {
  const renderComponents = useMemo(
    () =>
      components.reduceRight((children: unknown, CurrentComponent, index) => {
        // Pass children as the inner component, add a key to avoid React warnings
        return <CurrentComponent key={index} children={children} />;
      }, children),
    [components, children],
  );

  // @ts-ignore
  return <>{renderComponents}</>;
};
