console.log('Бот успешно запущен!')
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
		bank: (int) => {
	int = int.toString();
	return int.split('').reverse().join('').match(/[0-9]{1,4}/g).join(' ').split('').reverse().join('');
	},
	rn: (int, fixed) => {
	if (int === null) return null;
	if (int === 0) return '0';
	fixed = (!fixed || fixed < 0) ? 0 : fixed;
	let b = (int).toPrecision(2).split('e'),
	k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
	c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
	d = c < 0 ? c : Math.abs(c),
	e = d + ['', ' тыс.', ' млн.', ' млрд.', ' трлн.', ' трлд.'][k];
	
	e = e.replace(/e/g, '');
	e = e.replace(/\+/g, '');
	e = e.replace(/Infinity/g, ' много.');
	
	return e;
	},
	gi: (int) => {
	int = int.toString();
	
	let text = ``;
	for (let i = 0; i < int.length; i++)
	{
	text += `${int[i]}⃣`;
	}
	
	return text;
	},
	decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
	random: (x, y) => {
	return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
	return array[utils.random(array.length - 1)];
	},
	time: () => {
	return parseInt(new Date().getTime()/1000)
	}
	}

let promo = "0";

let smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);
let shar = utils.pick([`возможно`, `наверно`, `правда`, `нет`,`не думают`, `вообще нет`, `не согласны`]);

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
}, 36000000);

setInterval(async () => {

smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

}, 1);

setInterval(async () => {

	cartop = utils.pick([`Велосипед`, `Копейка`, `Москвич`, `Четырка`, `Девятка`, `Пятнашка`, `Lada Kalina`, `Lada Priora`, `Ford Mustang`, `Lamborgini Huracan`, `Tesla Cybertruck`, `Запорожец`, `Запорожец`]);
	
	}, 1);

	setInterval(async () => {

		shar = utils.pick([`возможно`, `наверно`, `правда`, `нет`,`не думают`, `вообще нет`, `не согласны`]);
		
		}, 1);

setInterval(async () => {

		win = utils.pick([`Победа`, `Проигрыш`]);
		
		}, 1);

function msgError(messagetext)
{
	return bot(`${messagetext} ${utils.pick([`😯`, `🙂`, `🤑`, `☺`])}`);
}


async function saveUsers()
{
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: 'daf52e450d349836cc64e12999512ea48a650686c885b293bd7b6c46211ddfc40e664d8924161c8bfb2fa', pollingGroupId: 194587085});
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
if(Number(message.senderId) < 0) return;

