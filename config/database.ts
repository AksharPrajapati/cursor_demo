export const dbConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "gen_ai_app",
  password: process.env.DB_PASSWORD || "password",
  port: parseInt(process.env.DB_PORT || "5432"),
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET || "your-secret-key",
  expiresIn: "7d",
};
