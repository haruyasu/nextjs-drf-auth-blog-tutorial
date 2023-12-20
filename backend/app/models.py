from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from hashids import Hashids


# 投稿モデル
class Post(models.Model):
    uid = models.CharField("uid", max_length=30, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name="ユーザー", on_delete=models.CASCADE
    )
    image = models.ImageField(
        upload_to="post", verbose_name="サムネイル", null=True, blank=True
    )
    title = models.CharField("タイトル", max_length=255)
    content = models.TextField("内容")
    updated_at = models.DateTimeField("更新日", auto_now=True)
    created_at = models.DateTimeField("作成日", auto_now_add=True)

    class Meta:
        verbose_name = "投稿"
        verbose_name_plural = "投稿"

    def __str__(self):
        return self.title


# 投稿が保存された後に実行されるシグナルレシーバー
@receiver(post_save, sender=Post)
def generate_random_post_uid(sender, instance, created, **kwargs):
    # 新規作成時にランダムUIDを生成
    if created:
        hashids = Hashids(salt="xRXSMT8XpzdUbDNM9qkv6raerwre3223", min_length=8)
        instance.uid = hashids.encode(instance.id)
        instance.save()
