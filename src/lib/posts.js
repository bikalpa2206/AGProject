import posts from '@/data/posts.json';

export function getAllPosts() {
    return posts;
}

export function getPostsByCategory(category) {
    return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export function getPostBySlug(slug) {
    return posts.find(post => post.slug === slug);
}
