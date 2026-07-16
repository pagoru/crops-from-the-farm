import React, { useContext } from "react";
import { create } from "zustand";

////////////////////////////////////////////////////////////////////////////////
type _TemplateStoreState = {};

//@ts-ignore
const _useTemplateStore = create<_TemplateStoreState>((set, get) => ({}));
////////////////////////////////////////////////////////////////////////////////

type State = {};

const _TemplateContext = React.createContext<State>(undefined);

type _TemplateProps = {} & React.PropsWithChildren;

export const _TemplateProvider: React.FunctionComponent<_TemplateProps> = ({
  children,
}) => {
  return <_TemplateContext.Provider value={{}} children={children} />;
};

export const _useTemplate = (): State => useContext(_TemplateContext);
