import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function ArchitettiInteriorDesignerArticle() {
  return <BlogArticle article={blogArticleById["architetti-interior-designer-showroom"]} />;
}
