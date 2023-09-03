default: up

up:
	docker-compose -f api/docker-compose.yml up -d
	docker-compose -f client/docker-compose.yml up -d
	sleep 5
	docker-compose -f api/docker-compose.yml logs -f
	docker-compose -f client/docker-compose.yml logs -f

up_build:
	docker-compose -f api/docker-compose.yml up -d --build
	docker-compose -f client/docker-compose.yml up -d --build
	sleep 5
	docker-compose -f api/docker-compose.yml logs -f
	docker-compose -f client/docker-compose.yml logs -f

backend:
	docker-compose -f api/docker-compose.yml up -d
	sleep 5
	docker-compose -f api/docker-compose.yml logs -f

backend_build:
	docker-compose -f api/docker-compose.yml up -d --build
	sleep 5
	docker-compose -f api/docker-compose.yml logs -f

frontend:
	docker-compose -f client/docker-compose.yml up -d
	sleep 5
	docker-compose -f client/docker-compose.yml logs -f

frontend_build:
	docker-compose -f client/docker-compose.yml up -d --build
	sleep 5
	docker-compose -f client/docker-compose.yml logs -f

down:
	docker-compose -f api/docker-compose.yml down
	docker-compose -f client/docker-compose.yml down

down_backend:
	docker-compose -f api/docker-compose.yml down

down_frontend:
	docker-compose -f client/docker-compose.yml down
