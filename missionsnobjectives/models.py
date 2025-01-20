from django.db import models

class Objective(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    creation_date = models.DateField()
    deadline = models.DateField(auto_now=False)
    completed = models.BooleanField(default=False)
    completion_date = models.DurationField(null=True, blank=True)
    
    def __str__(self):
        return self.title