from rest_framework import serializers
from accounts.serializers import UserSerializer
from mysite.utils import Base64ImageField
from app.models import Post


# 投稿のシリアライザー
class PostSerializer(serializers.ModelSerializer):
    # uidフィールドは読み取り専用
    uid = serializers.CharField(read_only=True)
    # Userモデルのシリアライザーを組み込み(読み取り専用)
    user = UserSerializer(read_only=True)
    # Base64エンコードされた画像を受け入れるカスタムフィールド
    image = Base64ImageField(
        max_length=None, use_url=True, required=False, allow_null=True
    )

    class Meta:
        model = Post
        fields = "__all__"
