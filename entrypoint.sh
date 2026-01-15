#!/bin/sh

# Generar archivo de configuración con variables de entorno
cat <<EOF > /usr/share/nginx/html/config.js
window._env_ = {
  VITE_API_URL: "${VITE_API_URL}",
  VITE_URL_REPORT: "${VITE_URL_REPORT}",
  VITE_URL_WEB: "${VITE_URL_WEB}"
};
EOF

# Iniciar nginx
exec nginx -g 'daemon off;'
