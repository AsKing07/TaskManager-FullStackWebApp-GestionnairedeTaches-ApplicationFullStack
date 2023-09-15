// Importation du module jsonwebtoken
const jwt = require('jsonwebtoken');

// Récupération de la clé secrète depuis les variables d'environnement
const secret = process.env.JWT_SECRET; 


module.exports = (req, res, next) => {
  try {
    // Récupération du token d'authentification depuis l'en-tête de la requête
    const token = req.headers.authorization.split(' ')[1];

    // Vérification du token en utilisant la clé secrète
    const decodedToken = jwt.verify(token, `${secret}`); // Utilisation de la clé secrète de vos variables d'environnement

    // Extraction de l'ID utilisateur à partir du token décodé
    const userId = decodedToken.userId;

    // Stockage de l'ID utilisateur dans la propriété req.auth.userId
    req.auth = {
      userId: userId
    };

    // Appel de la fonction next pour passer au middleware suivant
    next();
  } 
  
  catch (error) 
  {
    res.status(401).json({ error: error.message });

    console.log(error.message);
  }
};