import jwt from 'jsonwebtoken';

type UserPayload = {
  id: string;
  email: string;
  name?: string;
  role?: string;
};

const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

const getSecrets = () => {
  const secret = process.env.NEXTAUTH_SECRET || 'dev-secret';
  return {
    accessSecret: `${secret}-access`,
    refreshSecret: `${secret}-refresh`,
  };
};

export function issueTokens(user: UserPayload) {
  const { accessSecret, refreshSecret } = getSecrets();

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, role: user.role, typ: 'access' },
    accessSecret,
    { expiresIn: ACCESS_TOKEN_TTL_SECONDS }
  );

  const refreshToken = jwt.sign(
    { sub: user.id, email: user.email, role: user.role, typ: 'refresh' },
    refreshSecret,
    { expiresIn: REFRESH_TOKEN_TTL_SECONDS }
  );

  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string) {
  const { accessSecret } = getSecrets();
  return jwt.verify(token, accessSecret) as jwt.JwtPayload;
}

export function verifyRefreshToken(token: string) {
  const { refreshSecret } = getSecrets();
  return jwt.verify(token, refreshSecret) as jwt.JwtPayload;
}

export async function encode({ token }: any) {
  const { accessSecret } = getSecrets();
  return jwt.sign(token, accessSecret, { expiresIn: ACCESS_TOKEN_TTL_SECONDS });
}

export async function decode({ token }: any) {
  const { accessSecret } = getSecrets();
  try {
    return jwt.verify(token!, accessSecret) as Record<string, any>;
  } catch {
    return null;
  }
}