const TaskModel = require("../models/TaskModel");


// Obtenir toutes les tâches avec pagination et recherche
module.exports.getTasks = async (req, res) => {
  const { page = 1, limit = 3, search = "" } = req.query;

  try {
    // Construire la requête de recherche
    const query = {
      title: { $regex: search, $options: "i" }, // Recherche insensible à la casse
    };

    // Total des tâches correspondant à la recherche
    const totalTasks = await TaskModel.countDocuments(query);

    // Récupérer les tâches avec pagination
    const tasks = await TaskModel.find(query)
      .limit(limit * 1) // Limite par page
      .skip((page - 1) * limit) // Ignorer les tâches des pages précédentes
      .exec();

    res.status(200).json({
      tasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};



// Ajouter une nouvelle tâche
module.exports.saveTask = (req, res) => {
  const { title, content } = req.body;

  TaskModel.create({ title, content })
    .then((data) => {
      console.log("Saved successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

// Mettre à jour une tâche existante
module.exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  TaskModel.findByIdAndUpdate(id, { title, content }, { new: true }) // Retourne la tâche mise à jour
    .then((data) => {
      res.send("Updated successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

// Supprimer une tâche
module.exports.deleteTask = (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Deleted successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

// // Obtenir un article spécifique
// module.exports.getTaskById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const task = await TaskModel.findById(id);
//       if (!task) {
//         return res.status(404).send({ msg: "Article introuvable" });
//       }
//       res.send(task);
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ error: err, msg: "Une erreur s'est produite" });
//     }
//   };







const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Modèle d'utilisateur

// Fonction de connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Trouver l'utilisateur par son email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

        // Réponse avec le token
        res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur interne' });
    }
};

  
