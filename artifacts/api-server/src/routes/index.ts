import { Router, type IRouter } from "express";
import healthRouter from "./health";
import docsRouter from "./docs";
import loginRouter from "./login";
import assetManagementRouter from "./assetManagement";

const router: IRouter = Router();

router.use(loginRouter);
router.use(docsRouter);
router.use(healthRouter);
router.use(assetManagementRouter);

export default router;
