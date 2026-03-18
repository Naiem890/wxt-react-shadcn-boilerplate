export const SELECTOR = {
  LINKEDIN: {
    APP_ELEMENT: "sales-sniper",
    get APP_ELEMENT_ROOT() {
      return `${this.APP_ELEMENT}-root`;
    },
    get MAIN_ANCHOR() {
      return `[data-id*="urn:li:activity:"]:not(:has(${this.APP_ELEMENT}))`;
    },
  },
};
