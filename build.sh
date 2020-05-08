cp auth.env auth/.env
cp weather.env weather/.env
cp proxy.env proxy/.env
sudo docker-compose build
sudo docker-compose up
