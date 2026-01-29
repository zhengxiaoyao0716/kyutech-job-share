import { IconContext } from "react-icons";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";

const StartBar = ({ value }: { value: number }) => (
  <IconContext.Provider value={{ color: "#b29567", size: "1.2em" }}>
    {Array.from({ length: value }).map((_, i) => (
      <MdStar key={i} />
    ))}
    {Number.isInteger(value) ? null : <MdStarHalf />}
    {Array.from({ length: 5 - value }).map((_, i) => (
      <MdStarOutline key={5 - i} />
    ))}
  </IconContext.Provider>
);
export default StartBar;
