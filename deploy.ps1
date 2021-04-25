aws s3 sync ./src s3://www.marinkofamily.com --exclude "*.js" --delete
aws s3 sync ./src s3://www.marinkofamily.com --exclude "*" --include "*.js" --content-type "application/javascript"