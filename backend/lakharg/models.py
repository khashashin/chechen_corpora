from django.db import models
from django.db.models import ForeignKey

from zubdarg.models import Page


class Words(models.Model):
    word = models.CharField(max_length=200)
    description = models.TextField()

    def __unicode__(self):
        return self.word

    class Meta:
        unique_together = ('word', 'description')


class Version(models.Model):
    reference_id = ForeignKey(Page, on_delete=models.CASCADE)
    version = models.CharField(max_length=20)

    def __unicode__(self):
        return self.reference_id

    class Meta:
        unique_together = ('reference_id', 'version')