// Small helper: fetch JSON from the API and throw a readable error on failure.
export async function request(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // Response had no JSON body
  }

  if (!res.ok) {
    throw new Error(data?.error || data?.message || `Request failed (${res.status})`)
  }

  return data
}

// Read title, author and content from a submitted form element.
export function readPostForm(form) {
  const formData = new FormData(form)
  return {
    title: formData.get('title'),
    author: formData.get('author'),
    content: formData.get('content'),
  }
}
