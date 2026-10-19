import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function CalcolareMargineArredamentoArticle() {
  return <BlogArticle article={blogArticleById["calcolare-margine-arredamento"]} />;
}
