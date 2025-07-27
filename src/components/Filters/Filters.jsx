import { useState } from "react";
import styles from "./Filters.module.css";
import { formatMileage } from "../../utils.js";
const Filters = ({ cars, prices, onChange, onApply }) => {
  const [filters, setFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "number" ? String(value) : value,
    }));
  };
  const handleSearchClick = () => {
    onChange(filters); // передаємо фільтри в CatalogPage
    onApply();
  };

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.dropdownContent}>
        <label>
          Car brand
          <select
            name="brand"
            className={styles.filterSelect}
            value={filters.brand}
            onChange={handleInputChange}
          >
            <option value="">Choose a brand</option>
            {cars.map((veh) => (
              <option key={veh} value={veh}>
                {veh}
              </option>
            ))}
          </select>
        </label>
        <label>
          Price/ 1 hour
          <select
            name="rentalPrice"
            className={styles.filterSelect}
            value={filters.rentalPrice}
            onChange={handleInputChange}
          >
            <option value="">Choose a price</option>
            {prices.map((veh) => (
              <option key={veh} value={veh}>
                {veh}
              </option>
            ))}
          </select>
        </label>
        <label>
          Сar mileage / km
          <input
            type="number"
            name="minMileage"
            value={filters.minMileage}
            onChange={handleInputChange}
            placeholder="From"
          />
          <span className={styles.mileagePreview}>
            {formatMileage(filters.minMileage)}
          </span>
        </label>
        <label>
          <input
            type="number"
            name="maxMileage"
            value={filters.maxMileage}
            onChange={handleInputChange}
            placeholder="To"
          />
          <span className={styles.mileagePreview}>
            {formatMileage(filters.maxMileage)}
          </span>
        </label>
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </div>
  );
};

export default Filters;
