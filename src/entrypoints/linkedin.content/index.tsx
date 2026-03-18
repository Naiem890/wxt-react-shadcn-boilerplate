import "@/assets/tailwind.css";
import { SELECTOR } from "@/config/dom";
import {
  attachStyle,
  getOrCreateAppRoot,
  sleepUntilDocumentReady,
} from "@/helper/helper";
import App from "@/components/App";
import { watchForElement } from "@/helper/dom-watcher";
import ReactDOM from "react-dom/client";

export default defineContentScript({
  matches: ["*://www.linkedin.com/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    console.log(" sales sniper ctx", ctx);

    // updateCommentButtonOnLinkedin(document, SELECTOR);

    async function mountUI(anchorEl: Element) {
      const ui = await createShadowRootUi(ctx, {
        name: SELECTOR.LINKEDIN.APP_ELEMENT,
        position: "inline",
        append: "after",
        anchor: anchorEl,
        onMount: (container) => {
          const app = getOrCreateAppRoot(
            container,
            SELECTOR.LINKEDIN.APP_ELEMENT_ROOT,
          );

          const root = ReactDOM.createRoot(app);
          root.render(<App />);
          return root;
        },
        onRemove: (root) => {
          root?.unmount();
        },
      });
      ui.mount();
    }

    // Mount on all existing posts
    await sleepUntilDocumentReady(SELECTOR.LINKEDIN.MAIN_ANCHOR);
    document.querySelectorAll(SELECTOR.LINKEDIN.MAIN_ANCHOR).forEach((el) => {
      mountUI(el);
    });

    // Watch for new posts and mount on each one
    const cleanup = watchForElement(
      SELECTOR.LINKEDIN.MAIN_ANCHOR,
      (el) => mountUI(el),
      { existing: false, onceOnly: false, fireOnAttributesModification: true },
    );

    console.log("✨ LinkedIn UI watcher initialized");

    window.addEventListener("beforeunload", cleanup);
  },
});
