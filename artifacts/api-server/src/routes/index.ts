import { Router, type IRouter } from "express";
// import healthRouter from "./health.js";
import docsRouter from "./docs.js";
import loginRouter from "./login.js";
import assetManagementRouter from "./assetManagement.js";

const router: IRouter = Router();

router.use(loginRouter);
router.use(docsRouter);
// router.use(healthRouter);
router.use(assetManagementRouter);

export default router;
