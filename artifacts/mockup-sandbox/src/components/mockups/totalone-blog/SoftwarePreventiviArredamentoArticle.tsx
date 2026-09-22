import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function SoftwarePreventiviArredamentoArticle() {
  return <BlogArticle article={blogArticleById["software-preventivi-arredamento"]} />;
}