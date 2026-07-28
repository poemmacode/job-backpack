-- Create attachments bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', false);

-- Policy: Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'attachments');

-- Policy: Allow users to read their own files
CREATE POLICY "Allow users to read own files" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'attachments');

-- Policy: Allow users to delete their own files
CREATE POLICY "Allow users to delete own files" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'attachments');
