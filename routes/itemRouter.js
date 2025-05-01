import express from  'express';
import { getAllItem } from '../controller/itemController.js';

const itemRouter =express.Router();

itemRouter.get('/',getAllItem)


export default itemRouter