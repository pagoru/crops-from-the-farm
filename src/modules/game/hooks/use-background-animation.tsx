import React, { useContext, useEffect, useRef } from "react";
import { useTicker } from "shared/hooks";
import { TickerQueue } from "@oh/queue";
import { useEvents } from "@openhotel/pixi-components";
import { CustomEvent } from "shared/enums";

type State = {};

const BackgroundAnimationContext = React.createContext<State>({});

type BackgroundAnimationProps = {} & React.PropsWithChildren;

export const BackgroundAnimationProvider: React.FunctionComponent<
  BackgroundAnimationProps
> = ({ children }) => {
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

  return <BackgroundAnimationContext.Provider value={{}} children={children} />;
};

export const useBackgroundAnimation = (): State =>
  useContext(BackgroundAnimationContext);
