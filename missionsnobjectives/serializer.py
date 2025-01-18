from rest_framework import serializers
from .models import Objective

class ObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objective

        # Which fields the API will include to CRUD
        fields = '__all__'
        # Read only data
        read_only_fields = []