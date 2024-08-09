
import express from "express";
import balanceRoute from "./parking.route"
const router = express.Router();

const defaultRoutes = [
    {
        path: "/parking-aid",
        route: balanceRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
