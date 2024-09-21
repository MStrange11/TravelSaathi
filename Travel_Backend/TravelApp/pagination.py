from rest_framework.pagination import PageNumberPagination

class HotelPagination(PageNumberPagination):
    page_size = 10  # Set default page size
    page_size_query_param = 'limit'  # Allow the client to set page size
    max_page_size = 100  # Maximum page size that can be requested
