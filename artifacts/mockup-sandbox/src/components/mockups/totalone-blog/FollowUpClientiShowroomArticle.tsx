import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function FollowUpClientiShowroomArticle() {
  return <BlogArticle article={blogArticleById["follow-up-clienti-showroom"]} />;
}
