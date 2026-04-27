import { useEffect, useState } from "react"
import { supabase } from "./client"
import { useParams, useNavigate } from "react-router-dom"

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    const { data } = await supabase
      .from("posts")
      .select()
      .eq("id", id)
      .single()

    setTitle(data.title)
    setContent(data.content)
    setImage(data.image)
  }

  const updatePost = async (e) => {
    e.preventDefault()

    await supabase
      .from("posts")
      .update({
        title,
        content,
        image
      })
      .eq("id", id)

    navigate(`/post/${id}`)
  }

  return (
    <div>
      <h1>Edit Post</h1>

      <form onSubmit={updatePost}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br /><br />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br /><br />

        <button type="submit">Update</button>
      </form>
    </div>
  )
}