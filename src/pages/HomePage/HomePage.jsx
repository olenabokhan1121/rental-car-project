
import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";


export default function HomePage() {const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <section className={css.hero}>
      <div className={css.overlay}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.subtitle}>
          Comfortable, affordable and tailored to your journey
        </p>
        <button className={css.button} onClick={handleClick}>
          View Catalog
        </button>
      </div>
    </section>
  );
}