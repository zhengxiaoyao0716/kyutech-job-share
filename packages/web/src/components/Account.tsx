import FilterTag, { useFilterTags } from "./FilterTag";
import PinCard from "./PinCard";

const Account = ({
  name,
  cls,
  tags,
  intro,
}: {
  name: string;
  cls: string | number;
  tags: string[];
  intro: string;
}) => {
  const [tagsNow, addTag] = useFilterTags();
  const hitTags = (() => {
    const tagSet = new Set(tags);
    return new Set(tagsNow.filter((tag) => tagSet.has(tag)));
  })();
  if (tagsNow.length > 0 && hitTags.size <= 0) return null;

  return (
    <PinCard>
      <h2>
        {name} | <span>{cls} 年卒</span>
      </h2>
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
      <div>
        <p>{intro}</p>
      </div>
    </PinCard>
  );
};
export default Account;
