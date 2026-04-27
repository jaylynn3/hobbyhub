import { useEffect, useState } from "react"
import { supabase } from "./client"
import { Link } from "react-router-dom"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [orderBy, setOrderBy] = useState("created_at")

  useEffect(() => {
    fetchPosts()
  }, [orderBy])

  const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")

  if (error) {
    console.log("Supabase error:", error)
    return
  }

  setPosts(data || [])
}

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1>ArtSpace</h1>

      <Link to="/create">
        <button>Create New Post</button>
      </Link>

      <br /><br />

      <input
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <button onClick={() => setOrderBy("created_at")}>
        Newest
      </button>

      <button onClick={() => setOrderBy("upvote")}>
        Most Upvoted
      </button>

      <br /><br />

      {filteredPosts.map((post) => (
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>

          <p>
            {new Date(post.created_at).toLocaleString()}
          </p>

          <p>Upvotes: {post.upvote}</p>

          <hr />
        </div>
      ))}
    </div>
  )
}