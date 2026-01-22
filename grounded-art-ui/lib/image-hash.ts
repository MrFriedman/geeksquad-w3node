/**
 * Image hashing and encryption utilities for geofence-unlocked content
 */

/**
 * Hash an image file using Web Crypto API
 * @param file Image file to hash
 * @returns SHA-256 hash as hex string
 */
export async function hashImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Hash an image from a URL
 * @param imageUrl URL of the image
 * @returns SHA-256 hash as hex string
 */
export async function hashImageFromUrl(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const file = new File([blob], "image", { type: blob.type });
  return hashImage(file);
}

/**
 * Encrypt image data using AES-GCM
 * @param imageData Image data as ArrayBuffer
 * @param key Encryption key (must be 256 bits)
 * @returns Encrypted data and IV
 */
export async function encryptImage(
  imageData: ArrayBuffer,
  key: CryptoKey
): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for GCM
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    imageData
  );

  return { encrypted, iv };
}

/**
 * Decrypt image data using AES-GCM
 * @param encryptedData Encrypted image data
 * @param key Decryption key
 * @param iv Initialization vector
 * @returns Decrypted image data
 */
export async function decryptImage(
  encryptedData: ArrayBuffer,
  key: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedData
  );
}

/**
 * Generate encryption key from geofence verification
 * This key would typically be derived from on-chain data after geofence verification
 * @param artworkId Artwork token ID
 * @param userAddress User's wallet address
 * @param geofenceProof Proof of geofence verification (could be a signature or hash)
 * @returns CryptoKey for encryption/decryption
 */
export async function deriveGeofenceKey(
  artworkId: string,
  userAddress: string,
  geofenceProof: string
): Promise<CryptoKey> {
  // Combine inputs to create a unique key material
  const keyMaterial = `${artworkId}-${userAddress}-${geofenceProof}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyMaterial);

  // Hash the key material to get 256 bits
  const hashBuffer = await crypto.subtle.digest("SHA-256", keyData);

  // Import as AES-GCM key
  return crypto.subtle.importKey(
    "raw",
    hashBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Unlock high-resolution image after geofence verification
 * @param imageHash Hash of the encrypted image (stored on-chain)
 * @param artworkId Artwork token ID
 * @param userAddress User's wallet address
 * @param geofenceProof Proof that user is within geofence
 * @returns Decrypted image blob URL
 */
export async function unlockImage(
  imageHash: string,
  artworkId: string,
  userAddress: string,
  geofenceProof: string
): Promise<string> {
  // In a real implementation, you would:
  // 1. Fetch encrypted image from IPFS or storage using imageHash
  // 2. Derive decryption key from geofence proof
  // 3. Decrypt the image
  // 4. Return blob URL

  // For now, this is a placeholder that demonstrates the flow
  await deriveGeofenceKey(artworkId, userAddress, geofenceProof);
  
  // TODO: Fetch encrypted image from storage
  // const encryptedImage = await fetchEncryptedImage(imageHash);
  
  // TODO: Decrypt image
  // const decryptedData = await decryptImage(encryptedImage.data, key, encryptedImage.iv);
  
  // TODO: Create blob URL
  // const blob = new Blob([decryptedData], { type: 'image/jpeg' });
  // return URL.createObjectURL(blob);

  // Placeholder return
  return "";
}

/**
 * Verify geofence proof (would be called on-chain or via API)
 * @param artworkId Artwork token ID
 * @param userLat User's latitude
 * @param userLng User's longitude
 * @param signature Optional signature for verification
 * @returns Proof string if verified, null otherwise
 */
export async function verifyGeofence(
  artworkId: string,
  userLat: number,
  userLng: number,
  signature?: string
): Promise<string | null> {
  // In a real implementation, this would:
  // 1. Fetch artwork coordinates from contract
  // 2. Calculate distance
  // 3. If within range, generate/verify proof
  // 4. Store proof on-chain or return for immediate use

  // Placeholder: return a proof string
  const proof = `${artworkId}-${userLat}-${userLng}-${Date.now()}${
    signature ? "-sig" : ""
  }`;
  return proof;
}
