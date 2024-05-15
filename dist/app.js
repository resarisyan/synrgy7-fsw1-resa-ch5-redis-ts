import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import router from './routes/index.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 6000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join('src/views'));
app.use(express.static('public'));
app.use(router);
app
    .listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})
    .on('error', (err) => {
    console.error(err);
});
//# sourceMappingURL=app.js.map