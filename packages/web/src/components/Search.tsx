import css from "./Search.module.css";

const Search = () => (
  <label className={css.search}>
    <span>🔍</span>
    <input name="search" placeholder="検索"></input>
  </label>
);
export default Search;
