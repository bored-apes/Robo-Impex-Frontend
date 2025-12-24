/**
 * Image URL utility functions
 * 
 * Standardizes Google Drive image URLs to thumbnail format for reliable display
 */

const PLACEHOLDER_IMAGE = "/placeholder.svg";

/**
 * Normalizes Google Drive URLs to thumbnail format
 * @param url - The image URL from the API (can be various Google Drive formats)
 * @returns Normalized thumbnail URL or placeholder if invalid
 */
export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return PLACEHOLDER_IMAGE;
  }

  const trimmedUrl = url.trim();

  // Extract file ID from Google Drive URLs
  let fileId: string | null = null;

  // From uc?id= format: https://drive.google.com/uc?id=FILE_ID
  if (trimmedUrl.includes("drive.google.com/uc")) {
    const match = trimmedUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      fileId = match[1];
    }
  }
  // From view URL: https://drive.google.com/file/d/FILE_ID/view
  else if (trimmedUrl.includes("drive.google.com/file/d/")) {
    const match = trimmedUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      fileId = match[1];
    }
  }
  // If it's just a file ID
  else if (/^[a-zA-Z0-9_-]+$/.test(trimmedUrl)) {
    fileId = trimmedUrl;
  }
  // If it's already a thumbnail URL, return as-is
  else if (trimmedUrl.includes("drive.google.com/thumbnail")) {
    return trimmedUrl;
  }
  // If it's a valid non-Google Drive URL, return as-is
  else if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl;
  }

  // Convert to thumbnail format if we have a file ID
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  // Invalid URL, return placeholder
  return PLACEHOLDER_IMAGE;
}

/**
 * Converts a single image URL or array of URLs to normalized format
 * @param imageUrl - Single URL string or array of URLs
 * @returns Array of normalized image URLs (always returns at least one placeholder)
 */
export function normalizeImageUrls(
  imageUrl: string | string[] | null | undefined
): string[] {
  if (!imageUrl) {
    return [PLACEHOLDER_IMAGE];
  }

  if (Array.isArray(imageUrl)) {
    const normalized = imageUrl
      .map((url) => normalizeImageUrl(url))
      .filter((url) => url !== PLACEHOLDER_IMAGE);

    return normalized.length > 0 ? normalized : [PLACEHOLDER_IMAGE];
  }

  const normalized = normalizeImageUrl(imageUrl);
  return normalized !== PLACEHOLDER_IMAGE ? [normalized] : [PLACEHOLDER_IMAGE];
}

/**
 * Gets the first image URL from a product's image_urls array
 * @param imageUrl - The image URL string
 * @returns Normalized image URL or placeholder
 */
export function getProductImageUrl(
  imageUrl: string | null | undefined
): string {
  return normalizeImageUrl(imageUrl);
}

/**
 * Handles image load errors by setting fallback to placeholder
 * @param event - The error event from img onError
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>
): void {
  const target = event.target as HTMLImageElement;
  if (target.src !== PLACEHOLDER_IMAGE) {
    target.src = PLACEHOLDER_IMAGE;
  }
}

