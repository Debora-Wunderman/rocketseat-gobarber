import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
    async index(req, res) {
        /**
         * Checando se o usuário logado é um prestador de serviço
         */
        const checkIsProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkIsProvider) {
            return res
                .status(401)
                .json({ error: 'Only provider can load notifications ' });
        }

        /**
         * Chaining (concatenação de métodos)
         */
        const notifications = await Notification.find({
            user: req.userId,
        })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return res.json(notifications);
    }

    async update(req, res) {
        // const notification = await Notification.findById(req.params.id);
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true } // retorna o registro atualizado para listagem
        );

        return res.json(notification);
    }
}

export default new NotificationController();
