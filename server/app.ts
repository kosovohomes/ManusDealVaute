import "dotenv/config";
import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { parse as parseCookies } from "cookie";
import { registerOAuthRoutes } from "./_core/oauth";
import { publicPlatformScript } from "./_core/publicConfig";
import { setupVite, serveStatic } from "./_core/vite";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { clearSessionCookie, createSession, destroySession, getSessionUser, publicUser, registerAccount, loginAccount, setSessionCookie } from "./auth";
import type { User } from "../drizzle/schema";

function requireUser(user: User | null, res: Response) {
  if (!user) { res.status(401).json({ error: "Authentication required." }); return false; }
  return true;
}

function requireAdmin(user: User | null, res: Response) {
  if (!user || user.role !== "admin") { res.status(403).json({ error: "Administrator access required." }); return false; }
  return true;
}

export async function createApp(options: { production?: boolean; server?: Server } = {}) {
  const app = express();
  const server = options.server ?? createServer(app);
  app.use((req, _res, next) => { (req as Request & { cookies?: Record<string, string> }).cookies = parseCookies(req.headers.cookie ?? ""); next(); });
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/platform/config.js", (_req, res) => res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript()));

  app.post("/api/auth/register", async (req, res) => {
    try {
      const user = await registerAccount(req.body ?? {});
      const token = await createSession(user.id);
      setSessionCookie(res, token);
      res.status(201).json({ user: publicUser(user) });
    } catch (error) { res.status(400).json({ error: error instanceof Error ? error.message : "Registration failed." }); }
  });
  app.post("/api/auth/login", async (req, res) => {
    try {
      const user = await loginAccount(String(req.body?.email ?? ""), String(req.body?.password ?? ""));
      const token = await createSession(user.id);
      setSessionCookie(res, token);
      res.json({ user: publicUser(user) });
    } catch (error) { res.status(401).json({ error: error instanceof Error ? error.message : "Login failed." }); }
  });
  app.get("/api/auth/me", async (req, res) => {
    const user = await getSessionUser(req);
    res.json({ user: user ? publicUser(user) : null });
  });
  app.post("/api/auth/logout", async (req, res) => {
    await destroySession(req); clearSessionCookie(res); res.json({ success: true });
  });
  app.use("/api/admin", async (req: Request, res: Response, next: NextFunction) => {
    const user = await getSessionUser(req);
    if (!user || user.role !== "admin") { res.status(403).json({ error: "Administrator access required." }); return; }
    (req as Request & { user?: User }).user = user;
    next();
  });

  registerOAuthRoutes(app);
  app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));
  if (options.production ?? process.env.NODE_ENV !== "development") serveStatic(app); else await setupVite(app, server);
  return { app, server };
}
