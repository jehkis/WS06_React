import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { request } from '../api/request.js'

function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

    async function loadPost() {
      try {
        const data = await request(`/api/posts/${id}`)
        if (!ignore) setPost(data)
      } catch (err) {
        if (!ignore) {
          setPost(null)
          setError(`Could not load post: ${err.message}`)
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadPost()
    return () => {
      ignore = true
    }
  }, [id])

  async function handleDelete() {
    setDeleting(true)
    setError(null)

    try {
      await request(`/api/posts/${id}`, { method: 'DELETE' })
      navigate('/blog')
    } catch (err) {
      setError(`Could not delete post: ${err.message}`)
      setDeleting(false)
    }
  }

  if (loading) return <p className="status-msg">Loading…</p>
  if (error && !post) return <p className="status-msg error">{error}</p>
  if (!post) return <p className="status-msg">Post not found.</p>

  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('fi-FI', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Date missing'

  return (
    <article className="post-detail">
      {error && <p className="status-msg error">{error}</p>}

      <div className="post-detail-meta">
        <span className="author">{post.author}</span>
        <time dateTime={post.createdAt}>{date}</time>
      </div>

      <h1 className="post-detail-title">{post.title}</h1>

      <p className="post-detail-content">{post.content}</p>

      <div className="post-detail-actions">
        <Link to={`/posts/${id}/edit`} className="btn btn-secondary">
          Edit
        </Link>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </article>
  )
}

export default PostPage
