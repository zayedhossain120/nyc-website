/* eslint-disable @typescript-eslint/no-explicit-any */

import { cloudflareService } from "./cloudflare.service";

// -----------------------
// NESTED VALUE HELPERS
// -----------------------
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split(".");
  const lastKey = keys.pop()!;
  const deep = keys.reduce((acc, key) => {
    if (typeof acc[key] !== "object" || acc[key] === null) {
      acc[key] = {};
    }
    return acc[key];
  }, obj);
  deep[lastKey] = value;
}

// -----------------------
// GET (Append Public URLs)
// -----------------------
export async function appendPhotoUrls<T extends Record<string, any>>(
  items: T | T[],
  photoFields: string[]
): Promise<T | T[]> {
  const isArray = Array.isArray(items);
  const list = isArray ? items : [items];

  const processed = await Promise.all(
    list.map(async (originalItem) => {
      const item =
        typeof originalItem.toObject === "function"
          ? originalItem.toObject()
          : originalItem;

      for (const path of photoFields) {
        const fileName = getNestedValue(item, path);
        if (typeof fileName === "string" && fileName) {
          setNestedValue(item, `${path}Url`, cloudflareService.getDownloadUrl(fileName));
        }
      }

      return item;
    })
  );

  return isArray ? processed : processed[0];
}

// -----------------------
// CREATE (Upload Only New Fields)
// -----------------------
export async function createObjectWithPhotos<T extends Record<string, any>>(
  payload: T,
  photoFields: string[]
): Promise<{ updatedPayload: T; uploadUrls: Record<string, string> }> {
  const uploadUrls: Record<string, string> = {};

  const safePayload =
    typeof (payload as any)?.toObject === "function"
      ? (payload as any).toObject()
      : payload;

  await Promise.all(
    photoFields.map(async (path) => {
      const value = getNestedValue(safePayload, path);
      if (value) {
        const signedUrl = await cloudflareService.getUploadUrl(value);
        setNestedValue(payload, path, signedUrl.fileName);
        uploadUrls[path] = signedUrl.uploadUrl;
      }
    })
  );

  return { updatedPayload: payload, uploadUrls };
}

// -----------------------
// UPDATE WITH PHOTOS
// -----------------------
export async function updateObjectWithPhotos<T extends Record<string, any>>(
  payload: T,
  existing: Partial<T>,
  photoFields: string[]
): Promise<{ updatedPayload: T; uploadUrls: Record<string, string> }> {
  const uploadUrls: Record<string, string> = {};

  const safePayload =
    typeof (payload as any)?.toObject === "function"
      ? (payload as any).toObject()
      : payload;

  const safeExisting =
    typeof (existing as any)?.toObject === "function"
      ? (existing as any).toObject()
      : existing;

  for (const path of photoFields) {
    const newValue = getNestedValue(safePayload, path);
    const oldValue = getNestedValue(safeExisting, path);

    if (typeof newValue === "string" && newValue && newValue !== oldValue) {
      const signedUrl = await cloudflareService.getUploadUrl(newValue);
      setNestedValue(payload, path, signedUrl.fileName);
      uploadUrls[path] = signedUrl.uploadUrl;

      if (oldValue) await cloudflareService.deleteFile(oldValue);
    } else if (typeof newValue === "string" && newValue === "" && oldValue) {
      await cloudflareService.deleteFile(oldValue);
      setNestedValue(payload, path, "");
    }
  }

  return { updatedPayload: payload, uploadUrls };
}

// -----------------------
// DELETE (Remove Files)
// -----------------------
export async function deletePhotosFromObject<T extends Record<string, any>>(
  item: T,
  photoFields: string[]
): Promise<void> {
  const safeItem =
    typeof (item as any)?.toObject === "function" ? item.toObject() : item;

  await Promise.all(
    photoFields.map(async (path) => {
      const fileName = getNestedValue(safeItem, path);
      if (typeof fileName === "string" && fileName) {
        await cloudflareService.deleteFile(fileName);
      }
    })
  );
}