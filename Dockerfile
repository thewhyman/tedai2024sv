# Use an official Python runtime as the base image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install system dependencies needed for VidGear, OpenCV, and FFmpeg
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsm6 \
    libxext6 \
    libgl1-mesa-glx \
    && apt-get clean

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --upgrade pip

# Install any required packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

ENV HOST 0.0.0.0

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable for Flask to run in production mode
ENV FLASK_ENV=production

# Run app.py when the container launches
CMD ["python", "app.py"]
