import { MdOutlineAccountCircle } from "react-icons/md";
import PinCard from "./PinCard";
import css from "./Review.module.css";
import StartBar from "./StartBar";

const Review = ({ name }: { name: string }) => (
  <PinCard>
    <div className={css.review}>
      <span className={css.avatar}>
        <MdOutlineAccountCircle />
      </span>
      <div>
        <h3>{name}</h3>
        <StartBar value={3.5} />
        <p>
          評価内容評価内容評価内容評価内容評価内容評価内容評価内容評価内容評価内容評価内容評価内容評価内容評価内容評価内容評価内容評価内容
        </p>
      </div>
    </div>
  </PinCard>
);
export default Review;
