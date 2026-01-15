import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface HistoryState {
  params: URLSearchParams;
}
const HistoryStateContext = createContext(
  undefined as never as [HistoryState, Dispatch<SetStateAction<HistoryState>>]
);

export const History = ({
  children,
}: {
  children: ReactNode | ((value: HistoryState) => ReactNode);
}) => {
  const [state, setState] = useState<HistoryState>({
    ...history.state,
    params: new URLSearchParams(location.search),
  });

  // update history state
  useEffect(() => {
    const search = state.params.toString();
    if (search === location.search.slice(1)) return;
    const url = new URL(location.href);
    url.search = `?${search}`;
    history.pushState(history.state, "", url);
  }, [state.params]);
  // listen history state
  useEffect(() => {
    const handle = (_event: PopStateEvent) => {
      const params = new URLSearchParams(location.search);
      setState((state: HistoryState) => ({ ...state, params }));
    };
    window.addEventListener("popstate", handle);
    return () => window.removeEventListener("popstate", handle);
  }, []);

  return (
    <HistoryStateContext.Provider value={[state, setState]}>
      {children instanceof Function ? children(state) : children}
    </HistoryStateContext.Provider>
  );
};

export const useParams = (): [
  URLSearchParams,
  Dispatch<
    (
      params: URLSearchParams
    ) => ConstructorParameters<typeof URLSearchParams>[0]
  >
] => {
  const [state, setState] = useContext(HistoryStateContext)!;
  return [
    state.params,
    (action) =>
      setState((state: HistoryState) => {
        const params = new URLSearchParams(action(state.params));
        params.sort();
        return { ...state, params };
      }),
  ];
};
