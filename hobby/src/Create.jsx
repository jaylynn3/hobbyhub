import { useState } from "react"
import { supabase } from "./client"
import { useNavigate } from "react-router-dom"


export default function Create() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")

  const createPost = async (e) => {
    e.preventDefault()

    await supabase.from("posts").insert([
      {
        title,
        content,
        image,
        upvote: 0
      }
    ])

    navigate("/")
  }

  return (
    <div>
        <button type="button" className="back" onClick={() => navigate("/")}>
        Back to Home
        </button>

      <h1>Create New Post</h1>

      <form onSubmit={createPost}>
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br /><br />

        <button type="submit">Create Post</button>
      </form>
    </div>
  )
}