import { useParams } from "react-router-dom";
import "./index.css";
import {
  IconCalendar,
  IconClockEdit,
  IconUserHeart,
  IconUserStar,
} from "@tabler/icons-react";
import { parseDate } from "../../helpers/date";
import { useAuthStore } from "../../stores/auth";
import { useEffect, useState } from "react";
import { getUserBy } from "../../services/users";
import { checkSession } from "../../services/auth";

export default function Profiles() {
  const [client, setClient] = useState<ClientData>({
    avatar: JSON.stringify({
      original: {
        secureUrl: "",
      },
      optimized: {
        secureUrl: "",
      },
    }),
    bio: "",
    createdAt: new Date(0),
    date: new Date(0),
    email: "",
    id: "",
    isVerified: false,
    name: "",
    updatedAt: new Date(0),
    username: "",
  });
  const id = useParams().id!.toString();
  const user = useAuthStore((state) => state.client);

  useEffect(() => {
    checkSession()
    // perfil del usuario iniciado sesión
    if (user?.id === id) {
      setClient(user);
      return;
    }
    // perfil de usuario random
    getUserBy(id).then(({ data }) => {
      setClient(data);
    });
  }, []);

  return (
    <section className="profile">
      <picture>
        <img
          loading="lazy"
          className="profile_avatar"
          src={JSON.parse(client!.avatar).original.secureUrl ?? ""}
        />
      </picture>

      <div className="profile_container--info">
        <div className="profile_container--name">
          <h1>{client?.name}</h1>
          <span>@{client?.username}</span>
        </div>

        <ul className="profile_ul--dates">
          <li>
            <IconCalendar />
            Joined at: {parseDate(client!.createdAt)};
          </li>
          <li>
            <IconClockEdit />
            Modified at: {parseDate(client!.updatedAt)};
          </li>
        </ul>

        <div className="profile_container--socials">
          <span title="Followed">
            <IconUserStar />
            {/* <strong>{client!.followed.length}</strong> */}
          </span>
          <span title="Followers">
            <IconUserHeart />
            {/* <strong>{client!.followers.length}</strong> */}
          </span>
        </div>
      </div>

      <article className="profile_container--posts"></article>
    </section>
  );
}
