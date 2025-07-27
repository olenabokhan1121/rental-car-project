import css from "./Layout.module.css";
import { Suspense } from "react";

import Header from "../Header/Header";


export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className={css.container}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      
    </div>
  );
};