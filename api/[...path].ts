import { createApp } from "../server/app";

let appPromise: ReturnType<typeof createApp> | undefined;

export default async function handler(req: any, res: any) {
  appPromise ??= createApp({ production: true });
  const { app } = await appPromise;
  return app(req, res);
}
