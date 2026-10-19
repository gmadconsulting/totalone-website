import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function RapportinoMontaggioArticle() {
  return <BlogArticle article={blogArticleById["rapportino-montaggio-mobili"]} />;
}
