import React, { ReactNode, useContext } from "react";
import { create } from "zustand";

type GameStoreState = {};

const useGameStore = create<GameStoreState>((set, get) => ({}));

type State = {};

const GameContext = React.createContext<State>(undefined);

type GameProps = {} & React.PropsWithChildren;

export const GameProvider: React.FunctionComponent<GameProps> = ({
  children,
}) => {
  return <GameContext.Provider value={{}} children={children} />;
};

export const useGame = (): State => useContext(GameContext);
