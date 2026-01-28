FROM python:3.14-alpine

ENV PYTHONUNBUFFERED=1

ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

RUN chmod +x entrypoint.sh
