import { useCallback, useRef } from "react";

// https://chatgpt.com/canvas/shared/67b07a157cf48191ad839ccde494ab86
export function useDebounce<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, delay: number = 500) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  // fonskiyonu 2.kez çalıştırdında return kısmına iniyorsun
  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}
