import { useState } from "react";
import styles from "./Filters.module.css";
import { inputformatMileage } from "../../utils.js";
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
    onApply(filters);
  };

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.dropdownContent}>
        <label className={styles.label}>
          <span className={styles.labelText}>Car brand</span>
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
        <label className={styles.label}>
          <span className={styles.labelText}>Price/ 1 hour</span>
          <div className={styles.selectWrapper}>
            <select
              name="rentalPrice"
              className={styles.nativeSelect}
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
            <div className={styles.customOverlay}>
              {filters.rentalPrice
                ? `To $${filters.rentalPrice}`
                : "Choose a price"}
            </div>
          </div>
        </label>
        <div>
          <label className={styles.label}>
            <span className={styles.labelText}>Сar mileage / km</span>
            <div className="input-group">
              <div className="input-box">
                <input
                  type="number"
                  name="minMileage"
                  value={filters.minMileage}
                  onChange={handleInputChange}
                  placeholder="From"
                />
                <span className={styles.mileagePreview}>
                  {`From
                  ${inputformatMileage(filters.minMileage)}`}
                </span>
              </div>
              <div className="input-box">
                <input
                  type="number"
                  name="maxMileage"
                  value={filters.maxMileage}
                  onChange={handleInputChange}
                  placeholder="To"
                />
                <span className={styles.mileagePreview}>
                  {`To
                  ${inputformatMileage(filters.maxMileage)}`}
                </span>
              </div>
            </div>
          </label>
        </div>
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </div>
  );
};

export default Filters;
