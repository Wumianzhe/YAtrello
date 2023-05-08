from django.contrib.auth.models import BaseUserManager
from django.db import migrations

class ProfileManager(BaseUserManager):
    def create_user(self,username, email, password, **extra_fields):
        if not email:
            raise (ValueError('The email must me set'))
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self, username, email, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password,  **extra_fields)