import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import PostNew from "@/components/post/PostNew"

// 新規投稿ページ
const PostNewPage = async () => {
  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  return <PostNew user={user} />
}

export default PostNewPage
