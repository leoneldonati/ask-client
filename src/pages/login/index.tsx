import "./index.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { useAuthStore } from "../../stores/auth";
import LoginForm from "../../components/login-form";

export default function Login() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const nav = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);

    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    if (!email || !password || email === "" || password === "") return;

    const loginResponse = await login(form);

    if (!loginResponse.ok) {
      return setAuth({
        isAuth: false,
        client: null,
        error: loginResponse.error,
      });
    }

    setAuth({ isAuth: true, client: loginResponse.client, error: null });

    nav("/");
  };
  return (
    <section className="login">
      <div className="login_title--wrapper">
        <h1 className="login_h1">
          Log in into{" "}
          <span>
            <strong>Ask!</strong>
          </span>
        </h1>
        <h2 className="login_h2">
          A social media bassed on once point, <span>free speech</span>.
        </h2>
      </div>

      <LoginForm handleSubmit={handleSubmit} />
    </section>
  );
}
