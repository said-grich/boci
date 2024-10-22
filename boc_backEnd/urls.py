"""
URL configuration for boc_backEnd project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from boc_backEnd import views
urlpatterns = [
    path('', views.home, name='home'),
    path('', include('documents_parser.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('profile/',views.profile_page, name='profile_page'),
    path('logine/',views.Login1, name='Logine'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)