const isServer = () => {
  return typeof window === "undefined" && typeof global !== "undefined";
};

type ViewportSize = Readonly<{ width: number; height: number }>;

export const getViewportSize = (): ViewportSize => {
  if (isServer()) {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};
