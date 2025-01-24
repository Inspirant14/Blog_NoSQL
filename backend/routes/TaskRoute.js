const { Router } = require("express");
const { getTasks, deleteTask, updateTask, saveTask, getTaskById } = require("../controllers/TaskControllers");
const router = Router();


router.get("/get", getTasks); // Récupérer avec pagination et recherche
// router.get("/get/:id", getTaskById); // Nouvelle route
router.post("/save", saveTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);









const express = require('express');
const routers = express.Router();
const authController = require('../controllers/authController');

// Route pour la connexion
router.post('/login', TaskController.login);

module.exports = router;








module.exports = router;
