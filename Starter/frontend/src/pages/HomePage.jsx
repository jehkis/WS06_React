import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'
import { request } from '../api/request.js'

function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadPosts() {
      try {
        const data = await request('/api/posts')
        if (!ignore) setPosts(data)
      } catch (err) {
        if (!ignore) setError(`Could not load posts: ${err.message}`)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadPosts()
    return () => {
      ignore = true
    }
  }, [])

  if (loading) return <p className="status-msg">Loading posts…</p>
  if (error) return <p className="status-msg error">{error}</p>

  return (
    <div className="blog-page">
      <div className="page-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="page-title">All posts</h1>
        <p className="page-copy">
          Posts are loaded from <code>/api/posts</code>, newest first.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="status-msg">No posts yet. Write the first one!</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage
