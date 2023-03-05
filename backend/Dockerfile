FROM python:3.10-slim-buster

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
COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

# Copy project files
COPY . .

RUN mkdir /scripts
COPY ./scripts /scripts
RUN sed -i 's/\r$//g' /scripts/entrypoint.sh
RUN chmod +x /scripts/*

# Prepare user and permissions
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
RUN chown -R appuser:appgroup /app
RUN chown -R appuser:appgroup /scripts
RUN chmod -R 755 /app

# Switch to appuser
USER appuser

# Run entrypoint
ENTRYPOINT ["/scripts/entrypoint.sh"]
