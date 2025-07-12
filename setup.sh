#!/bin/bash

set -e

ENV="$1"

if [[ "$ENV" != "dev" && "$ENV" != "prod" ]]; then
  echo "Usage: $0 dev|prod"
  exit 1
fi

sam build

echo "Deploying to $ENV environment..."

if [ "$ENV" == "dev" ]; then
  sam deploy --no-confirm-changeset --config-file ./development.toml
else
  sam deploy --no-confirm-changeset --config-file ./production.toml
fi

echo "✅ Deployment to $ENV completed successfully."

