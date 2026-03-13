export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const sleepUntilDocumentReady = async (
  selector: string,
  timeout = 10,
): Promise<Element | null> => {
  const start = performance.now();

  while (!document.querySelector(selector)) {
    if (performance.now() - start > timeout * 1000) return null;
    await sleep(50);
  }

  return document.querySelector(selector);
};

export const getOrCreateAppRoot = (
  container: HTMLElement,
  id: string,
): HTMLElement => {
  const existing = container.querySelector<HTMLElement>(`#${id}`);
  if (existing) return existing;

  const root = document.createElement("div");
  root.id = id;
  container.append(root);
  return root;
};

export const attachStyle = (
  parent: Element | ShadowRoot,
  css: string,
): HTMLStyleElement => {
  const style = document.createElement("style");
  style.textContent = css;
  parent.appendChild(style);
  return style;
};