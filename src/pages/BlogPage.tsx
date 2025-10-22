import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { blogPosts, BlogPost } from '@/lib/blog-data';
import { BlogHeader } from '@/components/BlogHeader';
const BlogCard = ({ post }: { post: BlogPost }) => (
  <Link to={`/blog/${post.slug}`} className="group block">
    <Card className="overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center space-x-3 text-sm">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.authorImage} alt={post.author} />
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{post.author}</p>
            <p className="text-muted-foreground">{post.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);
export function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BlogHeader />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Afrimart Blog
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-4">
                Insights, stories, and news from the heart of African agriculture.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Afrimart Agro Trade. Built with ❤️ at Cloudflare.</p>
        </div>
      </footer>
    </div>
  );
}