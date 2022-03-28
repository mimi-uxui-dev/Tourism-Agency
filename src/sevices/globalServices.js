// const ROOT = process.env.REACT_APP_API_URL
export const ROOT = 'https://api.anouarelsabah.com/api/v1'
// export const ROOT = 'https://light-cms.herokuapp.com/api/v1'

// Companies
export const COMPANY_INFORMATIONS = () => `${ROOT}/companies` // GET ALL
export const COMPANY_INFORMATION = (id) => `${ROOT}/companies/${id}` // GET + id

// Contact
export const CONTACTS = () => `${ROOT}/contacts` // GET ALL
export const CONTACT = (id) => `${ROOT}/contacts/${id}` // GET + id
export const CONTACT_POST = () => `${ROOT}/contacts` // POST

// Faqs
export const FAQS = () => `${ROOT}/fAQS` // GET ALL
export const FAQ = (id) => `${ROOT}/fAQS/${id}` // GET + id

// Partners
export const PARTNERS = () => `${ROOT}/partners` // GET ALL
export const PARTNER = (id) => `${ROOT}/partners/${id}` // GET + id

// Photos
export const PHOTOS = () => `${ROOT}/photos` // GET ALL
export const PHOTO = (id) => `${ROOT}/photos/${id}` // GET + id

// Products
export const PRODUCTS_LIMIT = () => `${ROOT}/products/limit/10` // GET ALL
export const PRODUCTS = () => `${ROOT}/products` // GET ALL
export const PRODUCT = (id) => `${ROOT}/products/${id}` // GET + id


// ProductsCategories
export const PRODUCTS_CA_LIMIT = () => `${ROOT}/productcategories/limit/10` // GET ALL
export const PRODUCTS_CA = () => `${ROOT}/productcategories` // GET ALL
export const PRODUCT_CA = (id) => `${ROOT}/productcategories/${id}` // GET + id

// Services
export const SERVICES = () => `${ROOT}/services` // GET ALL
export const SERVICE = (id) => `${ROOT}/services/${id}` // GET + id
export const SERVICE_LIMIT = () => `${ROOT}/services/limit/6` // GET + id
export const SERVICES_BEST = () => `${ROOT}/services/best`

// ServicesCategories
export const SERVICE_C = () => `${ROOT}/service_categories`
export const SERVICE_C_ID = (id) => `${ROOT}/service_categories/${id}`
export const SERVICES_CAT_HAJJ = () => `${ROOT}/services_categories/hajj`

// Slider
export const SLIDERS = () => `${ROOT}/sliders` // GET ALL
export const SLIDER = (id) => `${ROOT}/sliders/${id}` // GET + id

// Teams
export const TEAMS = () => `${ROOT}/teams` // GET ALL
export const TEAM = (id) => `${ROOT}/teams/${id}` // GET + id

// Blogs
export const BLOGS = () => `${ROOT}/blogs` // GET ALL
export const BLOG = (id) => `${ROOT}/blogs/${id}` // GET + id
export const BLOG_LIMIT = (limit) => `${ROOT}/blogs/limit/${limit}`
export const BLOG_LAST = (id) => `${ROOT}/blogs_last`
export const BLOG_EXCEPT = (id) => `${ROOT}/blogs_except`
export const BLOG_NEWS = (count) => `${ROOT}/blogs_news?count_paginate=${count}`

// Members
export const MEMBERS = () => `${ROOT}/members` // GET ALL
export const MEMBER = (id) => `${ROOT}/members/${id}` // GET + id

// Subscribes
export const SUBSCRIBE = () => `${ROOT}/subscribes` // GET ALL

// Search *POST* 
export const SEARCH = () => `${ROOT}/search/`
// export const SEARCH_SERVICES = () => `${ROOT}/search/services`
export const SEARCH_SERVICES = () => `${ROOT}/search/filtre`
// export const SEARCH_OFFERS = () => `${ROOT}/search/offers`
export const SEARCH_OFFERS = () => `${ROOT}/search/filtre`

// NEWS
export const NEWS = () => `${ROOT}/news_events` // GET ALL
export const NEWS_ID = (id) => `${ROOT}/news_events/${id}` // GET ALL
export const NEWS_LIMIT = (limit) => `${ROOT}/news_events/limit/${limit}`

// FEEDBACK
export const FEEDBACK = () => `${ROOT}/feedback` // GET ALL

// FEEDBACK
export const UNITS = () => `${ROOT}/units` // GET ALL
export const UNIT = (id) => `${ROOT}/units/${id}`

// SUPPORT
export const SUPPORT = () => `${ROOT}/supports` // GET ALL

export const STATISTICS = () => `${ROOT}/statistiques` // GET ALL
export const OFFERS = () => `${ROOT}/offers` // GET ALL