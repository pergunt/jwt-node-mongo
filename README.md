1. To start the app, use this command "docker-compose up --build"
2. It is important to tell the "http-server" module to tie the frontend/build to -a 0.0.0.0 
3. Make sure you access the localhost from your host machine http://localhost:8000/ so the browser sets cookies correctly (you will see a different address in docker logs but you must access localhost)

# Backend .env vars
### PORT=your port
### DATABASE_URL=mongodb_url
I used https://temp-mail.org/ to create users

### JWT_ACCESS_SECRET="your value"
### JWT_REFRESH_SECRET="your value"
### JWT_ACCESS_EXPIRATION='30m' // https://github.com/vercel/ms
### JWT_REFRESH_EXPIRATION='30d' // https://github.com/vercel/ms

### SMTP_HOST="smtp.gmail.com" // https://support.google.com/mail/topic/7280141?hl=en&ref_topic=7280290&sjid=2669985190120301000-EU
### SMTP_PORT=587
### SMTP_USER="your smtp user"
### SMTP_PASSWORD="your password" // https://myaccount.google.com/apppasswords

### API_URL=http://localhost:8080
### CORS_URLS=http://localhost:8080 http://127.0.0.1:8000 http://localhost:3000 http://localhost:8000

# Frontend .env vars
### PORT=your port
### REACT_APP_API_URL="http://localhost:8080/api"
