import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12  // GCM standard
const TAG_LENGTH = 16
const KEY_LENGTH = 32 // 256-bit

function getEncryptionKey(): Buffer {
  const hexKey = process.env.DOCUMENTS_ENCRYPTION_KEY
  if (!hexKey || hexKey.length !== 64) {
    throw new Error('DOCUMENTS_ENCRYPTION_KEY must be 64 hex chars (32 bytes). Generate: openssl rand -hex 32')
  }
  return Buffer.from(hexKey, 'hex')
}

function getDocumentsRoot(): string {
  return process.env.DOCUMENTS_PATH ?? path.join(process.cwd(), 'private-documents')
}

/**
 * Encrypted file format on disk:
 * [12 bytes IV][16 bytes auth tag][N bytes ciphertext]
 */
export function encryptBuffer(plaintext: Buffer): Buffer {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH })

  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()])
  const tag = cipher.getAuthTag()

  return Buffer.concat([iv, tag, encrypted])
}

export function decryptBuffer(ciphertext: Buffer): Buffer {
  const key = getEncryptionKey()
  const iv = ciphertext.subarray(0, IV_LENGTH)
  const tag = ciphertext.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH)
  const data = ciphertext.subarray(IV_LENGTH + TAG_LENGTH)

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH })
  decipher.setAuthTag(tag)

  return Buffer.concat([decipher.update(data), decipher.final()])
}

/**
 * Encrypts a file and saves it to the private-documents folder.
 * Returns the relative path stored in the Document.filePath column.
 */
export async function encryptAndSaveFile(
  fileBuffer: Buffer,
  patientId: string,
  originalFilename: string
): Promise<{ filePath: string; fileSize: number }> {
  const root = getDocumentsRoot()
  const patientDir = path.join(root, patientId)
  fs.mkdirSync(patientDir, { recursive: true })

  const encrypted = encryptBuffer(fileBuffer)
  const safeFilename = `${Date.now()}_${originalFilename.replace(/[^a-zA-Z0-9._-]/g, '_')}.enc`
  const absPath = path.join(patientDir, safeFilename)

  fs.writeFileSync(absPath, encrypted)

  return {
    filePath: path.join(patientId, safeFilename),
    fileSize: fileBuffer.length,
  }
}

/**
 * Reads and decrypts a stored document.
 * filePath is relative to DOCUMENTS_PATH.
 */
export function readAndDecryptFile(filePath: string): Buffer {
  const root = getDocumentsRoot()
  const absPath = path.join(root, filePath)

  // Prevent path traversal
  if (!absPath.startsWith(path.resolve(root))) {
    throw new Error('Path traversal detected')
  }

  const encrypted = fs.readFileSync(absPath)
  return decryptBuffer(encrypted)
}

/**
 * Deletes an encrypted file from storage.
 * Used by GDPR right-to-erasure flow.
 */
export function deleteDocumentFile(filePath: string): void {
  const root = getDocumentsRoot()
  const absPath = path.join(root, filePath)

  if (!absPath.startsWith(path.resolve(root))) {
    throw new Error('Path traversal detected')
  }

  if (fs.existsSync(absPath)) {
    fs.unlinkSync(absPath)
  }
}

/**
 * Deletes all documents for a patient (GDPR erasure).
 */
export function deletePatientDocumentDirectory(patientId: string): void {
  const root = getDocumentsRoot()
  const patientDir = path.join(root, patientId)

  if (!patientDir.startsWith(path.resolve(root))) {
    throw new Error('Path traversal detected')
  }

  if (fs.existsSync(patientDir)) {
    fs.rmSync(patientDir, { recursive: true, force: true })
  }
}
