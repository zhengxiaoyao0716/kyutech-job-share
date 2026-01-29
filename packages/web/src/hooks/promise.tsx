import { useEffect, useState, type ReactNode } from "react";

export function usePromise<T>(promise: Promise<T>, init: T) {
  const [state, setState] = useState(init);
  useEffect(() => {
    promise.then((value) => setState(value));
  }, []);
  return state;
}

export function Lazy<T>({
  task,
  children,
}: {
  task: () => Promise<T>;
  children: (value: T) => ReactNode;
}) {
  const [state, setState] = useState<T | null>(null);
  useEffect(() => {
    task().then((value) => setState(value));
  }, []);
  return state ? children(state) : null;
}
