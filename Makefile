
docker-base:
	docker build -t molequle.azurecr.io/molequle-sales-app-base:latest -f app-build/docker/base.Dockerfile . && \
		docker push molequle.azurecr.io/molequle-sales-app-base:latest

# Azure
azure-login:
	az acr login -n molequle