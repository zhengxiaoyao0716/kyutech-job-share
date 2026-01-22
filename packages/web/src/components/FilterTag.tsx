import { useParams } from "../hooks/history";
import css from "./FilterTag.module.css";
import { Modal } from "./Modal";

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

const FilterTag = ({
  value,
  style = "border",
}: {
  value: string;
  style?: "border" | "shadow" | "checker";
}) => {
  const [tags, addTag, delTag] = useFilterTags();
  const checked = tags.includes(value);
  return (
    <label className={[css.tag, css[style]].join(" ")}>
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

FilterTag.Expand = () => {
  const [, setParams] = useParams();
  return (
    <button
      className={css.expand}
      title="タグを追加"
      onClick={() =>
        setParams((params) => [...params.entries(), ["tag.expand", ""]])
      }
    >
      +
    </button>
  );
};
FilterTag.Gallery = () => {
  const [params, setParams] = useParams();
  const expanded = params.has("tag.expand");
  if (!expanded) return null;
  return (
    <Modal>
      <div className={css.gallery}>
        <button
          onClick={() =>
            setParams((params) => {
              params.delete("tag.expand");
              return params;
            })
          }
        >
          戻る
        </button>
        <button
          onClick={() =>
            setParams((params) => {
              params.delete("tag.expand");
              return params;
            })
          }
        >
          絞り込む
        </button>
      </div>
    </Modal>
  );
};

export default FilterTag;
