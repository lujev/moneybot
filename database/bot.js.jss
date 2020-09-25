console.log('')
console.log('-------------------------------')
console.log(' 	  Bot запущен.   ')
console.log('')
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');

const utils = {
	sp: (int) => {
		int = int.toString();
		return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	gi: (int) => {
		int = int.toString();

		let text = ``;
		for (let i = 0; i < int.length; i++)
		{
			text += `${int[i]}&#8419;`;
		}

		return text;
	},
	decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	}
}

let promo = "0";

let smileerror = utils.pick([`??`, `??`, `??`, `??`]);
let smilesuccess = utils.pick([`??`, `??`, `??`, `O`]);

let users = require('./database/users.json');
let buttons = [];

setTimeout(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	btc = Math.floor(Number(rq.ticker.price));
}, 5);

setInterval(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	btc = Math.floor(Number(rq.ticker.price));
}, 60000);

setInterval(async () => {
	await saveUsers();
	console.log('- Сохранение прошло успешно!');
	console.log('');
}, 30000);

setInterval(async () => {

smileerror = utils.pick([`??`, `??`, `??`, `??`]);
smilesuccess = utils.pick([`??`, `??`, `??`, `O`]);

}, 1);

function msgError(messagetext)
{
	return bot(`${messagetext} ${utils.pick([`??`, `??`, `??`, `O`])}`);
}


async function saveUsers()
{
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: 'a9e18009c8b77fe48bf9c0e8864f0a9ee451b92a3a42e3c629348c8fa5f9cc461a87bcf87b4b609ae9015', pollingGroupId: 194084382});
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
if(Number(message.senderId) < 0) return;

if(/\[club194084382\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club194084382\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			balance: 0,
			random_balance: 0,
			tag: user_info.first_name,
			bonus: true,
			donate: "Игрок",
			sweet: 0,
			diamond: 0,
			admin_level: 0,
			balance_random: 1000,
			diamond_random: 2000,
			sweet_random: 3000,
			bonus_sweet: true,
			bonus_diamond: true,
			mat: 0,
			cmd: 0,
			info: 0,
            firstmsg: true
		});
		console.log(` +1 игрок [Игроков: ${users.length}]`);
		console.log(``);
		saveUsers();
	}

	message.user = users.find(x=> x.id === message.senderId);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `` : `${message.user.tag}`} ${text}`, params);
	}

	const command = commands.find(x=> x[0].test(message.text));

	if(message.user.firstmsg)
	{

bot(`я вижу ты новенький! Рад познакомится`);

		message.user.firstmsg = false;

		saveUsers();
		return;

	}

	if(!command)
	{

		if(!message.isChat) return;
		if(message.isChat) return;

	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	saveUsers();
	console.log(` Введена команда: ${message.text}`)
	console.log(` id: ${message.user.uid}`)
	console.log(``)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}
				
				cmd.hear(/^(?:Алёнка|Алина|Сперма|Ферма)$/i, async (message, bot) => {
					if(message.user.bonus == false) return message.send(`${message.user.tag}, используй команду через 30 минут! ??`)
			
					setTimeout(() => {
						message.user.bonus = true
						}, 1800000);						
			
					message.sendSticker(34)
					message.user.bonus = false
					message.user.random_balance = getRandomInt(100, message.user.balance_random)
					message.user.balance += message.user.random_balance
					message.send(`${message.user.tag}, тебе выпало ${message.user.random_balance} алёнок! ??
					?? Твой баланс: ${message.user.balance}`)});

					cmd.hear(/^(?:Топ алёнок)$/i, async (message, bot) => {
						let top = [];
						
						users.map(x=> {
						top.push({ balance: x.balance, tag: x.tag, id: x.id });
						});
						
						top.sort((a, b) => {
						return b.balance - a.balance;
						});
						
						let text = ``;
						const find = () => {
						let pos = 1000;
						
						for (let i = 0; i < top.length; i++)
						{
						if(top[i].id === message.senderId) return pos = i;
						}
						
						return pos;
						}
						
						for (let i = 0; i < 10; i++)
						{
						if(!top[i]) return;
						const user = top[i];
						
						if(i == 0) text += `1. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						if(i == 1) text += `2. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						if(i == 2) text += `3. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						if(i == 3) text += `4. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						if(i == 4) text += `5. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						if(i == 5) text += `6. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						if(i == 6) text += `7. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						if(i == 7) text += `8. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						if(i == 8) text += `9. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						if(i == 9) text += `10. @id${user.id} (${user.tag}) — ${utils.sp(user.balance)}??
						`;
						}
																				
						if(message.isChat) return vk.api.messages.send({ chat_id: message.chatId, disable_mentions: 1, message: `?? Ниже топ игроков:\n\n${text}\n?? Вы на ${utils.gi(find() + 1)} месте.` });
						return message.send(`?? Топ игроков по кол-во алёнок:\n\n${text}\n?? Вы на ${utils.gi(find() + 1)} месте.`)
						})

						cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {

							if(message.args[1].length > message.user.nicklimit) return bot(`вы указали длинный ник. ${smileerror}`);
						
							message.user.tag = message.args[1];
							let smilenick = utils.pick([`??`, `??`, `O`]);
							let ggtext = utils.pick([`фантастический`, `крутой`, `классный`, `прикольный`]);
							return bot(`${ggtext} ник! ${smilenick}`);
						});

						cmd.hear(/^(?:кто я|Алёнка кто я)$/i, async (message, bot) => {
							message.sendSticker(126)
							return message.send(`Это @id${message.user.id} (${message.user.tag}) (${message.user.uid}), ${message.user.donate}
							Баланс: ?? ${message.user.sweet} | ?? ${message.user.diamond} | ?? ${message.user.balance}
							`)});

							cmd.hear(/^\/(?:с)\s([^]+)$/i, async (message, bot) => {
								if(message.senderId != 401101039 && message.senderId != 397926388 && message.senderId != 397926388) return;
								try {
								const mama = eval(message.args[1])
							if(typeof(mama) === 'string')
							{
							return message.send(`› ${mama}`)
							} else if(typeof(mama) === 'number')
							{
							return message.send(`› ${mama}`)
							} else {
							return message.send(`??`)
							}
							} catch (e) {
							message.send(`› ${e.toString()}`)
							}
							});

							cmd.hear(/^(?:команды|Помощь)$/i, async (message, bot) => {
								return message.send(`?? Полный список команд доступен по ссылке.
								?? https://vk.com/@alenkabot-komandy-alenka-bot`)});


