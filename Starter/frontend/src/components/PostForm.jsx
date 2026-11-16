// Reusable form for creating and editing posts.
// Uncontrolled inputs: the parent reads values from the submitted form.
function PostForm({ initialData = {}, onSubmit, submitting }) {
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialData.title ?? ''}
          required
          minLength={3}
          placeholder="Post title"
        />
      </div>

      <div className="form-field">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          defaultValue={initialData.author ?? ''}
          required
          placeholder="Your name"
        />
      </div>

      <div className="form-field">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          defaultValue={initialData.content ?? ''}
          required
          minLength={10}
          placeholder="Write your post here…"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Saving…' : 'Save post'}
      </button>
    </form>
  )
}

export default PostForm
