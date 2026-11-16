import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'
import { request, readPostForm } from '../api/request.js'

function EditPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

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

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await request(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(readPostForm(e.currentTarget)),
      })
      navigate(`/posts/${id}`)
    } catch (err) {
      setError(`Could not save changes: ${err.message}`)
      setSubmitting(false)
    }
  }

  if (loading) return <p className="status-msg">Loading…</p>
  if (error && !post) return <p className="status-msg error">{error}</p>
  if (!post) return <p className="status-msg">Post not found.</p>

  return (
    <div>
      <h1 className="page-title">Edit post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm
        key={post._id}
        initialData={post}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  )
}

export default EditPostPage
