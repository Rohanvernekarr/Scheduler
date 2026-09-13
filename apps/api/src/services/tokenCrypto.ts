import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

const algorithm = 'aes-256-gcm';

function getKey() {
  const secret = process.env.INTEGRATION_TOKEN_SECRET || process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error('INTEGRATION_TOKEN_SECRET or AUTH_SECRET is required for integration token storage');
  }

  return createHash('sha256').update(secret).digest();
}

export function encryptToken(value?: string | null) {
  if (!value) return null;

  const iv = randomBytes(12);
  const cipher = createCipheriv(algorithm, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${iv.toString('base64')}.${tag.toString('base64')}.${encrypted.toString('base64')}`;
}

export function decryptToken(value?: string | null) {
  if (!value) return null;

  const [iv, tag, encrypted] = value.split('.');
  if (!iv || !tag || !encrypted) return value;

  const decipher = createDecipheriv(algorithm, getKey(), Buffer.from(iv, 'base64'));
  decipher.setAuthTag(Buffer.from(tag, 'base64'));

  return Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'base64')),
    decipher.final(),
  ]).toString('utf8');
}
