import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, Scripts } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const styles = "/assets/tailwind-CAWyNvWD.css";
const links = () => [{ rel: "stylesheet", href: styles }];
function App() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "data:image/x-icon;base64,AA" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Radio = ({
  label,
  checked,
  disabled,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    "label",
    {
      className: classNames(
        "inline-flex items-center space-x-2 cursor-pointer",
        { "opacity-50 cursor-not-allowed": disabled },
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            className: "hidden",
            checked,
            disabled,
            ...props
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: classNames(
              "w-5 h-5 border-1 rounded-full flex items-center justify-center",
              {
                "border-6 border-blue-500": checked,
                "border-gray-300": !checked
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: label })
      ]
    }
  );
};
const RadioGroup = ({
  options,
  value,
  onChange
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex space-x-4", children: options.map((option) => /* @__PURE__ */ jsx(
    Radio,
    {
      label: option.label,
      checked: value === option.value,
      onChange: () => onChange(option.value),
      disabled: option.disabled
    },
    option.value
  )) });
};
const SearchOutlined = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    height: "18",
    viewBox: "0 0 50 50",
    width: "18",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        className: "opacity-75",
        fill: "black",
        d: "M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
      }
    )
  }
);
function RadioDemo() {
  const [selectedValue, setSelectedValue] = useState(1);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "p-8 flex gap-4", children: /* @__PURE__ */ jsx(
    RadioGroup,
    {
      value: selectedValue,
      onChange: setSelectedValue,
      options: [
        {
          value: 1,
          label: /* @__PURE__ */ jsxs("div", { className: "gap-1 flex items-center", children: [
            /* @__PURE__ */ jsx(SearchOutlined, { style: { fontSize: 18 } }),
            "Search"
          ] })
        },
        { value: 2, label: "Option 2" },
        { value: 3, label: "Option 3", disabled: true }
      ]
    }
  ) }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RadioDemo
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(classNames(inputs));
}
const buttonVariants = cva(
  "ring-offset-background inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "border-none bg-black text-white hover:bg-black/50",
        outlined: "bg-color-midnight text-black border-black border hover:bg-black/30",
        dashed: "bg-inherit text-black border border-dashed hover:bg-black/30",
        filled: "border-none bg-black/25 text-black hover:bg-black/50",
        text: "bg-inherit text-black border-none hover:bg-black/30",
        link: "bg-inherit border-none text-black hover:text-black/50"
      },
      size: {
        small: "h-9 px-3 py-1 text-sm",
        medium: "h-10 px-4 py-2 text-base",
        large: "h-11 px-5 py-3 text-lg",
        icon: "h-10 w-10"
      },
      shape: {
        square: "rounded-md",
        circle: "rounded-full"
      }
    },
    defaultVariants: {
      variant: "solid",
      size: "medium",
      shape: "square"
    }
  }
);
const Button = ({
  href,
  target,
  onClick,
  disabled = false,
  children,
  variant,
  size,
  shape,
  className,
  ...props
}) => {
  if (href) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        target,
        className: cn(buttonVariants({ variant, size, shape }), className),
        onClick: disabled ? (e) => e.preventDefault() : onClick,
        "aria-disabled": disabled,
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: cn(buttonVariants({ variant, size, shape }), className),
      disabled,
      type: "button",
      ...props,
      children
    }
  );
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "p-8 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsx(Button, { variant: "solid", children: "Solid" }),
      /* @__PURE__ */ jsx(Button, { variant: "outlined", children: "Outlined" }),
      /* @__PURE__ */ jsx(Button, { variant: "dashed", children: "Dashed" }),
      /* @__PURE__ */ jsx(Button, { variant: "filled", children: "Filled" }),
      /* @__PURE__ */ jsx(Button, { variant: "text", type: "submit", children: "Text" }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "link",
          href: "https://tailwindcss.com/docs/installation/using-vite",
          children: [
            /* @__PURE__ */ jsx(SearchOutlined, {}),
            "Link"
          ]
        }
      ),
      /* @__PURE__ */ jsx(Button, { disabled: true, variant: "solid", children: "Disabled" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row flex-wrap gap-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "bg-gray-500",
          shape: "circle",
          size: "icon",
          variant: "solid",
          children: /* @__PURE__ */ jsx(SearchOutlined, {})
        }
      ),
      /* @__PURE__ */ jsx(Button, { shape: "circle", size: "icon", variant: "outlined", children: /* @__PURE__ */ jsx(SearchOutlined, {}) }),
      /* @__PURE__ */ jsx(Button, { shape: "circle", size: "icon", variant: "dashed", children: /* @__PURE__ */ jsx(SearchOutlined, {}) }),
      /* @__PURE__ */ jsx(Button, { shape: "circle", size: "icon", variant: "filled", children: /* @__PURE__ */ jsx(SearchOutlined, {}) }),
      /* @__PURE__ */ jsx(Button, { shape: "circle", size: "icon", variant: "text", children: /* @__PURE__ */ jsx(SearchOutlined, {}) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          shape: "circle",
          size: "icon",
          variant: "link",
          href: "https://tailwindcss.com/docs/installation/using-vite",
          target: "_blank",
          children: /* @__PURE__ */ jsx(SearchOutlined, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row flex-wrap gap-4", children: [
      /* @__PURE__ */ jsx(Button, { className: "bg-red-600 hover:bg-indigo-700", variant: "solid", children: "Solid" }),
      /* @__PURE__ */ jsx(Button, { variant: "dashed", children: "Search" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row flex-wrap gap-4", children: [
      /* @__PURE__ */ jsx(Button, { size: "small", variant: "solid", children: "Solid" }),
      /* @__PURE__ */ jsx(Button, { size: "medium", variant: "solid", children: "Solid" }),
      /* @__PURE__ */ jsx(Button, { size: "large", variant: "solid", children: "Solid" })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BqFK1pa3.js", "imports": ["/assets/jsx-runtime-CLUdW5VC.js", "/assets/index-C3SifoeI.js", "/assets/components-CP0FHthH.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root--nPv5Civ.js", "imports": ["/assets/jsx-runtime-CLUdW5VC.js", "/assets/index-C3SifoeI.js", "/assets/components-CP0FHthH.js"], "css": [] }, "routes/radio-demo": { "id": "routes/radio-demo", "parentId": "root", "path": "radio-demo", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/radio-demo-BTOPKfV4.js", "imports": ["/assets/jsx-runtime-CLUdW5VC.js", "/assets/index-C3SifoeI.js", "/assets/searchOutlined-lqpNnImW.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BnMJMAtu.js", "imports": ["/assets/jsx-runtime-CLUdW5VC.js", "/assets/searchOutlined-lqpNnImW.js"], "css": [] } }, "url": "/assets/manifest-5f200912.js", "version": "5f200912" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/radio-demo": {
    id: "routes/radio-demo",
    parentId: "root",
    path: "radio-demo",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
