export default () => {
    const ENV_VARS = [
        'PORT',
        'DATABASE_URL',
        'CORS_URLS',
        "API_URL",
        "SMTP_PASSWORD",
        "SMTP_USER",
        "SMTP_PORT",
        "SMTP_HOST",
        "JWT_ACCESS_SECRET",
        "JWT_REFRESH_SECRET",
        'JWT_ACCESS_EXPIRATION',
        'JWT_REFRESH_EXPIRATION',
        "DATABASE_URL",
    ]

    const {environment, error} = ENV_VARS.reduce(
        (prev, key) => {
            const envVar = process.env[key];

            if (!envVar) {
                prev.error = `${prev.error},${key} `;
            } else {
                prev.environment[key] = envVar;
            }

            return prev;
        },
        {
            error: "",
            environment: {}
        }
    );

    if (error) {
        console.log(`Add the following vars into .env file: ${error}`);
        process.exit(1);
        return
    }

    return environment
}
