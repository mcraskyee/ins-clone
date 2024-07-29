const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const connectDB = require('./config/db');
const app = express();

//连接数据库
connectDB();

//跨域
app.use(cors());

//路由前解析json
app.use(express.json());

//文件上传
app.use(fileUpload());

//路由
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})