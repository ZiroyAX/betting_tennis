// const { mainDirName } = require('../testing');

const XlsxPopulate = require('xlsx-populate');
const path = require('path');
const open = require("open"); //был var
const fs = require("fs");

const DBFull = path.join(__dirname, '../excelDocuments/DBFull.xlsx');
const Pro_Tennis_06_09_Denis = path.join(__dirname, '../excelDocuments/Pro_Tennis_06_09_Denis.xlsm');
const TenUltimate = path.join(__dirname, '../excelDocuments/TenUltimate.xlsx');
const tool = path.join(__dirname, '../excelDocuments/tool.xlsx');
const p = path.join(__dirname, '../excelDocuments/p.xlsx');
const p_original = path.join(__dirname, '../excelDocuments/p_original.xlsx');
const DBAfterExcelParsing = path.join(__dirname, '../excelDocuments/DBAfterExcelParsing.xlsx');

async function exportToDBFull(DB) {
  const workbook = await XlsxPopulate.fromFileAsync(DBFull);

  if (workbook.sheet(DB.mainInfo[1])) {
    console.log('Лист существует');
  } else workbook.addSheet(DB.mainInfo[1]);

  if (workbook.sheet(DB.mainInfo[6])) {
    console.log('Лист существует');
  } else workbook.addSheet(DB.mainInfo[6]);

  workbook.sheet(DB.mainInfo[1]).cell(`A4`).value('Grass');
  workbook.sheet(DB.mainInfo[6]).cell(`A4`).value('Grass');
  workbook.sheet(DB.mainInfo[1]).cell(`H4`).value('Ground');
  workbook.sheet(DB.mainInfo[6]).cell(`H4`).value('Ground');
  workbook.sheet(DB.mainInfo[1]).cell(`O4`).value('Hard');
  workbook.sheet(DB.mainInfo[6]).cell(`O4`).value('Hard');

  DB.matchesPlayerOneGrass.forEach((item, index) => {
    workbook.sheet(DB.mainInfo[1]).cell(`A${index + 5}`).value(item[0]);
    workbook.sheet(DB.mainInfo[1]).cell(`B${index + 5}`).value(item[1]);
    workbook.sheet(DB.mainInfo[1]).cell(`C${index + 5}`).value(item[2]);
    workbook.sheet(DB.mainInfo[1]).cell(`D${index + 5}`).value(item[3]);
    workbook.sheet(DB.mainInfo[1]).cell(`E${index + 5}`).value(item[4]);
    workbook.sheet(DB.mainInfo[1]).cell(`F${index + 5}`).value(item[5]);
  })

  DB.matchesPlayerTwoGrass.forEach((item, index) => {
    workbook.sheet(DB.mainInfo[6]).cell(`A${index + 5}`).value(item[0]);
    workbook.sheet(DB.mainInfo[6]).cell(`B${index + 5}`).value(item[1]);
    workbook.sheet(DB.mainInfo[6]).cell(`C${index + 5}`).value(item[2]);
    workbook.sheet(DB.mainInfo[6]).cell(`D${index + 5}`).value(item[3]);
    workbook.sheet(DB.mainInfo[6]).cell(`E${index + 5}`).value(item[4]);
    workbook.sheet(DB.mainInfo[6]).cell(`F${index + 5}`).value(item[5]);
  })

  DB.matchesPlayerOneGround.forEach((item, index) => {
    workbook.sheet(DB.mainInfo[1]).cell(`H${index + 5}`).value(item[0]);
    workbook.sheet(DB.mainInfo[1]).cell(`I${index + 5}`).value(item[1]);
    workbook.sheet(DB.mainInfo[1]).cell(`J${index + 5}`).value(item[2]);
    workbook.sheet(DB.mainInfo[1]).cell(`K${index + 5}`).value(item[3]);
    workbook.sheet(DB.mainInfo[1]).cell(`L${index + 5}`).value(item[4]);
    workbook.sheet(DB.mainInfo[1]).cell(`M${index + 5}`).value(item[5]);
  })

  DB.matchesPlayerTwoGround.forEach((item, index) => {
    workbook.sheet(DB.mainInfo[6]).cell(`H${index + 5}`).value(item[0]);
    workbook.sheet(DB.mainInfo[6]).cell(`I${index + 5}`).value(item[1]);
    workbook.sheet(DB.mainInfo[6]).cell(`J${index + 5}`).value(item[2]);
    workbook.sheet(DB.mainInfo[6]).cell(`K${index + 5}`).value(item[3]);
    workbook.sheet(DB.mainInfo[6]).cell(`L${index + 5}`).value(item[4]);
    workbook.sheet(DB.mainInfo[6]).cell(`M${index + 5}`).value(item[5]);
  })  

  DB.matchesPlayerOneHard.forEach((item, index) => {
    workbook.sheet(DB.mainInfo[1]).cell(`O${index + 5}`).value(item[0]);
    workbook.sheet(DB.mainInfo[1]).cell(`P${index + 5}`).value(item[1]);
    workbook.sheet(DB.mainInfo[1]).cell(`Q${index + 5}`).value(item[2]);
    workbook.sheet(DB.mainInfo[1]).cell(`R${index + 5}`).value(item[3]);
    workbook.sheet(DB.mainInfo[1]).cell(`S${index + 5}`).value(item[4]);
    workbook.sheet(DB.mainInfo[1]).cell(`T${index + 5}`).value(item[5]);
  })

  DB.matchesPlayerTwoHard.forEach((item, index) => {
    workbook.sheet(DB.mainInfo[6]).cell(`O${index + 5}`).value(item[0]);
    workbook.sheet(DB.mainInfo[6]).cell(`P${index + 5}`).value(item[1]);
    workbook.sheet(DB.mainInfo[6]).cell(`Q${index + 5}`).value(item[2]);
    workbook.sheet(DB.mainInfo[6]).cell(`R${index + 5}`).value(item[3]);
    workbook.sheet(DB.mainInfo[6]).cell(`S${index + 5}`).value(item[4]);
    workbook.sheet(DB.mainInfo[6]).cell(`T${index + 5}`).value(item[5]);
  })

  await workbook.toFileAsync(DBFull);
  return 'Done'
}

