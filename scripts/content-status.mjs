import articles from '../content-data/published-articles.json' with { type: 'json' }

const published = articles.filter((item) => item.status === 'published')
const review = articles.filter((item) => item.status === 'review')

console.log(`Published: ${published.length}`)
console.log(`Review queue: ${review.length}`)
console.log('\nPublished slugs:')
for (const item of published) console.log(`- ${item.slug}`)
