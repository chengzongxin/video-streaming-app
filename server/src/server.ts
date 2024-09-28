import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());

const VIDEOS_DIR = 'E:\\Movie';

interface FileInfo {
  name: string;
  isDirectory: boolean;
  path: string;
}

function getFilesRecursively(dir: string): FileInfo[] {
  const files = fs.readdirSync(dir);
  let result: FileInfo[] = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const isDirectory = stat.isDirectory();
    const relativePath = path.relative(VIDEOS_DIR, filePath);

    if (isDirectory) {
      result.push({ name: file, isDirectory: true, path: relativePath });
      result = result.concat(getFilesRecursively(filePath));
    } else if (['.mp4', '.avi', '.mkv'].includes(path.extname(file).toLowerCase())) {
      result.push({ name: file, isDirectory: false, path: relativePath });
    }
  });

  return result;
}

app.get('/api/videos', (req: Request, res: Response) => {
  try {
    const files = getFilesRecursively(VIDEOS_DIR);
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Unable to scan directory' });
  }
});

app.get('/api/video/:filename(*)', (req: Request, res: Response) => {
  const filePath = path.join(VIDEOS_DIR, req.params.filename);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
    const chunksize = (end-start)+1;
    const file = fs.createReadStream(filePath, {start, end});
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

app.get('/api/download/:filename(*)', (req: Request, res: Response) => {
  const filePath = path.join(VIDEOS_DIR, req.params.filename);
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});