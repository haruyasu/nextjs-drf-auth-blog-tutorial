"use server"

import { UserType } from "@/lib/nextauth"

// 共通のAPIリクエスト
const fetchAPI = async (url: string, options: RequestInit) => {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    return { success: false, error: "API URLが設定されていません" }
  }

  try {
    const response = await fetch(`${apiUrl}${url}`, options)

    if (!response.ok) {
      return { success: false, error: "APIでエラーが発生しました" }
    }

    // Content-Type ヘッダーが application/json の場合のみ、JSON を解析する
    const contentType = response.headers.get("Content-Type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()
      return { success: true, data }
    }

    // データなしで成功を返す
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "ネットワークエラーが発生しました" }
  }
}

export interface PostType {
  uid: string
  user: UserType
  image: string | undefined
  title: string
  content: string
  updated_at: string
  created_at: string
}

// 投稿一覧取得
export const getPostList = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // 投稿一覧取得
  const result = await fetchAPI("/api/post-list/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, posts: [] }
  }

  const posts: PostType[] = result.data

  return { success: true, posts }
}

// 投稿詳細取得
export const getPostDetail = async ({ postId }: { postId: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // 投稿詳細取得
  const result = await fetchAPI(`/api/post-detail/${postId}/`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, post: null }
  }

  const post: PostType = result.data

  return { success: true, post }
}

interface CreatePostType {
  accessToken: string
  title: string
  content: string
  image: string | undefined
}

// 新規投稿
export const createPost = async ({
  accessToken,
  title,
  content,
  image,
}: CreatePostType) => {
  const body = JSON.stringify({
    title: title,
    content: content,
    image: image,
  })

  const options = {
    method: "POST",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  }

  // 新規投稿を送信
  const result = await fetchAPI("/api/posts/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, post: null }
  }

  const post: PostType = await result.data

  return { success: true, post }
}

interface UpdatePostType {
  accessToken: string
  postId: string
  title: string
  content: string
  image: string | undefined
}

// 投稿編集
export const updatePost = async ({
  accessToken,
  postId,
  title,
  content,
  image,
}: UpdatePostType) => {
  const body = JSON.stringify({
    title: title,
    content: content,
    image: image,
  })

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  }

  // 投稿編集を送信
  const result = await fetchAPI(`/api/posts/${postId}/`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  return { success: true }
}

interface DeletePostType {
  accessToken: string
  postId: string
}

// 投稿削除
export const deletePost = async ({ accessToken, postId }: DeletePostType) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `JWT ${accessToken}`,
    },
  }

  // 投稿削除を送信
  const result = await fetchAPI(`/api/posts/${postId}/`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  return { success: true }
}
