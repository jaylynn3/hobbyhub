import { useEffect, useState } from "react"
import { supabase } from "./client"
import { useParams, useNavigate, Link } from "react-router-dom"

export default function Post() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [])

  const fetchPost = async () => {
    const { data } = await supabase
      .from("posts")
      .select()
      .eq("id", id)
      .single()

    setPost(data)
  }

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select()
      .eq("postid", id)

    setComments(data)
  }

  const handleUpvote = async () => {
    await supabase
      .from("posts")
      .update({ upvote: post.upvote + 1 })
      .eq("id", id)

    fetchPost()
  }

  const addComment = async () => {
    if (!newComment) return

    await supabase.from("comments").insert([
      {
        postid: id,
        comment: newComment
      }
    ])

    setNewComment("")
    fetchComments()
  }

  const deletePost = async () => {
    await supabase.from("posts").delete().eq("id", id)
    navigate("/")
  }

  if (!post) return <h1>Loading...</h1>

  return (
    <div>
        <Link to="/">
        <button>Back to Home</button>
        </Link>

      <h1>{post.title}</h1>

      <p>{post.content}</p>

      {post.image && <img src={post.image} width="300" />}

      <br /><br />

      <button onClick={handleUpvote}>
        Upvote ({post.upvote})
      </button>

      <br /><br />

      <Link to={`/edit/${post.id}`}>
        <button>Edit</button>
      </Link>

      <button onClick={deletePost}>Delete</button>

      <hr />

      <h2>Comments</h2>

      <input
        placeholder="Write comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button onClick={addComment}>Add</button>

      {comments.map((c) => (
        <div key={c.id}>
          <p>{c.comment}</p>
        </div>
      ))}
    </div>
  )
}