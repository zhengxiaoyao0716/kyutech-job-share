import { type ChangeEvent, type MouseEvent } from "react";
import { useParams } from "../hooks/history";
import css from "./Login.module.css";

export const logout = () => {
  localStorage.removeItem("user");
  location.href = "";
};

const Login = () => {
  const [params, setParams] = useParams();
  const signupCode = params.get("signup");

  const valid = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.parentNode?.parentNode;
    if (!(form instanceof HTMLFormElement)) return null;
    if (form.checkValidity()) return form;
    // else
    form.reportValidity();
    return null;
  };
  const validSame =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const form = event.currentTarget.parentNode?.parentNode;
      if (!(form instanceof HTMLFormElement)) return null;
      const input = form.querySelector(`input[name="${name}"]`);
      if (!(input instanceof HTMLInputElement)) return;
      const ok = event.currentTarget.value === input.value;
      event.currentTarget.setCustomValidity(ok ? "" : "入力が不一致");
    };

  const onLogin = (event: MouseEvent<HTMLInputElement>) => {
    const form = valid(event);
    if (!form) return;
    location.reload();
    localStorage.setItem("user", "dev");
  };
  const onSignup = (event: MouseEvent<HTMLInputElement>) => {
    const form = valid(event);
    if (!form) return;
    setParams(() => `signup=%20`);
  };
  const onVerify = (event: MouseEvent<HTMLInputElement>) => {
    const form = valid(event);
    if (!form) return;
    setParams(() => `signup=%20`);
  };

  if (signupCode === null) {
    return (
      <form className={css.login}>
        <h2>九工大就活シェア - ログイン</h2>
        <label>
          <b>メールアドレス</b>
          <input name="user" type="email" required />
        </label>
        <label>
          <b>パスワード入力</b>
          <input name="pswd" type="password" required minLength={6} />
        </label>
        <hr />
        <div className={css.buttons}>
          <input type="submit" onClick={onLogin} value="ログイン" />
          <button className="plain" onClick={() => setParams(() => "signup")}>
            <span>新規登録はこちら</span>
          </button>
        </div>
      </form>
    );
  } else if (signupCode === "") {
    return (
      <form className={css.login}>
        <h2>九工大就活シェア - 新規登録</h2>
        <label>
          <b>メールアドレス</b>
          <input name="user" type="email" required />
        </label>
        <label>
          <b>確認用メールアドレス</b>
          <input
            name="user-fool-proof"
            type="email"
            required
            onChange={validSame("user")}
          />
        </label>
        <hr />
        <div className={css.buttons}>
          <input type="submit" onClick={onSignup} value="送信" />
          <button className="plain" onClick={() => setParams(() => "")}>
            <span>ログインページに戻る</span>
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <form className={css.login}>
        <h2>九工大就活シェア - メール認証</h2>
        <label>
          <b>メールアドレス</b>
          <input name="user" type="email" required />
        </label>
        <label>
          <b>パスワード入力</b>
          <input name="pswd" type="password" required minLength={6} />
        </label>
        <label>
          <b>確認用パスワード</b>
          <input
            name="pswd-fool-proof"
            type="password"
            required
            minLength={6}
            onChange={validSame("pswd")}
          />
        </label>
        <hr />
        {signupCode === null ? null : (
          <label>
            <b>認証コード入力</b>
            <input
              name="code"
              type="text"
              required
              minLength={4}
              defaultValue={signupCode.trim()}
            />
          </label>
        )}
        <div className={css.buttons}>
          <input type="submit" onClick={onVerify} value="認証" />
          <button className="plain" onClick={() => setParams(() => "signup")}>
            <span>新規登録に戻る</span>
          </button>
        </div>
      </form>
    );
  }
};
export default Login;
