import React, { useCallback, useContext, useEffect, useRef } from "react";
import { queue, QueueItemProps, ticker } from "@oh/queue";
import { QueueMutable } from "@oh/queue";

type State = {
  add: (props: QueueItemProps) => () => void;
};

const TickerContext = React.createContext<State>(undefined);

type ProviderProps = {} & React.PropsWithChildren;

export const TickerProvider: React.FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const tickerRef = useRef(ticker());
  const queueRef = useRef<QueueMutable>(null);

  const add = useCallback((props: QueueItemProps): (() => void) => {
    const index = queueRef.current.add(props);
    return () => queueRef.current.remove(index);
  }, []);

  useEffect(() => {
    queueRef.current = queue({
      onPause: tickerRef.current.pause,
      onResume: tickerRef.current.start,
    });

    tickerRef.current.onTick(({ delta }) => queueRef.current.tick(delta));

    window.addEventListener("visibilitychange", () => {
      document.hidden ? tickerRef.current.pause() : tickerRef.current.start();
    });
  }, []);

  return (
    <TickerContext.Provider
      value={{
        add,
      }}
      children={children}
    />
  );
};

export const useTicker = (): State => useContext(TickerContext);
