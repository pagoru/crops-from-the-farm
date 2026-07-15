import React, { ReactNode, useContext } from "react";

type State = {};

const PlayerContext = React.createContext<State>(undefined);

type _TemplateProps = {
  children: ReactNode;
};

export const _TemplateProvider: React.FunctionComponent<_TemplateProps> = ({
  children,
}) => {
  return <PlayerContext.Provider value={{}} children={children} />;
};

export const _useTemplate = (): State => useContext(PlayerContext);
