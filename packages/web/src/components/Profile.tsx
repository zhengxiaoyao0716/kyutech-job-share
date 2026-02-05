import { IconContext } from "react-icons";
import { MdAccountCircle, MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { Lazy } from "../hooks/promise";
import { pullAccounts } from "../services/account";
import PinCard from "./PinCard";
import css from "./Profile.module.css";

const Profile = () => (
  <>
    <PinCard>
      <div className={css.profile}>
        <IconContext.Provider value={{ size: "12em", color: "#4886c3" }}>
          <MdAccountCircle />
        </IconContext.Provider>
        <section className={css.intro}>
          <h3>九工大 太郎</h3>
          <div>
            <p>プロフィール</p>
            <p>
              自己紹介自己紹介自己紹介自己紹介自己紹介自己紹介自己紹介自己紹介
            </p>
          </div>
          <div className={css.buttons}>
            <button>
              <span>編集</span>
              <IconContext.Provider value={{ color: "#293f5c" }}>
                <MdEdit />
              </IconContext.Provider>
            </button>
          </div>
        </section>
      </div>
    </PinCard>
    <PinCard>
      <div className={css.point}>
        <label>
          <span>所持ポイント</span>
          <input name="point" value="1,800" readOnly={true} />
          <small>ポイント</small>
        </label>
        <div>
          <button>ポイント交換</button>
        </div>
      </div>
    </PinCard>
    <br />
    <h2>メッセージ</h2>
    <div className={css.message}>
      <Lazy task={pullAccounts}>
        {(values) =>
          values.map(({ name, cls }) => (
            <PinCard>
              <h3>
                {name} | <span>{cls} 年卒</span>
              </h3>
              <p>
                チャットメッセージチャットメッセージチャットメッセージチャットメッセージ
              </p>
              <div className={css.buttons}>
                <button>
                  <span>削除</span>
                  <MdDelete />
                </button>
                <button>
                  <span>既読</span>
                  <MdCheck />
                </button>
              </div>
            </PinCard>
          ))
        }
      </Lazy>
    </div>
  </>
);
export default Profile;
