import type { ComponentType } from "react";
import { IconContext } from "react-icons";
import css from "./App.module.css";
import Account from "./components/Account";
import Company, { useCompany } from "./components/Company";
import FilterTag from "./components/FilterTag";
import Login from "./components/Login";
import { Modal } from "./components/Modal";
import Nav, { useNavTab } from "./components/Nav";
import PinCard from "./components/PinCard";
import Profile from "./components/Profile";
import Reviews from "./components/Reviews";
import { History } from "./hooks/history";
import { Lazy } from "./hooks/promise";
import { pullAccounts } from "./services/account";
import { pullCompanies } from "./services/company";

const TabCompany = () => (
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
    <Lazy task={pullCompanies}>
      {(value) =>
        Array.from({ length: Math.ceil(value.length / 2) }).map((_, i) => {
          const props0 = value[(i << 1) + 0];
          const props1 = value[(i << 1) + 1];
          return (
            <div key={i}>
              {props0 ? <Company {...props0} /> : null}
              {props1 ? <Company {...props1} /> : null}
            </div>
          );
        })
      }
    </Lazy>
    <div>
      <FilterTag.Gallery kind="company" />
    </div>
  </>
);
const TabAccess = () => (
  <>
    <PinCard>
      <h2>
        <span>ユーザーを探す</span>
        <span>
          <FilterTag.List />
          <FilterTag.Expand />
        </span>
      </h2>
    </PinCard>
    <br />
    <Lazy task={pullAccounts}>
      {(value) =>
        Array.from({ length: Math.ceil(value.length / 2) }).map((_, i) => {
          const props0 = value[(i << 1) + 0];
          const props1 = value[(i << 1) + 1];
          return (
            <div key={i}>
              {props0 ? <Account {...props0} /> : null}
              {props1 ? <Account {...props1} /> : null}
            </div>
          );
        })
      }
    </Lazy>
    <div>
      <FilterTag.Gallery kind="account" />
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
  profile: Profile,
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
        <Reviews name={company} />
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
    <IconContext.Provider
      value={{ style: { verticalAlign: "middle", fontSize: "1.2em" } }}
    >
      <Nav />
      <Tab />
    </IconContext.Provider>
  </History>
);
export default App;
