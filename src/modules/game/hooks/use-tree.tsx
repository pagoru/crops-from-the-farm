import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTicker } from "shared/hooks";
import { TickerQueue } from "@oh/queue";

type State = {
  getSway: (seed?: number) => number;
};

const TreeContext = React.createContext<State>({
  getSway: () => 0,
});

type TreeProps = {
  amplitude?: number;
} & React.PropsWithChildren;

export const TreeProvider: React.FunctionComponent<TreeProps> = ({
  children,
  amplitude = 3,
}) => {
  const { add } = useTicker();

  const timeRef = useRef<number>(0);
  const [update, setUpdate] = useState<number>(0);

  useEffect(() => {
    const consumedDelta = 600;
    let accDelta = 0;

    const onRemoveCustomTicker = add({
      type: TickerQueue.CUSTOM,
      onFunc: (delta: number) => {
        timeRef.current += delta / consumedDelta;
        // setSway(Math.trunc(Math.sin(timeRef.current) * amplitude));

        if (accDelta > consumedDelta) {
          setUpdate(Date.now());
          accDelta -= consumedDelta;
        }
        accDelta += delta;
      },
    });

    return () => {
      onRemoveCustomTicker();
    };
  }, [add, setUpdate]);

  const getSway = useCallback(
    (seed = 0) => Math.sin(timeRef.current + seed) * amplitude,
    [update, amplitude],
  );

  return (
    <TreeContext.Provider
      value={{
        getSway,
      }}
      children={children}
    />
  );
};

export const useTree = (): State => useContext(TreeContext);
