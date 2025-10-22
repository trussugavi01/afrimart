import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '@/lib/blog-data';
import { BlogHeader } from '@/components/BlogHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <BlogHeader />
        <div className="flex flex-col items-center justify-center text-center py-24">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the blog post you're looking for.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white min-h-screen">
      <BlogHeader />
      <main>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-8">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all articles
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.authorImage} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground text-lg">{post.author}</p>
                <p className="text-muted-foreground">{post.date}</p>
              </div>
            </div>
          </div>
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-12"
          />
          <div className="prose prose-lg max-w-none text-foreground/90">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Afrimart Agro Trade. Built with ❤️ at Cloudflare.</p>
        </div>
      </footer>
    </div>
  );
}