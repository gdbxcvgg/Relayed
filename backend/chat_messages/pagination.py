from rest_framework.pagination import BasePagination
from rest_framework.request import Request
from rest_framework.response import Response
from django.db.models.query import QuerySet
from .models import Message


class BeforeLimitPagination(BasePagination):
    before_query_param = "before"
    limit_query_param = "limit"
    default_limit = 25
    max_limit = 100

    def get_count(self, queryset: QuerySet):
        return queryset.count()

    def get_limit(self, request: Request):
        try:
            return min(
                int(request.query_params[self.limit_query_param]), self.max_limit
            )
        except (KeyError, ValueError):
            return self.default_limit

    def get_before(self, request: Request, queryset: QuerySet):
        try:
            return request.query_params[self.before_query_param]
        except (KeyError, ValueError):
            return None

    def paginate_queryset(self, queryset: QuerySet, request: Request, view=None):
        self.count = self.get_count(queryset=queryset)
        self.limit = self.get_limit(request=request)
        self.before = self.get_before(request=request, queryset=queryset)

        if self.count == 0:
            return []

        if self.before:
            try:
                return queryset.filter(id__lt=self.before)[: self.limit]
            except:
                return []

        return queryset[: self.limit]

    def get_paginated_response(self, data):
        return Response(data)