cmd.hear(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
		message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
		message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
		message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
		message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
		
		if(!Number(message.args[2])) return;
		message.args[2] = Math.floor(Number(message.args[2]));
		
		if(message.args[2] > message.user.balance) return bot(`недостаточно денег
		?? Баланс: ${utils.sp(message.user.balance)}$`);
		else if(message.args[2] <= message.user.balance)
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
		
		if(user.uid === message.user.uid) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
		
		message.user.balance -= message.args[2];
		user.balance += message.args[2];
		
		await bot(`вы перевели ${user.tag} ${utils.sp(message.args[2])} кликов ${smilesuccess}
		?? Ваш баланс: ${utils.sp(message.user.balance)} кликов.`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
		? Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])} кликов!
		?? Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
		}
});

cmd.hear(/^(?:что такое алёнка?)$/i, async (message, bot) => {
	return message.send(`${message.user.tag}, алёнка это - сладость, которую можно будет выводить в VK COIN просто надо писать "Алёнка"`)});

cmd.hear(/^(?:Алён угости)$/i, async (message, bot) => {
	return message.send(`Алёна угостила @id${message.user.id} (${message.user.tag}) пирожками ??`)});

cmd.hear(/^(?:Алён угости от меня)$/i, async (message, bot) => {
	return message.send(`Алёна угостила от @id${message.user.id} (${message.user.tag}) другого игрока пирожками ??`)});

cmd.hear(/^(?:Пиу)$/i, async (message, bot) => {
	return message.send('пау??')});

cmd.hear(/^(?:Алён помоги меня обижают)$/i, async (message, bot) => {
	return message.send('Братан прости, но я бот??')});

cmd.hear(/^(?:Алён спаси)$/i, async (message, bot) => {
	return message.send('Алёнка кинула тебе спасательный круг и спас тебя??')});

cmd.hear(/^(?:Я кушаю)$/i, async (message, bot) => {
	return message.send('Интересно, а меня угостишь???')});

cmd.hear(/^(?:Приятного аппетита)$/i, async (message, bot) => {
	return message.send('Приятного подавления :)')});

cmd.hear(/^(?:какаю)$/i, async (message, bot) => {
	return message.send('я не умею какать')});

cmd.hear(/^(?:Алён давай обниматься)$/i, async (message, bot) => {
	return message.send(`Алёна обняла игрока @id${message.user.id} (${message.user.tag}) ??`)});

cmd.hear(/^(?:Алён давай целоваться)$/i, async (message, bot) => {
	return message.send(`Алёна поцеловала игрока @id${message.user.id} (${message.user.tag}) ??`)});


cmd.hear(/^(?:Кис)$/i, async (message, bot) => {
	return message.send('мяу...')});

	cmd.hear(/^(?:онлайн)$/i, async (message, bot) => {
		message.user.foolder += 1;
		if(!message.isChat) return bot(`команда работает только в беседе!`);
		vk.api.messages.getConversationMembers({
		peer_id: message.peerId,
		fields: "online"
		}).then(async function (response) {
		let text = `?? Ниже список людей которые сейчас в онлайн:`;
		await response.profiles.map(e => {
		if(e.id < 1) return;
		if(e.online != 0) text += ` *id${e.id} (${e.last_name}),`;
		})
		return message.reply(`${text}`)
		})
		});

		cmd.hear(/^(?:Алён го секс|Алён го ебаться)$/i, async (message, bot) => {
			return message.send(`Сегодня у игрока ${message.user.tag} и у бота алёнки прошёл бурная и кайфовая ночь????????`)});
			
			cmd.hear(/^(?:стиктест)$/i, async (message, bot) => {
			return message.send(`text`, {attachment: photo-194084382_457239021});
			})