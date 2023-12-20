import { getPostList } from "@/actions/post"
import PostItem from "@/components/post/PostItem"

// トップページ
const Home = async () => {
  // 投稿一覧を取得
  const { success, posts } = await getPostList()

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        投稿の取得に失敗しました
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500">投稿がありません</div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {posts.map((post) => (
        <PostItem key={post.uid} post={post} />
      ))}
    </div>
  )
}

export default Home
