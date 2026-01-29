import { useState, type FormEvent } from "react";
import { MdClose } from "react-icons/md";
import { useParams } from "../hooks/history";
import { Lazy } from "../hooks/promise";
import { pullTags, type TagKind } from "../services/tags";
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
  checked = false,
  handler,
}: {
  value: string;
  style?: "border" | "shadow";
  checked?: boolean;
  handler: (value: string) => void;
}) => (
  <label className={[css.tag, css[style]].join(" ")}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(_) => handler(value)}
    ></input>
    <span>
      #{value}
      {checked ? <MdClose /> : null}
    </span>
  </label>
);

FilterTag.List = () => {
  const [tags, _addTag, delTag] = useFilterTags();
  return (
    <>
      {tags.map((tag) => (
        <FilterTag key={tag} value={tag} handler={delTag} />
      ))}
    </>
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
FilterTag.Gallery = ({ kind }: { kind: TagKind }) => {
  const [params, setParams] = useParams();
  const expanded = params.has("tag.expand");
  const [tags, setTags] = useState(new Set(params.getAll("tag")));
  if (!expanded) return null;

  const addTag = (value: string) =>
    setTags((tags) => {
      tags.add(value);
      return new Set(tags);
    });
  const delTag = (value: string) =>
    setTags((tags) => {
      tags.delete(value);
      return new Set(tags);
    });
  const customTag = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event.currentTarget);
    const search = data.get("search")?.toString().trim();
    if (search) addTag(search);
  };

  return (
    <Modal>
      <div className={css.gallery}>
        <h2>タグを追加</h2>
        <div className={css.tags}>
          {Array.from(tags, (value) => (
            <FilterTag
              key={value}
              value={value}
              checked={true}
              handler={delTag}
            />
          ))}
        </div>
        <div className={css.tags}>
          <Lazy task={() => pullTags(kind)}>
            {(value) =>
              value.map((value, i) =>
                tags.has(value) ? null : (
                  <FilterTag
                    key={i}
                    value={value}
                    checked={false}
                    handler={addTag}
                  />
                ),
              )
            }
          </Lazy>
        </div>
        <div className={css.menu}>
          <span className={css.pad} />
          <form className={css.search} onSubmit={customTag}>
            <span>#</span>
            <input name="search" />
            <button type="submit">+</button>
          </form>
          <span className={css.pad} />
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
                params.delete("tag");
                params.delete("tag.expand");
                tags.forEach((value) => params.append("tag", value));
                return params;
              })
            }
          >
            絞り込む
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterTag;
