import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash } from "node:crypto";
import { promisify } from "node:util";
import { and, eq, gt } from "drizzle-orm";
import type { Request, Response } from "express";
import { sessions, users, type User } from "../drizzle/schema";
import { getDb } from "./db";

const scrypt = promisify(scryptCallback);
export const AUTH_COOKIE = "dealvault_session";
const SESSION_DAYS = 30;

export type PublicUser = Pick<User, "id" | "name" | "email" | "role" | "emailVerified" | "createdAt">;

export function publicUser(user: User): PublicUser {
  return { id: user.id, name: user.name, email: user.email, role: user.role, emailVerified: user.emailVerified, createdAt: user.createdAt };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [salt, encoded] = stored.split(":");
  if (!salt || !encoded) return false;
  const expected = Buffer.from(encoded, "hex");
  const actual = (await scrypt(password, salt, 64)) as Buffer;
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function cookieOptions() {
  return { httpOnly: true, sameSite: "none" as const, secure: true, path: "/", maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000 };
}

export function setSessionCookie(res: Response, token: string) {
  res.cookie(AUTH_COOKIE, token, cookieOptions());
}

export function clearSessionCookie(res: Response) {
  res.clearCookie(AUTH_COOKIE, { ...cookieOptions(), maxAge: 0 });
}

export async function registerAccount(input: { name: string; email: string; password: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured. Set DATABASE_URL before using authentication.");
  const name = input.name.trim();
  const email = normalizeEmail(input.email);
  if (name.length < 2) throw new Error("Please enter your name.");
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Enter a valid email address.");
  if (input.password.length < 8) throw new Error("Password must be at least 8 characters.");
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing[0]) throw new Error("An account with this email already exists.");
  const adminEmail = normalizeEmail(process.env.DEALVAULT_ADMIN_EMAIL || "");
  const [created] = await db.insert(users).values({
    openId: `password:${email}`,
    name,
    email,
    loginMethod: "password",
    passwordHash: await hashPassword(input.password),
    emailVerified: 1,
    role: adminEmail && email === adminEmail ? "admin" : "user",
    lastSignedIn: new Date(),
  }).$returningId();
  const user = await db.select().from(users).where(eq(users.id, created.id)).limit(1);
  if (!user[0]) throw new Error("Could not create the account.");
  return user[0];
}

export async function loginAccount(emailInput: string, password: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured. Set DATABASE_URL before using authentication.");
  const email = normalizeEmail(emailInput);
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = result[0];
  if (!user?.passwordHash || !(await verifyPassword(password, user.passwordHash))) throw new Error("Email or password is incorrect.");
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));
  return user;
}

export async function createSession(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured.");
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.insert(sessions).values({ userId, tokenHash: hashToken(token), expiresAt });
  return token;
}

export async function getSessionUser(req: Request): Promise<User | null> {
  const token = req.cookies?.[AUTH_COOKIE] as string | undefined;
  if (!token) return null;
  const db = await getDb();
  if (!db) return null;
  const now = new Date();
  const rows = await db.select({ user: users, session: sessions }).from(sessions).innerJoin(users, eq(sessions.userId, users.id)).where(and(eq(sessions.tokenHash, hashToken(token)), gt(sessions.expiresAt, now))).limit(1);
  if (!rows[0]) return null;
  await db.update(sessions).set({ lastSeenAt: now }).where(eq(sessions.id, rows[0].session.id));
  return rows[0].user;
}

export async function destroySession(req: Request) {
  const token = req.cookies?.[AUTH_COOKIE] as string | undefined;
  const db = await getDb();
  if (db && token) await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(token)));
}

export function requireUser(user: User | null): asserts user is User {
  if (!user) throw new Error("Authentication required.");
}

export function requireAdmin(user: User | null): asserts user is User {
  if (!user || user.role !== "admin") throw new Error("Administrator access required.");
}
