import { forwardRef } from "react";
import AutoCard from "../AutoCard/AutoCard";
import styles from "./AutoList.module.css";

const AutoList = forwardRef(({ auto, loading, startIndex }, ref) => {
  if (!loading && auto.length === 0) {
    return <p className={styles.noText}>No cars found.</p>;
  }

  return (
    <div className={styles.list}>
      {auto.map((car, index) => {
        const isFirstNew = startIndex !== null && index === startIndex;

        return (
          <AutoCard key={car.id} ref={isFirstNew ? ref : null} car={car} />
        );
      })}
    </div>
  );
});
AutoList.displayName = "AutoList";
export default AutoList;
