export type JWTPayload = {
  userId: string;
  sessionId: string;
  exp: number;
  jwt: string;
};

export const decodeJWT = (jwt: string): JWTPayload => {
  const base64Url = jwt.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(''),
  );

  const payload: JWTPayload = JSON.parse(jsonPayload);

  return {
    ...payload,
    jwt,
  };
};

export const checkJwt = (payload: JWTPayload) => {
  const { exp } = payload;
  const now = Date.now() / 1000;
  if (now > exp) {
    return false;
  }

  return true;
};