async function exportToProTennis(DB, coating) {
  const workbook = await XlsxPopulate.fromFileAsync(Pro_Tennis_06_09_Denis);

  function addMatches(OnePlayer, TwoPlayer) {
    DB[OnePlayer].forEach((item, index) => {
      if (index < 20) {
        workbook.sheet("Первый игрок").cell(`A${index + 2}`).value(item[0]);
        workbook.sheet("Первый игрок").cell(`B${index + 2}`).value(item[1]);
        workbook.sheet("Первый игрок").cell(`C${index + 2}`).value(item[2]);
        workbook.sheet("Первый игрок").cell(`D${index + 2}`).value(item[3]);
        workbook.sheet("Первый игрок").cell(`E${index + 2}`).value(item[4]);
      }
    })
    DB[TwoPlayer].forEach((item, index) => {
      if (index < 20) {
        workbook.sheet("Второй игрок").cell(`A${index + 2}`).value(item[0]);
        workbook.sheet("Второй игрок").cell(`B${index + 2}`).value(item[1]);
        workbook.sheet("Второй игрок").cell(`C${index + 2}`).value(item[2]);
        workbook.sheet("Второй игрок").cell(`D${index + 2}`).value(item[3]);
        workbook.sheet("Второй игрок").cell(`E${index + 2}`).value(item[4]);
      }
    })
  }
//ДОРАБОТАТЬ ЗАДУМКУ - НУЖНО ПРЕОБРАЗОВАТЬ В ТИП ЧИСЛА
//ВЫЧИСЛИТЬ СРЕДНЕЕ ПО ВСЕМ БК
  // DB.matchesRatioWL.forEach((item) => {
  //   console.log(item);
  //   item.reduce(([win, lose], [newWin, newlose], index) => {
  //     console.log(`win ${win} lose ${lose}`);
  //     console.log(`newWin ${newWin} newlose ${newlose}`);
  //     console.log(`index ${index}`);
  //   }, [0, 0])
  // })

  workbook.sheet("Линия").cell(`E12`).value(DB.matchesRatioWL[0][0]);
  workbook.sheet("Линия").cell(`G12`).value(DB.matchesRatioWL[0][1]);

  workbook.sheet("Rezult").cell(`A3`).value(DB.mainInfo[1]);
  workbook.sheet("Rezult").cell(`B3`).value(DB.mainInfo[6]);
  workbook.sheet("Rezult").cell(`C3`).value(DB.mainInfo[0]);
  workbook.sheet("Rezult").cell(`AQ3`).value(DB.url);
  workbook.sheet("Rezult").cell(`BH3`).value(DB.tournament[0]);

  let oneAtp = DB.mainInfo[3];
  let twoAtp = DB.mainInfo[8];

  oneAtp = oneAtp.slice(2);
  twoAtp = twoAtp.slice(2);
  oneAtp = parseInt(oneAtp);
  twoAtp = parseInt(twoAtp);

  workbook.sheet("Начало").cell(`K8`).value(oneAtp);
  workbook.sheet("Начало").cell(`K9`).value(twoAtp);

  switch (coating) {
    case "Grass":
      addMatches('matchesPlayerOneGrass', 'matchesPlayerTwoGrass')
      break;
    case "Ground":
      addMatches('matchesPlayerOneGround', 'matchesPlayerTwoGround')
      break;
    case "Hard":
      addMatches('matchesPlayerOneHard', 'matchesPlayerTwoHard')
    break;
    default:
      break;
  }

  await workbook.toFileAsync(Pro_Tennis_06_09_Denis);
  return 'Done'
}

