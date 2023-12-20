import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import { getPostDetail } from "@/actions/post"
import PostEdit from "@/components/post/PostEdit"

interface PostEditPageProps {
  params: {
    postId: string
  }
}

// 投稿編集ページ
const PostEditPage = async ({ params }: PostEditPageProps) => {
  const { postId } = params

  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  // 投稿詳細取得
  const { success, post } = await getPostDetail({ postId })

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        投稿の取得に失敗しました
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center text-sm text-gray-500">投稿はありません</div>
    )
  }

  if (post.user.uid !== user.uid) {
    return <div className="text-center">編集できません</div>
  }

  return <PostEdit user={user} post={post} />
}

export default PostEditPage
