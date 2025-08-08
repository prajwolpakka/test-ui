"use client";

import * as Antd from "antd";
import { createRoot } from "react-dom/client";

const setRender = (Antd as any).unstableSetRender as
  | undefined
  | ((
      render: (
        node: React.ReactNode,
        container: Element | DocumentFragment,
      ) => () => Promise<void>,
    ) => any);

if (typeof setRender === "function") {
  setRender((node, container) => {
    const el = container as Element;
    (el as any)._reactRoot ||= createRoot(el);
    const root = (el as any)._reactRoot as ReturnType<typeof createRoot>;
    root.render(node as any);
    return async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      root.unmount();
    };
  });
}


