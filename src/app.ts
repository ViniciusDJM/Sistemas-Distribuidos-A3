import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { errorMiddleware } from './middlewares/error';
import { userRouter } from './routes/user.routes';
import { productRouter } from './routes/product.routes';
import swaggerDocument from '../docs/swagger.json';

// Register dependencies
import './container';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/products', productRouter);

app.get('/scripts/cache-buster.js', (req, res) => {
  if (req.headers.accept === 'application/javascript') {
    res.type('application/javascript');
    res.send(`
      // Simple cache busting script
      function bustCache(url) {
        const timestamp = new Date().getTime();
        const separator = url.includes('?') ? '&' : '?';
        return \`\${url}\${separator}_=\${timestamp}\`;
      }
    `);
  } else {
    res.status(406).json({
      error: 'Not Acceptable',
      message: 'This endpoint only serves JavaScript content',
    });
  }
});

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use(errorMiddleware);

export { app };
