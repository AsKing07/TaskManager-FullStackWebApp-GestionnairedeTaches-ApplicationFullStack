const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Utilisez la clé secrète de vos variables d'environnement
const nodemailer = require('nodemailer');
const User = require('../models/user');

// Fonction d'inscription d'un nouvel utilisateur
exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction de connexion de l'utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${secret}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error: error.message, nom: "bof" }));
        })
        .catch(error => res.status(500).json({ error: error.message }));
};

// Fonction de réinitialisation de mot de passe
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        // Vérifiez si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        // Générez un jeton de réinitialisation de mot de passe (avec une durée de validité limitée)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Récupérez le nom de domaine à partir de la requête HTTP
        const domain = req.headers.host;
        // Configurez le service de messagerie (par exemple, Gmail) pour envoyer l'e-mail
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'askingtechnumeric@gmail.com', // Votre adresse e-mail
                pass: `${process.env.GMAIL_SECRET}`, // Votre mot de passe
            },
        });
        // Définissez les détails de l'e-mail
        const mailOptions = {
            from: 'Équipe de Gestion des Tâches',
            to: user.email,
            subject: 'Réinitialisation de votre mot de passe',
            html: `
                <p>Bonjour,</p>
                <p>Nous avons reçu une demande de réinitialisation de votre mot de passe pour votre compte TASK MANAGER BY ASKING. Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :</p>
                <p><a href="http://${domain}/resetpassword?token=${token}">Réinitialiser le mot de passe</a></p>
                <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet e-mail en toute sécurité.</p>
                <p>Ce lien est valable pour une heure.</p>
                <p>Merci,</p>
                <p>Équipe de Gestion des Tâches</p>
            `,
        };
        // Envoyez l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail de réinitialisation.' });
            } else {
                res.json({ message: 'Un e-mail de réinitialisation a été envoyé si l\'utilisateur existe. Vérifiez également vos spams!' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe.' });
    }
};

// Fonction de réinitialisation du mot de passe
exports.resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;
    try {
        // Vérifiez si le jeton est valide
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Utilisez l'ID d'utilisateur du jeton pour récupérer l'utilisateur
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        // Hash du nouveau mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        // Enregistrez l'utilisateur avec le nouveau mot de passe hashé
        await user.save();
        res.json({ message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe.' });
    }
};
