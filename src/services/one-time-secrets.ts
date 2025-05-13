import crypto from "crypto";
import secretsModel from "../models/secrets.model";
import oneTimeSecretsModel from "../models/one-time-secrets.model";

interface Secret {
  id: string;
  value: string;
  createdAt: Date;
  expiresAt: Date;
}

export const ONE_TIME_SECRET_TTL = 5 * 60 * 1000; // 5 minutes

export const generate_secret = async (
  value: string,
  ttl: number,
  password: string,
  lifespan: number
) => {
  const id = crypto.randomUUID();
  const createdAt = new Date();
  const secret_ttl = new Date(createdAt.getTime() + ttl);

  const key = crypto.createHash("sha256").update(id).digest("hex");
  // const encryptedValue = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.alloc(16, 0)).update(value, 'utf8', 'hex') + crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.alloc(16, 0)).final('hex');

  const secret = await secretsModel.create({
    key,
    secret_ttl,
    password,
    has_password: !!password,
    lifespan,
  });

  await oneTimeSecretsModel.create({
    secret: secret._id,
    

  });
};

class OneTimeSecretsService {
  private secrets: Map<string, Secret> = new Map();

  generateSecret(value: string, ttl: number): string {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + ttl);

    this.secrets.set(id, { id, value, createdAt, expiresAt });
    return id;
  }

  retrieveSecret(id: string): string | null {
    const secret = this.secrets.get(id);

    if (!secret) {
      return null;
    }

    if (new Date() > secret.expiresAt) {
      this.secrets.delete(id);
      return null;
    }

    this.secrets.delete(id);
    return secret.value;
  }

  cleanupExpiredSecrets(): void {
    const now = new Date();
    for (const [id, secret] of this.secrets.entries()) {
      if (now > secret.expiresAt) {
        this.secrets.delete(id);
      }
    }
  }
}

export default OneTimeSecretsService;
