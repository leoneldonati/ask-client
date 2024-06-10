import { IconFilePlus, IconX } from "@tabler/icons-react";
import "./index.css";
import { useRef, useState } from "react";
import { usePostsStore } from "../../stores/posts";

export default function PostForm({ setToggle }: {setToggle: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const { addPost, loading } = usePostsStore(state => state);
  const form = useRef()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement);
    const content = form.get("content")?.toString();
    if (!content) return;

    await addPost(form);

    setToggle(false)
    setSelectedImage(() => [])
    form.set('content', '')
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const files = e.target.files;

    if (files.length > 1) {
      const arrayFiles = [...files];

      arrayFiles.forEach((file) => {
        const src = URL.createObjectURL(file);
        setSelectedImage([...selectedImage!, src]);
      });
      return;
    }

    const src = URL.createObjectURL(files[0]);

    setSelectedImage([src]);
  };

  const hasMultipleImages = selectedImage.length > 1;
  const hasImages = selectedImage.length > 0;
  return (
    <form className="post_form" onSubmit={handleSubmit} ref={form.current}>
      <label htmlFor="content">
        <span>Explain yourself</span>
        <textarea name="content" id="content"></textarea>
      </label>

        <span
        >{hasImages ? "Good!" : "Images?"}</span>
      <label htmlFor="files" className="files">
        <input
          type="file"
          accept="images/*"
          name="files"
          id="files"
          hidden
          onChange={handleChangeImage}
          style={{
            display: 'none'
          }}
        />
        
          <IconFilePlus
            style={{
              marginTop: "1em",
              display: !hasImages ?'block': 'none'
            }}
          />
        
        <div
          className={hasMultipleImages ? "multiple" : "single"}
          style={{
            position: "relative",
          }}
        >
          {hasImages ? (
            hasMultipleImages ? (
              selectedImage.map((src, index) => (
                <img src={src} alt={`Image ${index}`} loading="lazy" />
              ))
            ) : (
              <img src={selectedImage[0]} alt="Image" loading="lazy" />
            )
          ) : null}

          <button
            style={{
              position: "absolute",
              right: 5,
              top: 5,
              display: hasImages ? "block" : "none",
            }}
            className="close_btn"
            onClick={(e) => {
              e.preventDefault();
              setSelectedImage([]);
            }}
          >
            <IconX
              fill="#fff"
              color="#fff"
              style={{
                filter: "drop-shadow(0 0 .5em var(--color_shadow))",
              }}
            />
          </button>
        </div>
      </label>

      <button 
        type="submit"
        style={{
          transform: loading ? 'scale(.95)' : '',
          pointerEvents: loading ? 'none' : 'auto'
        }}
      >
        {
          loading
          ? 'Posting...'
          : 'Post'
        }
      </button>
    </form>
  );
}
