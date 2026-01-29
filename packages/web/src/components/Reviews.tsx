import FilterTag from "./FilterTag";
import PinCard from "./PinCard";
import Review from "./Review";
import css from "./Reviews.module.css";

const Reviews = ({ name: name }: { name: string }) => (
  <>
    <PinCard>
      <h2>
        <span>タグで絞り込む</span>
        <span>
          <FilterTag.List />
          <FilterTag.Expand />
        </span>
      </h2>
    </PinCard>
    <br />
    <PinCard>
      <div className={css.intro}>
        <div>
          <h2>{name}</h2>
          <p>
            会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介
          </p>
        </div>
        <img src="/company-map.png" />
      </div>
    </PinCard>
    <br />
    <h2>レビュー</h2>
    <div className={css.reviews}>
      <Review name="情報工科学 太郎" />
      <Review name="情報工科学 太郎" />
      <Review name="情報工科学 太郎" />
      <Review name="情報工科学 太郎" />
      <Review name="情報工科学 太郎" />
      <Review name="情報工科学 太郎" />
    </div>
    <br />
    <br />
    <div className={css.menu}>
      <button>レビューを投稿する (Post a Review) &gt;</button>
    </div>
  </>
);
export default Reviews;
