import css from "./Layout.module.css";
import { Suspense } from "react";

import Header from "../Header/Header";

export const Layout = ({ children }) => {
  return (
    <div className={css.container}>
      <Header />
      <main>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </div>
  );
};
