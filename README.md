# Next.js14 と Django5 で作る！ブログシステム構築入門

このリポジトリは、Next.js14 と Django5 で作る！ブログシステム構築入門に関するものです。

![画像](https://res.cloudinary.com/dhaciqd0v/image/upload/v1703134104/LINE/youtube_nmyakz.png)

[動画チュートリアル](https://youtu.be/TaF0M0eCt0A)

[解説](https://zenn.dev/hathle/books/next-drf-auth-blog-book)

主な機能:

- 記事一覧表示
- 詳細表示
- 新規投稿
- 記事編集
- 記事削除

## バックエンド

### .env ファイルの設定

```env
CLOUDINARY_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
DEFAULT_FROM_EMAIL="xxx@gmail.com"
EMAIL_BACKEND="django.core.mail.backends.console.EmailBackend"
EMAIL_HOST_USER="xxx@gmail.com"
EMAIL_HOST_PASSWORD=""
EMAIL_HOST=smtp.gmail.com
SITE_DOMAIN=localhost:3000
SITE_NAME=""
```

## フロントエンド

### .env ファイルの設定

```env
NEXTAUTH_SECRET=""
NEXTAUTH_URL=http://localhost:3000
API_URL=http://localhost:8000
```
