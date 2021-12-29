import { applyRouters } from '@/framework/api/express';

import './post/PostApi';

// for test
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
applyRouters(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
