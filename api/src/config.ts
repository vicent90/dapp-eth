import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'INFURA_PROJECT_ID',
  'INFURA_URL',
  'PRIVATE_KEY',
  'CONTRACT_ADDRESS',
  'PINATA_API_KEY',
  'PINATA_API_SECRET',
  'PINATA_JWT',
  'CORS_ALLOWED_ORIGINS',
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Error: Missing environment variable ${varName}`);
    process.exit(1);
  }
});

const corsAllowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',').map(origin => new RegExp(origin.trim())) || [];

export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || corsAllowedOrigins.some((regex) => regex.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export const config = {
  infuraProjectId: process.env.INFURA_PROJECT_ID!,
  infuraUrl: process.env.INFURA_URL!,
  privateKey: process.env.PRIVATE_KEY!,
  contractAddress: process.env.CONTRACT_ADDRESS!,
  pinataApiKey: process.env.PINATA_API_KEY!,
  pinataApiSecret: process.env.PINATA_API_SECRET!,
  pinataJwt: process.env.PINATA_JWT!,
  port: process.env.PORT || 3000,
};
