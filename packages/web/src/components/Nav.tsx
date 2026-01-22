import { useParams } from "../hooks/history";
import { logout } from "./Login";
import css from "./Nav.module.css";
import Search from "./Search";

export const useNavTab = () => {
  const [params, setParams] = useParams();
  return [
    params.get("tab") ?? "company",
    (value: string) =>
      setParams(() => (value === "company" ? "" : `tab=${value}`)),
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
        {Object.entries({
          company: "企業レビュー",
          access: "OB・OG 訪問",
          profile: "マイページ",
        }).map(([name, text]) => (
          <button
            key={name}
            data-actived={name === tab}
            onClick={() => setTab(name)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className={css.pad}></div>
      <div className={css["flex-center"]}>
        {localStorage.getItem("user") ? (
          <>
            <Search />
            <a id="logout" onClick={logout}>
              LOGOUT
            </a>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default Nav;
