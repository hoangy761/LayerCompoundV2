import { config } from "dotenv";

const configFile = `./.env`;
config({ path: configFile });

const { PORT, JWT_SECRET, NODE_ENV, CLIENT_URL } = process.env;

export default {
  PORT,
  JWT_SECRET,
  env: NODE_ENV,
  CLIENT_URL,
};
