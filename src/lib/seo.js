/*
  SEO Helper
  - Dynamically updates document title and meta description
  - Should be called effectively on route changes
*/

export const updateSEO = ({ title, description }) => {
  if (title) {
    document.title = `${title} | Hydrn`
  }

  if (description) {
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description)
    }
  }
}
