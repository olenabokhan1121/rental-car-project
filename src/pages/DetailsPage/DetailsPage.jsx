import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./DetailsPage.module.css";
import Loader from "../../components/Loading/Loading";

export default function DetailsPage() {
  const { id } = useParams();

  const { items, loading, error } = useSelector((state) => state.auto);

  const auto = useMemo(() => {
    return items.find((r) => r.id === id);
  }, [items, id]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!auto) {
    return <p>Car not found 😢</p>;
  }
  return (
    <div className={styles.wrapper}>
      <img src={auto.img} alt={auto.brand} className={styles.image} />
    </div>
  );
}
