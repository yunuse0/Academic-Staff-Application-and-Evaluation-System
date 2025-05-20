import express from "express";
import router from "./routes/index";
import cors from "cors";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
};

app.use(cors(corsOptions)); 

app.options('/api', cors(corsOptions));

app.use("/api", router);
app.use(cors);
const PORT = 3001;

app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`);
});
