import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./CatalogPage.module.css";

import AutoList from "../../components/AutoList/AutoList.jsx";
import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loading from "../../components/Loading/Loading.jsx";
import { fetchAuto } from "../../redux/auto/operations.js";
import { clearAuto } from "../../redux/auto/slice.js";
import {
  setBrand,
  setRentalPrice,
  setMinMileage,
  setMaxMileage,
} from "../../redux/filters/slice.js";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auto.loading);
  const cars = useSelector((state) =>
    Array.isArray(state.auto.items) ? state.auto.items : []
  );
  const brands = Array.from(new Set(cars.map((car) => car.brand))).sort(
    (a, b) => a.localeCompare(b)
  );
  const prices = Array.from(new Set(cars.map((car) => car.rentalPrice))).sort(
    (a, b) => a - b
  );

  const totalItems = useSelector((state) => state.auto.totalItems);
  const searchQuery = useSelector((state) => state.filters);
  const [startIndex, setStartIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const autoListRef = useRef(null);

  useEffect(() => {
    dispatch(clearAuto());

    dispatch(
      fetchAuto({
        page,
        append: page > 1 && true,
      })
    ).unwrap();
  }, [dispatch, page, searchQuery]);

  const handleApplyFilters = () => {
    dispatch(setBrand(selectedFilters.brand));
    dispatch(setRentalPrice(selectedFilters.rentalPrice));
    dispatch(setMinMileage(selectedFilters.minMileage));
    dispatch(setMaxMileage(selectedFilters.maxMileage));
  };
  const handleChangeFilters = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    setStartIndex((nextPage - 1) * 12);
  };

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading]);

  useEffect(() => {
    if (
      !loading &&
      startIndex !== null &&
      cars[startIndex] &&
      autoListRef.current
    ) {
      autoListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setStartIndex(null);
    }
  }, [loading, cars, startIndex]);
  const autoToShow = cars.slice(0, page * 12);

  return (
    <div className={css.homePage}>
      <section className={css.container}>
        <Filters
          cars={brands}
          prices={prices}
          onChange={handleChangeFilters}
          onApply={handleApplyFilters}
        />
        {loading && <Loading />}
        <AutoList
          auto={autoToShow}
          loading={false}
          ref={autoListRef}
          startIndex={startIndex}
        />
        {loading && (
          <div className={css.loaderWrapper}>
            <Loading />
          </div>
        )}
        {
          <div>
            {page * 12 < totalItems && !loading && (
              <LoadMoreBtn onClick={loadMore} />
            )}
          </div>
        }
      </section>
    </div>
  );
}
