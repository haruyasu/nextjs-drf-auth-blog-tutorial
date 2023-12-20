import { getAuthSession } from "@/lib/nextauth"
import { getPostDetail } from "@/actions/post"
import PostDetail from "@/components/post/PostDetail"

interface PostDetailPageProps {
  params: {
    postId: string
  }
}

// 投稿詳細ページ
const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const { postId } = params

  // 認証情報取得
  const user = await getAuthSession()

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

  return <PostDetail post={post} user={user} />
}

export default PostDetailPage
