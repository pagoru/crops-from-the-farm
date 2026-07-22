import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useTicker } from "shared/hooks";
import { TickerQueue } from "@oh/queue";
import { useEvents } from "@openhotel/pixi-components";
import { CustomEvent } from "shared/enums";

type State = {
  getSway: (time?: number, seed?: number) => number;
};

const SwayAnimationContext = React.createContext<State>({
  getSway: () => 0,
});

type SwayAnimationProps = {
  amplitude?: number;
} & React.PropsWithChildren;

export const SwayAnimationProvider: React.FunctionComponent<
  SwayAnimationProps
> = ({ children, amplitude = 3 }) => {
  const { emit } = useEvents();
  const { add } = useTicker();

  const timeRef = useRef<number>(0);

  useEffect(() => {
    const consumedDelta = 600;
    let accDelta = 0;

    const onRemoveCustomTicker = add({
      type: TickerQueue.CUSTOM,
      onFunc: (delta: number) => {
        timeRef.current += delta / consumedDelta;

        if (accDelta > consumedDelta) {
          emit(CustomEvent.SWAY_ANIMATION, {
            time: timeRef.current,
          });
          accDelta -= consumedDelta;
        }
        accDelta += delta;
      },
    });

    return () => {
      onRemoveCustomTicker();
    };
  }, [add, emit]);

  const getSway = useCallback(
    (time: number = timeRef.current, seed = 0) =>
      Math.sin(time + seed) * amplitude,
    [amplitude],
  );

  return (
    <SwayAnimationContext.Provider
      value={{
        getSway,
      }}
      children={children}
    />
  );
};

export const useSwayAnimation = (): State => useContext(SwayAnimationContext);
