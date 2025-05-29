import { FileInfo } from "./types";

/**
 * Helper function to get MIME type from a filename
 * @param filename The filename to determine MIME type for
 * @returns The MIME type as a string
 */
export function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "txt":
      return "text/plain";
    case "doc":
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "ppt":
    case "pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    case "xls":
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "csv":
      return "text/csv";
    case "md":
      return "text/markdown";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

export const uploadFile = async (file: File): Promise<FileInfo> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return {
      file,
      gsUri: data.gsUri,
      status: "uploaded",
      id: file.name,
    };
  } catch (err) {
    return {
      file,
      status: "error",
      error: "Failed to upload file",
      id: file.name,
    };
  }
};
