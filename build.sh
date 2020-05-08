cp auth.env auth/.env
cp weather.env weather/.env
cp proxy.env proxy/.env
docker-compose build
docker-compose up
