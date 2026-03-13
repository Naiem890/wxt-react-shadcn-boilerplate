import "arrive";
import type { ArriveOptions } from "@/types/arrive";

export const watchForElement = (
  selector: string,
  callback: (el: HTMLElement) => void,
  options: ArriveOptions = {},
): (() => void) => {
  const config = {
    existing: options.existing ?? true,
    onceOnly: options.onceOnly ?? false,
    fireOnAttributesModification: options.fireOnAttributesModification ?? false,
  };

  const handler = (element: Element) => callback(element as HTMLElement);

  document.arrive(selector, config, handler);

  return () => document.unbindArrive(selector, handler);
};