async function exportToTenUltimate(DB, coating) {
  const workbook = await XlsxPopulate.fromFileAsync(TenUltimate);

  function addMatches(OnePlayer, TwoPlayer) {
    DB[OnePlayer].forEach((item, index) => {
      if (index < 10) {
        workbook.sheet("1-й игрок").cell(`A${index + 4}`).value(item[0]);
        workbook.sheet("1-й игрок").cell(`B${index + 4}`).value(item[1]);
        workbook.sheet("1-й игрок").cell(`C${index + 4}`).value(item[2]);
        workbook.sheet("1-й игрок").cell(`D${index + 4}`).value(item[3]);
        workbook.sheet("1-й игрок").cell(`E${index + 4}`).value(item[4]);
      }
    })
    DB[TwoPlayer].forEach((item, index) => {
      if (index < 10) {
        workbook.sheet("2-й игрок").cell(`A${index + 4}`).value(item[0]);
        workbook.sheet("2-й игрок").cell(`B${index + 4}`).value(item[1]);
        workbook.sheet("2-й игрок").cell(`C${index + 4}`).value(item[2]);
        workbook.sheet("2-й игрок").cell(`D${index + 4}`).value(item[3]);
        workbook.sheet("2-й игрок").cell(`E${index + 4}`).value(item[4]);
      }
    })
  }

  switch (coating) {
    case "Grass":
      addMatches('matchesPlayerOneGrass', 'matchesPlayerTwoGrass')
      break;
    case "Ground":
      addMatches('matchesPlayerOneGround', 'matchesPlayerTwoGround')
      break;
    case "Hard":
      addMatches('matchesPlayerOneHard', 'matchesPlayerTwoHard')
    break;
    default:
      break;
  }

  await workbook.toFileAsync(TenUltimate);
  return 'Done'
}

