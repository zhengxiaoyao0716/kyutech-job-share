import { useParams } from "../hooks/history";
import css from "./FilterTag.module.css";

export const useFilterTags = () => {
  const [params, setParams] = useParams();
  return [
    params.getAll("tag"),
    /*add*/ (value: string) =>
      setParams((params) => [...params.entries(), ["tag", value]]),
    /*del*/ (value?: string) =>
      setParams((params) => {
        params.delete("tag", value);
        return params;
      }),
  ] as const;
};

const FilterTag = ({ value }: { value: string }) => {
  const [tags, addTag, delTag] = useFilterTags();
  const checked = tags.includes(value);
  return (
    <label className={css.tag}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          if (e.currentTarget.checked) addTag(value);
          else delTag(value);
        }}
      ></input>
      <span>#{value}</span>
    </label>
  );
};
export default FilterTag;
