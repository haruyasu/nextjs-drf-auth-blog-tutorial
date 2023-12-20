"use client"

import { PostType } from "@/actions/post"
import { formatDistance } from "date-fns"
import { ja } from "date-fns/locale"
import Image from "next/image"
import Link from "next/link"

interface PostItemProps {
  post: PostType
}

// 投稿一覧のアイテム
const PostItem = ({ post }: PostItemProps) => {
  // 日付
  const updatedAt = new Date(post.updated_at ?? 0)
  const now = new Date()
  const date = formatDistance(updatedAt, now, { addSuffix: true, locale: ja })

  return (
    <div className="border rounded-md flex flex-col">
      <Link href={`/post/${post.uid}`}>
        <div className="aspect-[16/9] relative overflow-hidden rounded-t-md">
          <Image
            fill
            src={post.image || "/noImage.png"}
            alt="thumbnail"
            className="object-cover rounded-t-md transition-all hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-col h-full p-3">
        <div className="flex-1 mb-3">
          <div className="font-bold hover:underline break-words">
            <Link href={`/post/${post.uid}`}>{post.title}</Link>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link href={`/user/${post.user.uid}`}>
            <div className="relative w-6 h-6 flex-shrink-0">
              <Image
                src={post.user.avatar || "/default.png"}
                className="rounded-full object-cover"
                alt={post.user.name || "avatar"}
                fill
              />
            </div>
          </Link>

          <div className="text-xs">
            <div className="hover:underline break-words">
              <Link href={`/user/${post.user.uid}`}>{post.user.name}</Link>
            </div>
            <div className="text-gray-400">{date}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
