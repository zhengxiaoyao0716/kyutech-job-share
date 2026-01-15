import { useParams } from "../hooks/history";
import css from "./Nav.module.css";
import Search from "./Search";

export const useNavTab = () => {
  const [params, setParams] = useParams();
  return [
    Number.parseInt(params.get("tab") ?? "0"),
    (value: number) => setParams(() => (value <= 0 ? "" : `tab=${value}`)),
  ] as const;
};

const Nav = () => {
  const [tab, setTab] = useNavTab();
  return (
    <div className={css.nav}>
      <div className={css.head}>
        <b>九工大就活シャア</b>
      </div>
      <div id="tabs" className={css.tabs}>
        {["企業レビュー", "OB・OG 訪問", "マイページ"].map((text, i) => (
          <button key={i} data-actived={i === tab} onClick={() => setTab(i)}>
            {text}
          </button>
        ))}
      </div>
      <div className={css.pad}></div>
      <div className={css["flex-center"]}>
        <Search />
      </div>
    </div>
  );
};
export default Nav;
