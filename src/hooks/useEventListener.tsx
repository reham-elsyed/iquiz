import React, { useEffect, useRef } from "react";
type useEventListenerProps = {
  action: string;
  handler: (event?: Event | KeyboardEvent) => void;
  dependency?: any[];
  targetRef?: React.RefObject<HTMLElement>;
  target?: Window | Document | HTMLElement | null;

};
export default function useEventListener({
  action,
  handler,
  dependency,
  targetRef,
  target,
}: useEventListenerProps) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    console.log("ref update");
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const resolvedTarget = targetRef?.current ?? target ?? window;

    const handler = (event: Event) => handlerRef.current(event);
    if (!target?.addEventListener) return;
    resolvedTarget.addEventListener(action, handler);
    return () => {
      resolvedTarget.removeEventListener(action, handler);
    };
  }, [target, targetRef?.current, action, ...dependency ?? []]);
}