if(/\[club194686646\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club194686646\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			money: 0.0000,
			level: 1,
			exp: 0,
			next_exp: 10,
			donate: `Обычный пользователь`,
			bonus: false,
			ban: false,
			tag: user_info.first_name,
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

	if(message.user.ban === true) return message.send(`${message.user.tag}, ваш аккаунт был заблокирован! ⛔
		Если вас забанили без причины напишите ему @andrian.egorov`);

	const command = commands.find(x=> x[0].test(message.text));

	if(message.user.firstmsg)
	{

	let server = 0
	server = message.user.uid 
		
message.send(`${message.user.tag}, добро пожаловать в бота «𝐌𝐨𝐧𝐞𝐲 𝐁𝐨𝐭», твоя цель заработать денег, и вывести на платформу 𝐐𝐢𝐰𝐢, 𝐖𝐞𝐛𝐦𝐨𝐧𝐞𝐲. Чтобы узнать команды напиши «Помощь», и тебе выведутся команды 🙏🏻 Создатель данного бота — @id614187211 (Влад Бумага) ☹ если появились вопросы писать ему :-)`);
message.send({sticker_id:21148})
message.send(`${message.user.tag}, и да не забывай подписываться, мы стараемся над этим проектом и вкладываем деньги, а с вас нужна только ваша активность 😁`)
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

var kkkk = 74200

const mcpetrade = {
	"shop": 134335,
	"server": 19001,
}

cmd.hear(/^(?:Помощь)$/i, async (message, bot) => {
	message.send(`${message.user.tag}, команды которые можно использовать:
⠀👻 Баланс -- показывает ваш баланс.
⠀👨‍🔧 Профиль -- полная информация вашего аккаунта.
⠀🆕 Статус -- показывает ваш статус.
⠀🌵 Вывести -- выводит ваш вирты на платформу.
⠀🌥 Курс -- показывает курс вирта.
⠀🌴 Бонус -- выдаёт вам бесплатно вирты.
⠀🍂 Клик -- получить 0.0001 вирт.
`)});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	message.send(`${message.user.tag}, твой баланс ${message.user.money} 🔖`)
	message.send({sticker_id:2905})
	});

cmd.hear(/^(?:профиль)$/i, async (message, bot) => {
	message.send(`${message.user.money} 🔖 | ${message.user.tag} 👨‍🔧 (${message.user.uid}) | ${message.user.donate} 🦠`)
	message.send({sticker_id:4570})
	});

cmd.hear(/^(?:статус)$/i, async (message, bot) => {
	message.send(`${message.user.tag}, ваш статус на данный момент «${message.user.donate}»`)});

cmd.hear(/^(?:вывести)$/i, async (message, bot) => {
	if(message.user.money < 300) return message.send(`${message.user.tag}, минимальный вывод с нашего бота 300 виртов.`)

	message.send(`${message.user.tag}, введи терминал на который вы хотите вывести.
	У нас пока доступны эти терминалы: Qiwi, Webmoney`)});

cmd.hear(/^(?:Qiwi)$/i, async (message, bot) => {
	if(message.user.money < 300) return message.send(`${message.user.tag}, минимальный вывод с нашего бота 300 виртов.`)

	message.send(`${message.user.tag}, введите эту команду «Qiwi [ваш номер]».`)});

cmd.hear(/^(?:Webmoney)$/i, async (message, bot) => {
	if(message.user.money < 300) return message.send(`${message.user.tag}, минимальный вывод с нашего бота 300 виртов.`)

	message.send(`${message.user.tag}, введите эту команду «Webmoney [ваш номер]».`)});

cmd.hear(/^(?:Qiwi) (.*)$/i, async (message, bot) => {
	if(message.user.money < 300) return message.send(`${message.user.tag}, минимальный вывод с нашего бота 300 виртов.`)

	message.send(`${message.user.tag}, бот начал перекидывать на терминал «Qiwi» весь ваш баланс на номер +${message.args[1]} перевод может занять от нескольких минут до нескольких дней из-за нагрузки на бота!`)
	message.user.money = 0});

cmd.hear(/^(?:Webmoney) (.*)$/i, async (message, bot) => {
	if(message.user.money < 300) return message.send(`${message.user.tag}, минимальный вывод с нашего бота 300 виртов.`)

	message.send(`${message.user.tag}, бот начал перекидывать на терминал «Webmoney» весь ваш баланс на номер +${message.args[1]} перевод может занять от нескольких минут до нескольких дней из-за нагрузки на бота!`)
	message.user.money = 0});

cmd.hear(/^(?:Курс)$/i, async (message, bot) => {
message.send(`${message.user.tag}, курс на данный момент:
1 🔖 = 1 рубль.`)});

cmd.hear(/^(?:бонус|🔑 Бонус|@destinybot 🔑 Бонус)$/i, async (message, bot) => {
	let prize = utils.pick([1]);
	let randomchick = utils.pick([0])

	if(message.user.bonus) return bot(`бонус можно получить раз в 24 часа ${smileerror}`);

	setTimeout(() => {
		message.user.bonus = false;
	}, 1440000);

	message.user.bonus = true;


	if(prize === 1)
	{
		randomchick = getRandomInt(3, 50)
		message.user.money += randomchick
		return message.send(`${message.user.tag}, вы выбили из бонуса ${randomchick} виртов!`);
	}
});

cmd.hear(/^(?:клик)$/i, async (message, bot) => {
	let click = utils.pick([0.0001])
	message.user.money += click
	message.send(`${message.user.tag}, клик успешно начислен! 😊
Ваш баланс -- ${message.user.money}`)});

cmd.hear(/^(?:adpan)$/i, async (message, bot) => {
message.send(`
Андрей, открыта панель «Административная панель» 
⠀😫 ban [ID] 
⠀😊 unban [ID] [Money]
⠀😬 unget [ID] [Money]  
⠀🤑 get [ID] 
⠀📃 msg [ID] [msg]
⠀👨‍🔧 profile [ID]`)});

cmd.hear(/^(?:ban)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.donate !== `Администратор`) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = true; 

saveUsers();
message.send(`Player @id${user.id} (${user.tag}) banned.`); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был заблокирован. ⛔` }); 
}
});

cmd.hear(/^(?:unban)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.donate !== `Администратор`) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = false; 

saveUsers();
await bot(`Player @id${user.id} (${user.tag}) unbanned.`); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был разблокирован.` }); 
}
});

cmd.hear(/^(?:get)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.donate !== `Администратор`) return; 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 
{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.money += message.args[2]; 


message.send(`Вы выдали @id${user.id} (${user.tag}) ${message.args[2]} виртов.`); 
vk.api.messages.send({ user_id: user.id, message: `Вам было выдано от администратора ${message.args[2]} виртов.` }); 
} 
});
cmd.hear(/^(?:unget)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.donate !== `Администратор`) return; 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 
{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.money -= message.args[2]; 

message.send(`Вы очистили @id${user.id} (${user.tag}) ${message.args[2]} виртов.`); 
vk.api.messages.send({ user_id: user.id, message: `Вам было очищено от администратора ${message.args[2]} виртов.` }); 
} 
});

cmd.hear(/^(?:msg)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
	if(message.user.donate !== `Администратор`) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 

message.send(`Вы отправили игроку @id${user.id} (${user.tag}) сообщение.
	✉ ${message.args[2]}`)
vk.api.messages.send({ user_id: user.id, message: `Вам пришло от администратора письмо
	✉ ${message.args[2]}
	Отправитель: @id${message.user.id} (${message.user.tag})` }); 
};
});