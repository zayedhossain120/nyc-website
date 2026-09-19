/**
 * Database seed. Run with `npm run seed`.
 *
 * Creates the first administrator account so you can sign in at /admin without
 * going through the one-time bootstrap screen. It reads credentials from the
 * environment (.env) and never hard-codes a password:
 *
 *   ADMIN_NAME      optional, defaults to "NYC Digital Admin"
 *   ADMIN_EMAIL     required
 *   ADMIN_PASSWORD  required, at least 8 characters
 *
 * Safe to run more than once: an existing account with the same email is left
 * untouched (use the admin panel to change its password).
 */
import mongoose from "mongoose";
import config from "@/config";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const MIN_PASSWORD_LENGTH = 8;

function fail(message: string): never {
  console.error(`\nSeed failed: ${message}\n`);
  process.exit(1);
}

function readAdminCredentials() {
  const name = process.env.ADMIN_NAME?.trim() || "NYC Digital Admin";
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    fail(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env (uncomment them and choose your own values).",
    );
  }
  if (!/.+@.+\..+/.test(email)) {
    fail(`ADMIN_EMAIL "${email}" is not a valid email address.`);
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    fail(`ADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  }
  return { name, email, password };
}

/** Database name only, so the target is visible without printing credentials. */
function targetDatabase(): string {
  try {
    const url = new URL(config.mongodb_uri);
    return `${url.hostname}${url.pathname}`;
  } catch {
    return "(unparseable MONGODB_URI)";
  }
}

async function seedAdmin() {
  const { name, email, password } = readAdminCredentials();

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin "${email}" already exists, skipping.`);
    return;
  }

  await User.create({ name, email, password, role: "admin" });
  console.log(`Created admin "${email}".`);
}

async function main() {
  if (!config.mongodb_uri) fail("MONGODB_URI is not set in .env.");

  // Validate credentials before touching the database.
  readAdminCredentials();

  console.log(`Seeding database: ${targetDatabase()}`);
  await dbConnect();

  await seedAdmin();
}

main()
  .then(() => mongoose.disconnect())
  .then(() => console.log("Seed complete."))
  .catch(async (error: unknown) => {
    console.error("\nSeed failed:", error instanceof Error ? error.message : error);
    await mongoose.disconnect().catch(() => undefined);
    process.exit(1);
  });
