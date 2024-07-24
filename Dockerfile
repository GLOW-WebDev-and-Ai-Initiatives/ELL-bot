# Choose version of python
FROM python:3.12

# Set up a working directory
WORKDIR /code

# Copy just the requirements into the directory so it gets cached by itself
COPY ./requirements.txt /code/requirements.txt

# Install dependencies from requirements
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy code into directory
COPY ./app /code/app

# Tell uvicorn to start spinning up our code, which will be running inside the container now
CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]