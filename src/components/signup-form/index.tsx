import "./index.css";
import { IconPlus } from "@tabler/icons-react";
import { defaultAvatar } from "../../constants";
import { useState } from "react";
import { useAuthStore } from "../../stores/auth";
import { signup } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const setAuth = useAuthStore((state) => state.setAuth);
  const nav = useNavigate();

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const image = e.target.files[0];

    const src = URL.createObjectURL(image);

    setSelectedAvatar(src);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
  
    const signupResponse = await signup(form);

    if (!signupResponse.ok) {

      setAuth({ isAuth: false, client: null, error: signupResponse.error });

      return;
    }

    return nav("/login");
  };

  return (
    <form
      className="signup_form"
      onSubmit={handleSignUp}
    >
      <label htmlFor="avatar" className="signup_form--avatar">
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          hidden
          onChange={handleChangeAvatar}
        />

        <IconPlus />
        <img
          src={selectedAvatar ?? defaultAvatar}
          alt="Add your profile pic!"
          loading="lazy"
          className="avatar_image"
        />
      </label>

      <div className="signup_form--info">
        <label htmlFor="name">
          <span>Name</span>
          <input type="text" name="name" id="name" />
        </label>
        <label htmlFor="lastaname">
          <span>Lastname</span>
          <input type="text" name="lastname" id="lastname" />
        </label>
      </div>

      <label htmlFor="username">
          <span>Username</span>
          <input type="text" name="username" id="username" />
      </label>

      <label htmlFor="email">
        <span>Email</span>
        <input
          type="email"
          name="email"
          id="email"
          className="signup_form--email"
        />
      </label>

      <label htmlFor="password">
        <span>Password</span>
        <input
          type="password"
          name="password"
          id="password"
          className="signup_form--password"
        />
      </label>

      <label htmlFor="bio">
        Bio
        <textarea name="bio" id="bio" className="signup_form--bio"></textarea>
      </label>

      <label htmlFor="date">
        Date
        <input
          type="date"
          name="date"
          id="date"
          className="signup_form--date"
        />
      </label>

      <button type="submit" className="signup_form--button">
        Create account
      </button>
    </form>
  );
}
