import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export function cacheMiddleware(req: Request, res: Response, next: NextFunction): void {
  const originalSend = res.send;

  res.send = function (body): Response {
    if (body !== undefined) {
      const etag = crypto.createHash('md5').update(JSON.stringify(body)).digest('hex');

      res.setHeader('ETag', `"${etag}"`);
      res.setHeader('Last-Modified', new Date().toUTCString());
      res.setHeader('Cache-Control', 'public, max-age=60');

      const ifNoneMatch = req.headers['if-none-match'];
      if (ifNoneMatch === `"${etag}"`) {
        res.status(304).send();
        return res;
      }

      const ifModifiedSince = req.headers['if-modified-since'];
      if (ifModifiedSince && new Date(ifModifiedSince) >= new Date()) {
        res.status(304).send();
        return res;
      }
    } else {
      console.warn('⚠️ res.send recebeu body undefined no cacheMiddleware');
    }

    return originalSend.call(this, body);
  };

  next();
}