async function exportToTool(DB, coating) {
  const workbook = await XlsxPopulate.fromFileAsync(tool);

  let allGamesPlayerFirst = [];
  allGamesPlayerFirst = allGamesPlayerFirst.concat(DB.matchesPlayerOneGrass, DB.matchesPlayerOneGround, DB.matchesPlayerOneHard);
  allGamesPlayerFirst.forEach((item) => {
    let temp = item[0].split('.');
    temp = temp.map((item) => parseInt(item));
    return item[0] = new Date(`20${temp[2]}`, temp[1], temp[0]); 
  });
  allGamesPlayerFirst.sort((a, b) => b[0] - a[0]);

  let allPlayerFirstWins = 0;
  let allPlayerFirstLose = 0;

  allGamesPlayerFirst.map((item, index) => {
    if (index < 10) {
      if (item[5] === 'В') {
        allPlayerFirstWins++
      }
      if (item[5] === 'П') {
        allPlayerFirstLose++
      }
    }
  })

  let allGamesPlayerSecond = [];
  allGamesPlayerSecond = allGamesPlayerSecond.concat(DB.matchesPlayerTwoGrass, DB.matchesPlayerTwoGround, DB.matchesPlayerTwoHard);
  allGamesPlayerSecond.forEach((item) => {
    let temp = item[0].split('.');
    temp = temp.map((item) => parseInt(item));
    return item[0] = new Date(`20${temp[2]}`, temp[1], temp[0]); 
  });
  allGamesPlayerSecond.sort((a, b) => b[0] - a[0]);

  let allPlayerSecondWins = 0;
  let allPlayerSecondLose = 0;

  allGamesPlayerSecond.map((item, index) => {
    if (index < 10) {
      if (item[5] === 'В') {
        allPlayerSecondWins++
      }
      if (item[5] === 'П') {
        allPlayerSecondLose++
      }
    }
  })

  workbook.sheet("Лист1").cell(`F3`).value(allPlayerFirstWins);
  workbook.sheet("Лист1").cell(`F4`).value(allPlayerFirstLose);
  workbook.sheet("Лист1").cell(`G3`).value(allPlayerSecondWins);
  workbook.sheet("Лист1").cell(`G4`).value(allPlayerSecondLose);

  switch (coating) {
    case "Grass":
      let grassPlayerFirstWins = 0;
      let grassPlayerFirstLose = 0;
      DB.matchesPlayerOneGrass.map((item, index) => {
        if (index < 10) {
          if (item[5] === 'В') {
            grassPlayerFirstWins++
          }
          if (item[5] === 'П') {
            grassPlayerFirstLose++
          }
        }
      })
      let grassPlayerSecondWins = 0;
      let grassPlayerSecondLose = 0;
      DB.matchesPlayerTwoGrass.map((item, index) => {
        if (index < 10) {
          if (item[5] === 'В') {
            grassPlayerSecondWins++
          }
          if (item[5] === 'П') {
            grassPlayerSecondLose++
          }
        }
      })
      workbook.sheet("Лист1").cell(`F6`).value(grassPlayerFirstWins);
      workbook.sheet("Лист1").cell(`F7`).value(grassPlayerFirstLose);
      workbook.sheet("Лист1").cell(`G6`).value(grassPlayerSecondWins);
      workbook.sheet("Лист1").cell(`G7`).value(grassPlayerSecondLose);
      break;
    case "Ground":
      let groundPlayerFirstWins = 0;
      let groundPlayerFirstLose = 0;
      DB.matchesPlayerOneGround.map((item, index) => {
        if (index < 10) {
          if (item[5] === 'В') {
            groundPlayerFirstWins++
          }
          if (item[5] === 'П') {
            groundPlayerFirstLose++
          }
        }
      })
      let groundPlayerSecondWins = 0;
      let groundPlayerSecondLose = 0;
      DB.matchesPlayerTwoGround.map((item, index) => {
        if (index < 10) {
          if (item[5] === 'В') {
            groundPlayerSecondWins++
          }
          if (item[5] === 'П') {
            groundPlayerSecondLose++
          }
        }
      })
      workbook.sheet("Лист1").cell(`F6`).value(groundPlayerFirstWins);
      workbook.sheet("Лист1").cell(`F7`).value(groundPlayerFirstLose);
      workbook.sheet("Лист1").cell(`G6`).value(groundPlayerSecondWins);
      workbook.sheet("Лист1").cell(`G7`).value(groundPlayerSecondLose);
      break;
    case "Hard":
      let hardPlayerFirstWins = 0;
      let hardPlayerFirstLose = 0;
      DB.matchesPlayerOneHard.map((item, index) => {
        if (index < 10) {
          if (item[5] === 'В') {
            hardPlayerFirstWins++
          }
          if (item[5] === 'П') {
            hardPlayerFirstLose++
          }
        }
      })
      let hardPlayerSecondWins = 0;
      let hardPlayerSecondLose = 0;
      DB.matchesPlayerTwoHard.map((item, index) => {
        if (index < 10) {
          if (item[5] === 'В') {
            hardPlayerSecondWins++
          }
          if (item[5] === 'П') {
            hardPlayerSecondLose++
          }
        }
      })
      workbook.sheet("Лист1").cell(`F6`).value(hardPlayerFirstWins);
      workbook.sheet("Лист1").cell(`F7`).value(hardPlayerFirstLose);
      workbook.sheet("Лист1").cell(`G6`).value(hardPlayerSecondWins);
      workbook.sheet("Лист1").cell(`G7`).value(hardPlayerSecondLose);
    break;
    default:
      break;
  }

  await workbook.toFileAsync(tool);
  return 'Done'
}

