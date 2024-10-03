import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
    return res.status(200).send({ message: "Haleluia!"})
});

export default routes;