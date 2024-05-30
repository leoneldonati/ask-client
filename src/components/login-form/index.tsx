import "./index.css";
export default function LoginForm({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <form onSubmit={handleSubmit} className="login_form">
      <label htmlFor="email" className="login_form--label">
        <span>
          Insert your email..
        </span>
        <input
          type="email" 
          name="email" 
          id="email" 
          className="login_form--input"
          placeholder="example@exampledomain.com"
          autoFocus
        />
      </label>

      <label htmlFor="password" className="login_form--label">
        <span>
          Insert your password..
        </span>
        <input 
          type="password" 
          name="password" 
          id="password" 
          className="login_form--input"
          placeholder="**********"
        />
      </label>

      <button type="submit" className="login_form--button">Log in</button>
    </form>
  );
}