async function exportToP(DB, coating) {
  const workbook = await XlsxPopulate.fromFileAsync(p);

  function addMatches(OnePlayer, TwoPlayer) {
    DB[OnePlayer].forEach((item, index) => {
      if (index < 5) {
        workbook.sheet("Лист1").cell(`A${index + 2}`).value(item[0]);
        workbook.sheet("Лист1").cell(`B${index + 2}`).value(item[1]);
        workbook.sheet("Лист1").cell(`C${index + 2}`).value(item[2]);
        workbook.sheet("Лист1").cell(`D${index + 2}`).value(item[3]);
        workbook.sheet("Лист1").cell(`E${index + 2}`).value(item[4]);
      }
    })
    DB[TwoPlayer].forEach((item, index) => {
      if (index < 5) {
        workbook.sheet("Лист1").cell(`A${index + 10}`).value(item[0]);
        workbook.sheet("Лист1").cell(`B${index + 10}`).value(item[1]);
        workbook.sheet("Лист1").cell(`C${index + 10}`).value(item[2]);
        workbook.sheet("Лист1").cell(`D${index + 10}`).value(item[3]);
        workbook.sheet("Лист1").cell(`E${index + 10}`).value(item[4]);
      }
    })
  }

  switch (coating) {
    case "Grass":
      addMatches('matchesPlayerOneGrass', 'matchesPlayerTwoGrass')
      break;
    case "Ground":
      addMatches('matchesPlayerOneGround', 'matchesPlayerTwoGround')
      break;
    case "Hard":
      addMatches('matchesPlayerOneHard', 'matchesPlayerTwoHard')
    break;
    default:
      break;
  }

  await workbook.toFileAsync(p);
  return 'Done'
}

async function exportToP_original(DB, coating) {
  const workbook = await XlsxPopulate.fromFileAsync(p_original);
  const dateToNumberExcel = {
    "0 : 0": 0.0833333333333333,
    "1 : 0": 0.0416666666666667,
    "0 : 1": 0.000694444444444444,
    "1 : 1": 0.0423611111111111,
    "2 : 0": 0.0833333333333333,
    "0 : 2": 0.00138888888888889,
    "2 : 1": 0.0840277777777778,
    "1 : 2": 0.0430555555555556,
    "0 : 3": 0.00208333333333333,
    "3 : 0": 0.12500000000000000,
    "3 : 1": 0.125694444444444,
    "1 : 3": 0.04375000000000000
  }

  function addMatches(OnePlayer, TwoPlayer) {
    DB[OnePlayer].forEach((item, index) => {
      if (index < 5) {
        const resCounter = dateToNumberExcel[item[4]];
        workbook.sheet("Лист1").cell(`A${index + 2}`).value(item[0]);
        workbook.sheet("Лист1").cell(`B${index + 2}`).value(item[1]);
        workbook.sheet("Лист1").cell(`C${index + 2}`).value(item[2]);
        workbook.sheet("Лист1").cell(`D${index + 2}`).value(item[3]);
        workbook.sheet("Лист1").cell(`E${index + 2}`).value(resCounter);
      }
    })
    DB[TwoPlayer].forEach((item, index) => {
      if (index < 5) {
        const resCounter = dateToNumberExcel[item[4]];
        workbook.sheet("Лист1").cell(`A${index + 10}`).value(item[0]);
        workbook.sheet("Лист1").cell(`B${index + 10}`).value(item[1]);
        workbook.sheet("Лист1").cell(`C${index + 10}`).value(item[2]);
        workbook.sheet("Лист1").cell(`D${index + 10}`).value(item[3]);
        workbook.sheet("Лист1").cell(`E${index + 10}`).value(resCounter);
      }
    })
  }

  switch (coating) {
    case "Grass":
      addMatches('matchesPlayerOneGrass', 'matchesPlayerTwoGrass')
      break;
    case "Ground":
      addMatches('matchesPlayerOneGround', 'matchesPlayerTwoGround')
      break;
    case "Hard":
      addMatches('matchesPlayerOneHard', 'matchesPlayerTwoHard')
    break;
    default:
      break;
  }

  await workbook.toFileAsync(p_original);
  return 'Done'
}

