import React, { useEffect, useRef } from "react";
type useEventListenerProps = {
  action: string;
  handler: (event?: Event | KeyboardEvent) => void;
};
export default function useEventListener({
  action,
  handler,
}: useEventListenerProps) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    console.log("ref update");
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handler = (event: Event) => handlerRef.current(event);
    window.addEventListener(action, handler);
    return () => {
      window.removeEventListener(action, handler);
    };
  }, []);
}
