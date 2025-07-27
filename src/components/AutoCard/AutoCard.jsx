import styles from "./AutoСard.module.css";

import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { createSelector } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteAutoAsync } from "../../redux/auto/operations.js";

import { clearAuto } from "../../redux/auto/slice.js";
import { selectFavorite } from "../../redux/auto/selectors.js";

const AutoCard = forwardRef(({ car }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    id,
    year,
    brand,
    model,
    type,
    img,
    rentalPrice,
    rentalCompany,
    address,
    mileage,
  } = car;

  const makeSelectIsFavorite = (id) =>
    createSelector([selectFavorite], (favorite) => favorite.includes(id));

  const isFavorite = useSelector(makeSelectIsFavorite(id));
  const handleToggle = async () => {
    try {
      await dispatch(toggleFavoriteAutoAsync({ id })).unwrap();
      if (isFavorite) {
        dispatch(clearAuto());
      }
    } catch (error) {
      if (!isFavorite) {
        toast.error("Failed to add to favorites 😢");
      } else {
        toast.error("Failed to remove from favorites 😢");
      }
    }
  };

  return (
    <div ref={ref} className={styles.Card}>
      <img src={img} alt={brand} className={styles.imageCard} />
      <button
        onClick={handleToggle}
        className={styles.heart}
        aria-label={isFavorite ? "Remove" : "Add to favorites"}
      >
        <svg width="16" height="16">
          <use
            href={
              isFavorite
                ? `/sprites/symbol-defs.svg#icon-Property-1Active`
                : `/sprites/symbol-defs.svg#icon-Property-1Default`
            }
          />
        </svg>
      </button>
      <div className={styles.cardDesc}>
        <h3 className={styles.title}>{`${brand} ${model}, ${year}`}</h3>
        <p className={styles.price}>{`$${rentalPrice}`}</p>
      </div>
      <div className={styles.inlineDetails}>
        <span>{address}</span>
        <span>{rentalCompany}</span>
        <span>{type}</span>
        <span>{mileage}</span>
      </div>

      <div className={styles.formButton}>
        <button
          className={styles.learnMoreButton}
          onClick={() => navigate(`/catalog/${id}`)}
        >
          Read more
        </button>
      </div>
    </div>
  );
});
AutoCard.displayName = "AutoCard";
export default AutoCard;
