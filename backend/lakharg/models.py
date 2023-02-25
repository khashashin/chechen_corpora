from django.db import models

class Words(models.Model):
    word = models.CharField(max_length=200)
    description = models.TextField()

    def __unicode__(self):
        return self.word

    class Meta:
        unique_together = ('word', 'description')