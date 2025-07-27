import css from "../Loading/Loading.module.css";
export default function Loading() {
  return (
    <div className={css.loader}>
      <div className={css.spinner}></div>
    </div>
  );
}
