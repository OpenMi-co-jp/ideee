up:
	docker-compose up

upd:
	docker-compose up -d

upd_create_migrate:
	docker-compose up -d
	docker-compose exec web rake db:create
	docker-compose exec web rake db:migrate

down:
	docker-compose down

db_create:
	docker-compose exec web rake db:create

db_migrate:
	docker-compose exec web rake db:migrate