from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer


# 投稿一覧を提供するAPIビュー
class PostListView(ListAPIView):
    # 更新日時で降順に並べ替え
    queryset = Post.objects.all().order_by("-updated_at")
    serializer_class = PostSerializer
    # どのユーザーでもアクセス可能
    permission_classes = (AllowAny,)


# 特定の投稿の詳細を提供するAPIビュー
class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # どのユーザーでもアクセス可能
    permission_classes = (AllowAny,)
    # 投稿を識別するためにuidフィールドを使用
    lookup_field = "uid"


# 新規投稿、投稿編集、投稿削除を行うAPIビューセット
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # 投稿を識別するためにuidフィールドを使用
    lookup_field = "uid"

    # 新規投稿時のユーザー情報の保存処理
    def perform_create(self, serializer, **kwargs):
        # 投稿を作成するユーザーを設定
        serializer.save(user=self.request.user)
