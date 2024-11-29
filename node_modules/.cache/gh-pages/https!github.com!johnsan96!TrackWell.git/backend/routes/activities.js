import express from 'express'
import { getAllActivities, createActivity } from '../controllers/activitiesController.js';

const router = express.Router();

router.route("/activities")
.get(getAllActivities)
.post(createActivity)

export {router};