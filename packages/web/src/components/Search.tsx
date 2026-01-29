import { MdSearch } from "react-icons/md";
import css from "./Search.module.css";

const Search = () => (
  <label className={css.search}>
    <MdSearch />
    <input name="search" placeholder="検索"></input>
  </label>
);
export default Search;
