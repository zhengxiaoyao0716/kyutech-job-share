import type { ComponentType } from "react";
import css from "./App.module.css";
import FilterTag from "./components/FilterTag";
import Nav, { useNavTab } from "./components/Nav";
import Card from "./components/PinCard";
import { History } from "./hooks/history";

const Tab0 = () => (
  <>
    <Card>
      <h2>
        <span>タグで絞り込む</span>
        <span>
          {["福岡", "東京", "IT", "メーカー", "夏インターン", "早期選考"].map(
            (value, i) => (
              <FilterTag value={value} key={i} />
            )
          )}
        </span>
      </h2>
    </Card>
    <br />
    <div>
      {[
        { name: "株式会社未来技術" },
        { name: "グローバルソリューションズ" },
      ].map(({ name }, i) => (
        <Card key={i}>
          <h2>{name}</h2>
        </Card>
      ))}
    </div>
  </>
);
const Tab1 = () => (
  <>
    <Card>
      <h2>
        <span>ユーザーを探す</span>
        <span>
          {["学科で絞り込む", "業界", "職種", "相談方法"].map((value, i) => (
            <FilterTag value={value} key={i} />
          ))}
        </span>
      </h2>
    </Card>
    <br />
    <div>
      {[
        { name: "佐藤 健太", cls: 2021 },
        { name: "田中 美咲 (仮名)", cls: 2023 },
      ].map(({ name, cls }, i) => (
        <Card key={i}>
          <h2>
            {name} | <span>{cls} 年卒</span>
          </h2>
        </Card>
      ))}
    </div>
  </>
);
const Tab404 = ({ tab }: { tab: number }) => (
  <Card>
    <h1>404 Not Found (tab: {tab})</h1>
  </Card>
);
const Routes: ComponentType<{ tab: number }>[] = [Tab0, Tab1, Tab404];

const Tab = () => {
  const [tab] = useNavTab();
  const Route = Routes[tab] ?? Tab404;
  return (
    <div className={css.app}>
      <br />
      <Route tab={tab} />
    </div>
  );
};

const App = () => {
  return (
    <History>
      <Nav />
      <Tab />
    </History>
  );
};
export default App;
