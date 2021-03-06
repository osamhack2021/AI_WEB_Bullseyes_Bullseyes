from rest_framework import serializers
from bullseyes_server.models import User, AccessUser
from drf_extra_fields.fields import Base64ImageField
from rest_framework.settings import api_settings
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    photourl = Base64ImageField(required=False, use_url=True)
    class Meta:
        model = User
        fields = ['id','photourl', 'rank', 'name', 'altid', 'company']
    def get_photo_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.photourl.url
        return request.build_absolute_uri(photo_url)
class AccessUserSerializer(serializers.ModelSerializer):
    photourl = Base64ImageField(required=False, use_url=True)
    time = serializers.DateTimeField(format='iso-8601')
    class Meta:
        model = AccessUser
        fields = ['id', 'photourl','place', 'time', 'rank', 'name','altid','company']
    
