import { MdOpenInNew } from "react-icons/md";
import { useParams } from "../hooks/history";
import css from "./Company.module.css";
import FilterTag, { useFilterTags } from "./FilterTag";
import PinCard from "./PinCard";
import StartBar from "./StartBar";

export const useCompany = () => {
  const [params, setParams] = useParams();
  return [
    params.get("company"),
    (value: string) => setParams(() => `company=${value}`),
  ] as const;
};

const Company = ({
  name,
  score,
  tags,
}: {
  name: string;
  score: number;
  tags: string[];
}) => {
  const [tagsNow, addTag] = useFilterTags();
  const hitTags = (() => {
    const tagSet = new Set(tags);
    return new Set(tagsNow.filter((tag) => tagSet.has(tag)));
  })();
  if (tagsNow.length > 0 && hitTags.size <= 0) return null;

  return (
    <PinCard>
      <h2>{name}</h2>
      <div>
        <span>評価：</span>
        <span>
          <StartBar value={score} />
        </span>
      </div>
      <div>
        {tags.map((value, i) => (
          <FilterTag
            style="shadow"
            value={value}
            key={i}
            handler={(value) => {
              if (!hitTags.has(value)) addTag(value);
            }}
          />
        ))}
      </div>
      <br />
      <hr />
      <a target="_blank" href={`?company=${name}`} className={css.link}>
        <b>レビューを見る (See Reviews)</b>
        <MdOpenInNew />
      </a>
    </PinCard>
  );
};
export default Company;
