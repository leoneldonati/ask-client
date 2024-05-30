import "./index.css";
import {
  IconCalendar,
  IconClockEdit,
  IconUserHeart,
  IconUserStar,
} from "@tabler/icons-react";

export default function Profiles() {



  return (
    <section className="profile">
      <picture>
        <img
          loading="lazy"
          className="profile_avatar"
        />
      </picture>

      <div className="profile_container--info">
        <div className="profile_container--name">
          <h1>{}</h1>
          <span>@{}</span>
        </div>

        <ul className="profile_ul--dates">
          <li>
            <IconCalendar />
            {/* Joined at: {parseDate(client!.createdAt)}; */}
          </li>
          <li>
            <IconClockEdit />
            {/* Modified at: {parseDate(client!.updatedAt)}; */}
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

      <article className="profile_container--posts">
        
      </article>
    </section>
  );
}
