const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const app = express();

//连接数据库
connectDB();

//跨域
app.use(cors());

//路由前解析json
app.use(express.json());

//路由
app.use('/api/auth', authRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})