import { auth } from "../auth";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: {},
  });

  return session?.user || null;
};
