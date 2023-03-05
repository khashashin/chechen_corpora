FROM python:3.9-slim-buster

# Install build dependencies
RUN apt-get update \
    && apt-get install -y build-essential \
    && apt-get install -y libpq-dev \
    && apt-get install -y gettext \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

# Prepare working directory
RUN mkdir /app
RUN mkdir /app/staticfiles
RUN mkdir /app/media
WORKDIR /app

# Install Python dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /app/
RUN pip install -r requirements.txt

# Copy project files
COPY . /app

RUN mkdir /scripts
COPY ./scripts /scripts
RUN sed -i 's/\r$//g' /scripts/entrypoint.sh
RUN chmod +x /scripts/*

# Prepare user and permissions
RUN addgroup --system khas && adduser --system --ingroup khas khas
RUN chown khas:khas /app/*
RUN chown khas:khas /app/lakharg/management/commands/*
RUN chown khas:khas /scripts/*
RUN chmod 755 /app/*
RUN chmod 755 /app/lakharg/management/commands/*

# Switch to appuser
USER khas

# Run entrypoint
ENTRYPOINT ["sh", "/scripts/entrypoint.sh"]
