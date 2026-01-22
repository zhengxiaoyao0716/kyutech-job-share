import { useParams } from "../hooks/history";
import css from "./Company.module.css";
import FilterTag from "./FilterTag";
import PinCard from "./PinCard";

export const useCompany = () => {
  const [params, setParams] = useParams();
  return [
    params.get("company"),
    (value: string) => setParams(() => `company=${value}`),
  ] as const;
};

const Company = ({ name }: { name: string }) => {
  return (
    <PinCard>
      <h2>{name}</h2>
      <div>
        <span>評価：</span>
        <span>⭐️⭐️⭐️⭐️⭐️</span>
      </div>
      <div>
        {["福岡", "2weeks", "対面", "企業"].map((value, i) => (
          <FilterTag style="shadow" value={value} key={i} />
        ))}
      </div>
      <br />
      <hr />
      <a href={`?company=${name}`} className={css.link}>
        <b>レビューを見る (See Reviews)</b>
        <span>↗️</span>
      </a>
    </PinCard>
  );
};
export default Company;
