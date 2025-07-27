
import css from "../App/App.module.css";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout }  from "../Layout/Layout";
import Loading from "../Loading/Loading";
import HomePage from "../../pages/HomePage/HomePage";
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

const Details = lazy(() => import("../../pages/DetailsPage/DetailsPage"));

const Catalog = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
function App() {
  return (
    <div className={css.app}>
      <Layout>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/catalog" element={<Catalog/>} />
            <Route path="/catalog/:id" element={<Details/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </Suspense>
      </Layout>

    </div>
  );
};

export default App;
