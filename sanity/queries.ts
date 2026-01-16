import { groq } from 'next-sanity'

// All articles for homepage and collection
export const allArticlesQuery = groq`
  *[_type == "article" && category == "hospitality" && "hospitality" in sites] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    subcategory,
    category,
    tags,
    publishedAt,
    author
  }
`

// Single article by slug
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug && category == "hospitality" && "hospitality" in sites][0] {
    _id,
    title,
    subtitle,
    slug,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url
        }
      }
    },
    subcategory,
    category,
    tags,
    publishedAt,
    author
  }
`

// Articles by subcategory
export const articlesBySubcategoryQuery = groq`
  *[_type == "article" && category == "hospitality" && "hospitality" in sites && subcategory == $subcategory] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    subcategory,
    category,
    tags,
    publishedAt,
    author
  }
`

// Articles by tag
export const articlesByTagQuery = groq`
  *[_type == "article" && category == "hospitality" && "hospitality" in sites && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    subcategory,
    category,
    tags,
    publishedAt,
    author
  }
`

// Related articles by subcategory (excludes current article)
export const relatedArticlesQuery = groq`
  *[_type == "article" && category == "hospitality" && "hospitality" in sites && subcategory == $subcategory && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    }
  }
`

// Fallback related articles by category (excludes current article)
export const relatedArticlesByCategoryQuery = groq`
  *[_type == "article" && category == "hospitality" && "hospitality" in sites && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    }
  }
`