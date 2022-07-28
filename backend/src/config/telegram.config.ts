import { Telegram } from 'src/telegram/telegram.interface';

const subscribers = ['xxxxxxxxx', 'xxxxxxx', 'xxxxxxx'];

export const getTelegramConfig = (): Telegram => ({
	chatId: subscribers.toString(),
	token: 'xxxxxxxxxxxxxxxxxxxxxx',
});
