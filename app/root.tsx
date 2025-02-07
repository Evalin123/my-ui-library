import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import styles from "./tailwind.css?url";

import type { LinksFunction } from "@remix-run/node";
import Button from "./components/Button";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
