import { NextResponse } from 'next/server';
import { bucket } from '@/hooks/google';
import { getMimeType } from '@/hooks/utils';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Upload file to Google Cloud Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const blob = bucket.file(file.name);
    
    // Fix for AbortSignal issue in production build
    const saveOptions = {
      metadata: {
        contentType: getMimeType(file.name)
      },
      // Explicitly set resumable to false to avoid AbortSignal issues in production
      resumable: false
    };
    
    await blob.save(buffer, saveOptions);

    // Return the GCS URI and other file info
    return NextResponse.json({
      name: file.name,
      gsUri: `gs://${bucket.name}/${file.name}`,
      mimeType: getMimeType(file.name)
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
