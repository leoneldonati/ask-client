import "./index.css";
import { parseDate } from "../../helpers/date";
import {
  IconArrowDown,
  IconBubbleText,
  IconCalendar,
  IconCheck,
  IconThumbUp,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth";
import { useState } from "react";
import Carrousel from "../carrousel";

export default function PostCard({ post }: { post: Post }) {
  const [seeMore, setSeeMore] = useState(false);
  const client = useAuthStore((state) => state.client!);

  const longContent = post.post_content.length > 180;

  const files = JSON.parse(post?.files);

  return (
    <article className="post">
      {/* 
               TODO: AÑADIR ETIQUETAS PARA SEO
       */}

      <div className="post_wrapper--top">
        <div className="post_user">
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <strong>{post.owner.name}</strong>
            {!client.isVerified ? <IconCheck className="icon_check" /> : null}
          </p>
          <p>
            <Link to={`/profiles/${post.owner.id}`}><small>@{post.owner.username}</small></Link>
          </p>
        </div>

        <img
          src={JSON.parse(post.owner.avatar as string).secureUrl.secureUrl}
          alt={"@" + client.username}
          title={"@" + client.username}
          loading="lazy"
          className="post_avatar"
          style={{}}
        />
      </div>
      <p
        className="post_content"
        style={{
          maxHeight: seeMore ? "none" : "170px",
        }}
      >
        {post.post_content}
        <button
          onClick={() => setSeeMore((prevState) => !prevState)}
          style={{
            display: longContent ? "flex" : "none",
          }}
        >
          <span
            style={{
              display: "block",
            }}
          >
            {longContent && !seeMore ? "see more" : "see less"}
          </span>
          <IconArrowDown
            style={{
              transform: `rotate(${
                longContent && seeMore ? "180deg" : "0deg"
              })`,
            }}
          />
        </button>
      </p>

      <div className="post_images">
        {files.length > 1 ? (
          <Carrousel images={files} />
        ) : (
          <img
            src={files[0].secure_url}
            alt="Post image"
            loading="lazy"
            className="single_img"
          />
        )}
      </div>

      <hr />

      <div
      style={{
        padding: '.6em 0',
        display: 'flex',
        alignItems: 'center'
      }}
      >
        <div className="post_buttons">
          <button id="like">
            <IconThumbUp />
            <span>{post.like_user_ids.length}</span>
          </button>
          <button id="comment">
            <IconBubbleText />
            <span>{post.comments.length}</span>
          </button>
        </div>

        <p className="post_timestamp">
          <IconCalendar />
          <small>{parseDate(post.post_created_at)}</small>
        </p>
      </div>
    </article>
  );
}