async function openSecondaryExcel() {
  await open(TenUltimate);
  await open(tool);
  await open(p);
  await open(p_original);
  await open(DBFull);
}

function openMainExcel() {
  open(Pro_Tennis_06_09_Denis);
  // open(DBAfterExcelParsing);
}

function log(item) {
  console.log(typeof item, item);
}

async function transformationUnderTheory([begin, end], [CurrentSheetText, NewSheetText]) {
  // const nameSheet = 'Archive_2017-2018';
  // const nameSheetNew = 'transformationUnderTheory';
  const nameSheet = CurrentSheetText || '2021';
  const nameSheetNew = NewSheetText || '2021_transformed';
  console.log(`nameSheet: ${nameSheet} nameSheetNew: ${nameSheetNew}`);
  const workbook = await XlsxPopulate.fromFileAsync(DBAfterExcelParsing);

  for (let i = begin; i <= end; i++) {
    const A = workbook.sheet(nameSheet).cell(`A${i}`).value();
    if (A) workbook.sheet(nameSheetNew).cell(`A${i}`).value(A);

    const B = workbook.sheet(nameSheet).cell(`B${i}`).value();
    if (B) workbook.sheet(nameSheetNew).cell(`B${i}`).value(B);

    const C = workbook.sheet(nameSheet).cell(`C${i}`).value();
    if (C) workbook.sheet(nameSheetNew).cell(`C${i}`).value(C);

    const D = workbook.sheet(nameSheet).cell(`D${i}`).value();
    if (D) workbook.sheet(nameSheetNew).cell(`D${i}`).value(D);

    const E = +workbook.sheet(nameSheet).cell(`E${i}`).value();
    const F = +workbook.sheet(nameSheet).cell(`F${i}`).value();
    if (E < F){
      workbook.sheet(nameSheetNew).cell("E" + i).value("П1");
    } else if (E > F) {
      workbook.sheet(nameSheetNew).cell("E" + i).value("П2");
    } else workbook.sheet(nameSheetNew).cell("E" + i).value("ПРОВЕРИТЬ!!!");

    let G = +workbook.sheet(nameSheet).cell(`G${i}`).value();
    let H = +workbook.sheet(nameSheet).cell(`H${i}`).value();
    G = G * 100;
    H = H * 100;
    if (G < H){
      workbook.sheet(nameSheetNew).cell("G" + i).value("П1");
    } else if (G > H) {
      workbook.sheet(nameSheetNew).cell("G" + i).value("П2");
    } else workbook.sheet(nameSheetNew).cell("G" + i).value("ПРОВЕРИТЬ!!!");

    let I = +workbook.sheet(nameSheet).cell(`I${i}`).value();
    let J = +workbook.sheet(nameSheet).cell(`J${i}`).value();
    I = Math.round(I * 100);
    J = Math.round(J * 100);
    if (I > J){
      workbook.sheet(nameSheetNew).cell("I" + i).value("П1");
    } else if (I < J) {
      workbook.sheet(nameSheetNew).cell("I" + i).value("П2");
    } else workbook.sheet(nameSheetNew).cell("I" + i).value("ПРОВЕРИТЬ!!!");

    const K = workbook.sheet(nameSheet).cell(`K${i}`).value();
    if (K === 'Игрок 1'){
      workbook.sheet(nameSheetNew).cell("K" + i).value("П1");
    } else if (K === 'Игрок 2') {
      workbook.sheet(nameSheetNew).cell("K" + i).value("П2");
    } else if (K === 'Силы равны') {
      workbook.sheet(nameSheetNew).cell("K" + i).value("П0");
    } else workbook.sheet(nameSheetNew).cell("K" + i).value("ПРОВЕРИТЬ!!!");

    const L = workbook.sheet(nameSheet).cell(`L${i}`).value();
    if (L === 'Игрок 1'){
      workbook.sheet(nameSheetNew).cell("L" + i).value("П1");
    } else if (L === 'Игрок 2') {
      workbook.sheet(nameSheetNew).cell("L" + i).value("П2");
    } else if (L === 'Силы равны') {
      workbook.sheet(nameSheetNew).cell("L" + i).value("П0");
    } else workbook.sheet(nameSheetNew).cell("L" + i).value("ПРОВЕРИТЬ!!!");

    const M = workbook.sheet(nameSheet).cell(`M${i}`).value(); 
    if (M === 'Игрок 1'){
      workbook.sheet(nameSheetNew).cell("M" + i).value("П1");
    } else if (M === 'Игрок 2') {
      workbook.sheet(nameSheetNew).cell("M" + i).value("П2");
    } else if (M === 'Силы равны') {
      workbook.sheet(nameSheetNew).cell("M" + i).value("П0");
    } else workbook.sheet(nameSheetNew).cell("M" + i).value("ПРОВЕРИТЬ!!!");

    const N = workbook.sheet(nameSheet).cell(`N${i}`).value();   
    if (N === 'Игрок 1'){
      workbook.sheet(nameSheetNew).cell("N" + i).value("П1");
    } else if (N === 'Игрок 2') {
      workbook.sheet(nameSheetNew).cell("N" + i).value("П2");
    } else if (N === 'Силы равны') {
      workbook.sheet(nameSheetNew).cell("N" + i).value("П0");
    } else workbook.sheet(nameSheetNew).cell("N" + i).value("ПРОВЕРИТЬ!!!");

    const O = workbook.sheet(nameSheet).cell(`O${i}`).value();    
    if (O === 'Игрок 1'){
      workbook.sheet(nameSheetNew).cell("O" + i).value("П1");
    } else if (O === 'Игрок 2') {
      workbook.sheet(nameSheetNew).cell("O" + i).value("П2");
    } else if (O === 'Силы равны') {
      workbook.sheet(nameSheetNew).cell("O" + i).value("П0");
    } else workbook.sheet(nameSheetNew).cell("O" + i).value("ПРОВЕРИТЬ!!!");

    const P = workbook.sheet(nameSheet).cell(`P${i}`).value();
    if (P === 'Игрок 1'){
      workbook.sheet(nameSheetNew).cell("P" + i).value("П1");
    } else if (P === 'Игрок 2') {
      workbook.sheet(nameSheetNew).cell("P" + i).value("П2");
    } else if (P === 'Силы равны') {
      workbook.sheet(nameSheetNew).cell("P" + i).value("П0");
    } else workbook.sheet(nameSheetNew).cell("P" + i).value("ПРОВЕРИТЬ!!!");

    const Q = workbook.sheet(nameSheet).cell(`Q${i}`).value();
    workbook.sheet(nameSheetNew).cell(`Q${i}`).value(Q);
    const R = workbook.sheet(nameSheet).cell(`R${i}`).value();
    workbook.sheet(nameSheetNew).cell(`R${i}`).value(R);

    let S = +workbook.sheet(nameSheet).cell(`S${i}`).value();
    let T = +workbook.sheet(nameSheet).cell(`T${i}`).value();
    S = Math.round(S * 100);
    T = Math.round(T * 100);
    workbook.sheet(nameSheetNew).cell(`S${i}`).value(S);
    workbook.sheet(nameSheetNew).cell(`T${i}`).value(T);

    const U = workbook.sheet(nameSheet).cell(`U${i}`).value();
    if (U === 'П1' || U === 'П2') workbook.sheet(nameSheetNew).cell(`U${i}`).value(U);

    const X = workbook.sheet(nameSheet).cell(`X${i}`).value();
    if (X === 'П1' || X === 'П2') workbook.sheet(nameSheetNew).cell(`X${i}`).value(X);
  
    let Y = +workbook.sheet(nameSheet).cell(`Y${i}`).value();
    let Z = +workbook.sheet(nameSheet).cell(`Z${i}`).value();
    Y = Math.round(Y * 100);
    Z = Math.round(Z * 100);
    workbook.sheet(nameSheetNew).cell(`Y${i}`).value(Y);
    workbook.sheet(nameSheetNew).cell(`Z${i}`).value(Z);

    let AA = +workbook.sheet(nameSheet).cell(`AA${i}`).value();
    let AB = +workbook.sheet(nameSheet).cell(`AB${i}`).value();
    AA = Math.round(AA * 100);
    AB = Math.round(AB * 100);
    workbook.sheet(nameSheetNew).cell(`AA${i}`).value(AA);
    workbook.sheet(nameSheetNew).cell(`AB${i}`).value(AB);

    const AE = Math.round(+workbook.sheet(nameSheet).cell(`AE${i}`).value());
    if (AE) workbook.sheet(nameSheetNew).cell(`AE${i}`).value(AE);

    const AF = workbook.sheet(nameSheet).cell(`AF${i}`).value();
    if (AF) workbook.sheet(nameSheetNew).cell(`AF${i}`).value(AF);

    const AG = workbook.sheet(nameSheet).cell(`AG${i}`).value();
    if (AG === 'П1' || AG === 'П2') workbook.sheet(nameSheetNew).cell(`AG${i}`).value(AG);

    const AI = workbook.sheet(nameSheet).cell(`AI${i}`).value();
    if (AI === 'П1' || AI === 'П2') workbook.sheet(nameSheetNew).cell(`AI${i}`).value(AI);

    const AJ = workbook.sheet(nameSheet).cell(`AJ${i}`).value();
    if (AJ === 'П1' || AJ === 'П2') workbook.sheet(nameSheetNew).cell(`AJ${i}`).value(AJ);

    // Чем меньше индекс победы, тем больше шансов победить
    // Чем меньше индекс поражения, тем больше шансов проиграть
    let AM = +workbook.sheet(nameSheet).cell(`AM${i}`).value();
    let AN = +workbook.sheet(nameSheet).cell(`AN${i}`).value();
    let AO = +workbook.sheet(nameSheet).cell(`AO${i}`).value();
    let AP = +workbook.sheet(nameSheet).cell(`AP${i}`).value();
    AM = Math.round(AM * 100);
    AN = Math.round(AN * 100);
    AO = Math.round(AO * 100);
    AP = Math.round(AP * 100);

    if ((AM < AN) && (AO > AP)) {
      workbook.sheet(nameSheetNew).cell(`AM${i}`).value("П1");
    } else if ((AM > AN) && (AO < AP)) {
      workbook.sheet(nameSheetNew).cell(`AM${i}`).value("П2");
    }

    const AR = workbook.sheet(nameSheet).cell(`AR${i}`).value();
    if (AR) workbook.sheet(nameSheetNew).cell(`AR${i}`).value(AR);

  }
  await workbook.toFileAsync(DBAfterExcelParsing);
  return 'Done'
}

module.exports.exportToDBFull = exportToDBFull;
module.exports.exportToProTennis = exportToProTennis;
module.exports.exportToTenUltimate = exportToTenUltimate;
module.exports.exportToTool = exportToTool;
module.exports.exportToP = exportToP;
module.exports.exportToP_original = exportToP_original;
module.exports.openSecondaryExcel = openSecondaryExcel;
module.exports.openMainExcel = openMainExcel;
module.exports.transformationUnderTheory = transformationUnderTheory;