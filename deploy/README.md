# Deploy

## Настройка сервера Ubuntu

```
sudo apt-get update & apt-get upgrade
```
```
sudo apt-get install ca-certificates curl gnupg
```

## Установка и настройка фаервола

```
sudo apt-get install ufw
```
Проверка текущего статуса
```
sudo ufw status verbose
```
Запретить все входящие запросы
```
sudo ufw default deny incoming
```
Разрешить все исходящие
```
sudo ufw default allow outgoing
```
Разрешить соединение по ssh, http и https
```
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
```
Активировать фаервол
```
sudo ufw enable
```

## Установка nginx

```
apt install nginx
```
Автозагрузка
```
systemctl enable nginx
```
Проверяем автозагрузку
```
systemctl is-enabled nginx
```
Запуск
```
service nginx start
```
Статус
```
service nginx status
```
Перезапуск
```
service nginx restart
```

## Установка NODEJS

Загрузка скрипта установки
```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```
Установки
```
apt install nodejs
```
Проверка версии ноды и npm
```
node -v
npm -v
```

## Установка Docker

Добавление официального GPG-ключа
```
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```
Настройка репозитория
```
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
Обновление индексов пакетов
```
sudo apt-get update
```
Установка последней версии
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
Проверка статуса
```
sudo systemctl status docker
```
