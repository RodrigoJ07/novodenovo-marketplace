# Usa uma imagem leve do Nginx
FROM nginx:alpine

# Copia os ficheiros do teu projeto para a pasta do servidor Nginx
COPY ./src /usr/share/nginx/html

# Copia uma configuração personalizada do Nginx (opcional, mas recomendado)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
