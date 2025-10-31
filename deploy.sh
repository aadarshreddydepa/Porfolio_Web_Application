#!/bin/bash

echo "Building Docker image for AMD64..."
docker buildx build --platform linux/amd64 -t aadarshreddy/portfolio-app:latest --push .

echo "Connecting to EC2 and deploying..."
ssh -i ~/.ssh/portfolio-key.pem ec2-user@3.111.149.113 << 'EOF'
  docker pull aadarshreddy/portfolio-app:latest
  docker stop portfolio-app || true
  docker rm portfolio-app || true
  docker run -d \
    -p 80:80 \
    --name portfolio-app \
    --restart unless-stopped \
    aadarshreddy/portfolio-app:latest
  docker image prune -af
  echo "✅ Deployment successful!"
EOF

echo "✅ Your portfolio is now live!"
