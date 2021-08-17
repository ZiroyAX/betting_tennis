const Nightmare = require('nightmare');		
const url = 'http://localhost:3500/flash';
const selector = '.a';
const mainResult = {};

async function mainParsing(url) {
	mainResult.url = url;
	console.log(url);
	let nightmare; 
	try {
		nightmare = Nightmare({
			electronPath: require('./node_modules/nightmare/node_modules/electron'),  //Для одновременного запуска основного electron'a с nightmare
			show: true, 
		});

		// nightmare.on('new-window', (event, link, rus, ris, ros, qw1, qw2, qw3, qw4, qw5) => {
		// 	console.log('on');
		// 	console.log(event);
		// 	console.log(link);
		// 	console.log(rus);
		// 	console.log(ris);
		// 	console.log(ros);
		// 	console.log(qw1);
		// 	console.log(qw2);
		// 	console.log(qw3);
		// 	console.log(qw4);
		// 	console.log(qw5);
		// 	console.log('endOn');
		// })

		nightmare.goto(url);

		nightmare.wait('.wrapper___38qYb6N');

		const mainInfo = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.wrapper___38qYb6N')

		mainResult.mainInfo = mainInfo;

		nightmare.wait('.country___24Qe-aj');

		const tournament = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.country___24Qe-aj')

		mainResult.tournament = tournament;

		nightmare.wait('.tabs__group a:nth-child(3)');
		nightmare.click('.tabs__group a:nth-child(3)');

		////////////////////////////////////////////////Грунт

		nightmare.wait('#detail .subTabs a:nth-child(2)');
		nightmare.click('#detail .subTabs a:nth-child(2)');
		nightmare.wait(5000);
		
		// nightmare.wait('.showMore___1Rjljki');
		// nightmare.wait('.rows___3StvpTT');

		while(await nightmare.exists('.showMore___1Rjljki')) {
			nightmare.click('.showMore___1Rjljki');
			nightmare.wait(500);
		}
				// .click('.tabs__group div:nth-child(5)')

		const playerOneGround = await nightmare.evaluate((selector, done) => {
					done(null, document.querySelector(selector).innerText)
				}, '.h2h___1pnzCTL .section___1a1N7yN:nth-child(1) .rows___3StvpTT')

		mainResult.playerOneGround = playerOneGround;

		const playerTwoGround = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.h2h___1pnzCTL .section___1a1N7yN:nth-child(2) .rows___3StvpTT')

		mainResult.playerTwoGround = playerTwoGround;

		const playerJointGround = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.h2h___1pnzCTL .section___1a1N7yN:nth-child(3) .rows___3StvpTT')

		mainResult.playerJointGround = playerJointGround;

		////////////////////////////////////////////////Трава

		nightmare.wait('#detail .subTabs a:nth-child(3)');
		nightmare.click('#detail .subTabs a:nth-child(3)');
		nightmare.wait(5000);
		
		// nightmare.wait('.showMore___1Rjljki');
		// nightmare.wait('.rows___3StvpTT');

		while(await nightmare.exists('.showMore___1Rjljki')) {
			nightmare.click('.showMore___1Rjljki');
			nightmare.wait(1000);
		}

		const playerOneGrass = await nightmare.evaluate((selector, done) => {
					done(null, document.querySelector(selector).innerText)
				}, '.h2h___1pnzCTL .section___1a1N7yN:nth-child(1) .rows___3StvpTT')

		mainResult.playerOneGrass = playerOneGrass;

		const playerTwoGrass = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.h2h___1pnzCTL .section___1a1N7yN:nth-child(2) .rows___3StvpTT')

		mainResult.playerTwoGrass = playerTwoGrass;

		const playerJointGrass = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.h2h___1pnzCTL .section___1a1N7yN:nth-child(3) .rows___3StvpTT')

		mainResult.playerJointGrass = playerJointGrass;

		////////////////////////////////////////////////Хард

		nightmare.wait('#detail .subTabs a:nth-child(4)');
		nightmare.click('#detail .subTabs a:nth-child(4)');
		nightmare.wait(5000);
		
		// nightmare.wait('.showMore___1Rjljki');
		// nightmare.wait('.rows___3StvpTT');

		while(await nightmare.exists('.showMore___1Rjljki')) {
			nightmare.click('.showMore___1Rjljki');
			nightmare.wait(800);
		}

		const playerOneHard = await nightmare.evaluate((selector, done) => {
					done(null, document.querySelector(selector).innerText)
				}, '.h2h___1pnzCTL .section___1a1N7yN:nth-child(1) .rows___3StvpTT')

		mainResult.playerOneHard = playerOneHard;

		const playerTwoHard = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.h2h___1pnzCTL .section___1a1N7yN:nth-child(2) .rows___3StvpTT')

		mainResult.playerTwoHard = playerTwoHard;

		const playerJointHard = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.h2h___1pnzCTL .section___1a1N7yN:nth-child(3) .rows___3StvpTT')

		mainResult.playerJointHard = playerJointHard;

		////////////////////////////////////////////////Коэфициенты

		nightmare.wait('.tabs__group a:nth-child(2)');
		nightmare.click('.tabs__group a:nth-child(2)');
		nightmare.wait(5000);
		nightmare.wait('.rows___1BdItrT');

		const bookmakerRatioWL = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.rows___1BdItrT')

		mainResult.bookmakerRatioWL = bookmakerRatioWL;

		nightmare.wait('#detail div:nth-child(6) a:nth-child(2)');
		nightmare.click('#detail div:nth-child(6) a:nth-child(2)');
		nightmare.wait(5000);
		nightmare.wait('.tableWrapper___33yhdWE')

		const bookmakerRatioBL = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.tableWrapper___33yhdWE')

		mainResult.bookmakerRatioBL = bookmakerRatioBL;

		nightmare.wait('#detail div:nth-child(6) a:nth-child(4)');
		nightmare.click('#detail div:nth-child(6) a:nth-child(4)');
		nightmare.wait(5000);
		nightmare.wait('.tableWrapper___33yhdWE')

		const bookmakerRatioAccurateScore = await nightmare.evaluate((selector, done) => {
			done(null, document.querySelector(selector).innerText)
		}, '.tableWrapper___33yhdWE')

		mainResult.bookmakerRatioAccurateScore = bookmakerRatioAccurateScore;

		console.log(mainResult);

		nightmare.wait(10000)
		
		return mainResult
	} catch (error) {
		console.error(error);
		console.log(mainResult);
		throw error;
	} finally {
		await nightmare.end();
	}
}
// mainParsing(url);

module.exports.mainParsing = mainParsing