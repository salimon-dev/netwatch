#!/bin/bash

set -e

ENV="$1"

if [[ "$ENV" != "dev" && "$ENV" != "prod" ]]; then
  echo "Usage: $0 dev|prod"
  exit 1
fi
npm install
npm run build

BUCKET_NAME="salimon-netwatch-$ENV"
BUILD_DIR="./dist"
echo "🧹 Emptying bucket s3://$BUCKET_NAME ..."
aws s3 rm s3://$BUCKET_NAME --recursive

echo "📤 Uploading React app to s3://$BUCKET_NAME ..."
aws s3 sync $BUILD_DIR s3://$BUCKET_NAME --delete
echo "✅ Deployment to $ENV completed successfully."
