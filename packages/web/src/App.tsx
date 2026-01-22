import type { ComponentType } from "react";
import css from "./App.module.css";
import Company, { useCompany } from "./components/Company";
import FilterTag from "./components/FilterTag";
import Login from "./components/Login";
import { Modal } from "./components/Modal";
import Nav, { useNavTab } from "./components/Nav";
import PinCard from "./components/PinCard";
import { History } from "./hooks/history";

const TabCompany = () => (
  <>
    <PinCard>
      <h2>
        <span>タグで絞り込む</span>
        <span>
          {["福岡", "東京", "IT", "メーカー", "夏インターン", "早期選考"].map(
            (value, i) => (
              <FilterTag value={value} key={i} />
            ),
          )}
          <FilterTag.Expand />
        </span>
      </h2>
    </PinCard>
    <br />
    <div>
      {[
        { name: "株式会社未来技術" },
        { name: "グローバルソリューションズ" },
      ].map(({ name }, i) => (
        <Company key={i} name={name} />
      ))}
    </div>
    <div>
      <FilterTag.Gallery />
    </div>
  </>
);
const TabAccess = () => (
  <>
    <PinCard>
      <h2>
        <span>ユーザーを探す</span>
        <span>
          {["学科で絞り込む", "業界", "職種", "相談方法"].map((value, i) => (
            <FilterTag value={value} key={i} />
          ))}
        </span>
      </h2>
    </PinCard>
    <br />
    <div>
      {[
        { name: "佐藤 健太", cls: 2021 },
        { name: "田中 美咲 (仮名)", cls: 2023 },
      ].map(({ name, cls }, i) => (
        <PinCard key={i}>
          <h2>
            {name} | <span>{cls} 年卒</span>
          </h2>
        </PinCard>
      ))}
    </div>
  </>
);
const Tab404 = ({ tab }: { tab: string }) => (
  <PinCard>
    <h1>404 Not Found (tab: {tab})</h1>
  </PinCard>
);
const Routes: { [tab: string]: ComponentType<{ tab: string }> } = {
  company: TabCompany,
  access: TabAccess,
  profile: Tab404,
};

const Tab = () => {
  const [company] = useCompany();
  const [tab] = useNavTab();
  const Route = Routes[tab] ?? Tab404;

  if (!localStorage.getItem("user")) {
    return (
      <Modal>
        <div className={css.app}>
          <div>
            <Login />
          </div>
        </div>
      </Modal>
    );
  }
  if (company) {
    return (
      <div className={css.app}>
        <br />
        <Tab404 tab="company" />
      </div>
    );
  }
  return (
    <div className={css.app}>
      <br />
      <Route tab={tab} />
    </div>
  );
};

const App = () => (
  <History>
    <Nav />
    <Tab />
  </History>
);
export default App;
