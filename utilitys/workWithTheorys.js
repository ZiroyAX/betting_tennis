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
const allTheoryWinJSON = path.join(__dirname, '../excelDocuments/allTheoryWin.json');
const allTheoryTotalJSON = path.join(__dirname, '../excelDocuments/allTheoryTotal.json');

function nearest2(arr) {
  const len = arr.length, 
        n = Math.pow(2, len), 
        result = [];
  for(let i = 1; i < n; i++) {
      let row = []
      for(let bit = 0; bit < len; bit++) {
          if( i & (1 << bit)) {
              row.push(arr[bit]);
          }
      }
      result.push(row)
  }
  // `[
  //   [ 'A' ],
  //   [ 'B' ],
  //   [ 'A', 'B' ],
  //   [ 'C' ],
  //   [ 'A', 'C' ],
  //   [ 'A', 'B', 'C' ]
  // ]`
  return result
}

function transformRezMatch(text) {
  try {
    return {
      counterFirstPlayer: +text[0],
      counterSecondPlayer: +text[2],
      firstSet: +text[5],
    }
  } catch (error) {
    return {
      counterFirstPlayer: undefined,
      counterSecondPlayer: undefined,
      firstSet: undefined,
    }
  }
}

async function searchAllTheoryOnWin([begin, end]) {
    const nameSheet = 'transformationUnderTheory';
    const workbook = await XlsxPopulate.fromFileAsync(DBAfterExcelParsing);
  
    const THEORY_ALL = nearest2(['E', 'G', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'U', 'X', 'AG', 'AI', 'AM']);
    // const THEORY_ALL = nearest2(['X', 'U']);

    // {
    //   theory: ['Q', 'R'],
    //   total: 8,
    //   totalWin: 5,
    //   totalLose: 3,
    //   counters: [1, -1, -1, 1, 1, 1, -1, 1],
    // }

    const Data = THEORY_ALL.map((item, index) => {
      const currentProcess = (Math.ceil(index / THEORY_ALL.length * 100));
      currentProcess % 10 === 0 ? console.log(currentProcess) : null; //исп new Set?

      let total = 0;
      let totalWin = 0;
      let totalLose = 0;
      const counters = [];

      for (let i = begin; i <= end; i++) {
        // const resultMatch = transformRezMatch(workbook.sheet(nameSheet).cell(`A${i}`).value());
        const { counterFirstPlayer, counterSecondPlayer, firstSet } = transformRezMatch(workbook.sheet(nameSheet).cell(`A${i}`).value());
        const currentWinInMatch = counterFirstPlayer > counterSecondPlayer ? 'П1' : 'П2';
        const arrCurrentValueTheory = item.map((item) => {
          return workbook.sheet(nameSheet).cell(`${item}${i}`).value();
        })
        // console.log(counterFirstPlayer, counterSecondPlayer, firstSet, item, arrCurrentValueTheory);

        let currentValueTheory = '';
        if (arrCurrentValueTheory.every((value) => value === 'П1')) {
          currentValueTheory = 'П1';
        } else if (arrCurrentValueTheory.every((value) => value === 'П2')) {
          currentValueTheory = 'П2';
        // } else currentValueTheory = null;
        } else currentValueTheory = undefined;
        // console.log(`currentValueTheory= ${currentValueTheory}`);

        if ((currentWinInMatch === 'П1') && (currentValueTheory === 'П1')) {
          total++;
          totalWin++;
          counters.push(1);
        } else if ((currentWinInMatch === 'П2') && (currentValueTheory === 'П2')) {
          total++;
          totalWin++;
          counters.push(1);
        } else if ((currentWinInMatch === 'П1') && (currentValueTheory === 'П2')) {
          total++;
          totalLose++;
          counters.push(-1);
        } else if ((currentWinInMatch === 'П2') && (currentValueTheory === 'П1')) {
          total++;
          totalLose++;
          counters.push(-1);
        }
        // console.log(total, totalWin, totalLose);
      }
      return {
        theory: item,
        total,
        totalWin,
        totalLose,
        counters,
      }
    });

    Data.sort((i1, i2) => {
      return ((Math.ceil(i2.totalWin / i2.total * 100)) - (Math.ceil(i1.totalWin / i1.total * 100)))
    })

    console.log(Data);
    
    fs.writeFileSync(allTheoryWinJSON, JSON.stringify(Data));
    return Data
};

async function searchAllTheoryTotal([begin, end]) {
  const nameSheet = 'transformationUnderTheory';
  const workbook = await XlsxPopulate.fromFileAsync(DBAfterExcelParsing);

  const THEORY_ALL = nearest2(['Q+R', 'S', 'T', 'AE']);
  // const THEORY_ALL = nearest2(['X', 'U']);

  // {
  //   theory: ['Q', 'R'],
  //   total: 8,
  //   totalWin: 5,
  //   totalLose: 3,
  //   counters: [1, -1, -1, 1, 1, 1, -1, 1],
  // }

  const currentValueTheory = {
    'Q+R': (nameSheet, lineNumber) => {
      const contentQ = workbook.sheet(nameSheet).cell(`Q${lineNumber}`).value();
      const contentR = workbook.sheet(nameSheet).cell(`R${lineNumber}`).value();
      if ((contentQ === 'Yes') && (contentR === 'Yes')) {
        return 3;
      } else return 2;
    },
    'S': (nameSheet, lineNumber) => {
      const content = +workbook.sheet(nameSheet).cell(`S${lineNumber}`).value();
      if (content > 70) {
        return 3;
      } else if (content < 40) {
        return 2;
      } else return undefined;
    },
    'T': (nameSheet, lineNumber) => {
      const content = +workbook.sheet(nameSheet).cell(`T${lineNumber}`).value();
      if (content > 70) {
        return 2;
      } else if (content < 40) {
        return 3;
      } else return undefined;
    },
    'AE': (nameSheet, lineNumber) => {
      const content = +workbook.sheet(nameSheet).cell(`AE${lineNumber}`).value();
      if (content >= 3) {
        return 3;
      } else if (content <= 2) {
        return 2;
      } else return undefined;
    }
  }

  const Data = THEORY_ALL.map((item, index) => {
    const currentProcess = (Math.ceil(index / THEORY_ALL.length * 100));
    currentProcess % 10 === 0 ? console.log(currentProcess) : null; //исп new Set?

    let total = 0;
    let totalWin = 0;
    let totalLose = 0;
    const counters = [];

    for (let i = begin; i <= end; i++) {
      // const resultMatch = transformRezMatch(workbook.sheet(nameSheet).cell(`A${i}`).value());
      const { counterFirstPlayer, counterSecondPlayer, firstSet } = transformRezMatch(workbook.sheet(nameSheet).cell(`A${i}`).value());
      const currentAccountInMatch = counterFirstPlayer + counterSecondPlayer;
      const arrCurrentValueTheory = item.map((item) => {
        return currentValueTheory[item](nameSheet, i)
        // return workbook.sheet(nameSheet).cell(`${item}${i}`).value();
      })
      // console.log(currentAccountInMatch, item, arrCurrentValueTheory);

      let currentTotalTheory = '';
      if (arrCurrentValueTheory.every((value) => value >= 3)) {
        currentTotalTheory = 3;
      } else if (arrCurrentValueTheory.every((value) => value <= 2)) {
        currentTotalTheory = 2;
      } else currentTotalTheory = undefined;
      // console.log(`currentTotalTheory= ${currentTotalTheory} ${currentTotalTheory >= 3}`);

      if ((currentAccountInMatch >= 3) && (currentTotalTheory >= 3)) {
        // console.log('currentAccountInMatch >= 3) && (currentTotalTheory >= 3');
        total++;
        totalWin++;
        counters.push(1);
      } else if ((currentAccountInMatch <= 2) && (currentTotalTheory <= 2)) {
        // console.log('currentAccountInMatch <= 2) && (currentTotalTheory <= 2');
        total++;
        totalWin++;
        counters.push(1);
      } else if ((currentAccountInMatch >= 3) && (currentTotalTheory <= 2)) {
        // console.log('currentAccountInMatch >= 3) && (currentTotalTheory <= 2');
        total++;
        totalLose++;
        counters.push(-1);
      } else if ((currentAccountInMatch <= 2) && (currentTotalTheory >= 3)) {
        // console.log('currentAccountInMatch <= 2) && (currentTotalTheory >= 3');
        total++;
        totalLose++;
        counters.push(-1);
      }
      // console.log(total, totalWin, totalLose, currentTotalTheory);
    }
    return {
      theory: item,
      total,
      totalWin,
      totalLose,
      counters,
    }
  });

  Data.sort((i1, i2) => {
    return ((Math.ceil(i2.totalWin / i2.total * 100)) - (Math.ceil(i1.totalWin / i1.total * 100)))
  })

  console.log(Data);
  
  fs.writeFileSync(allTheoryTotalJSON, JSON.stringify(Data));
  return Data
};

async function matchAnalysisByTheories([begin, end], [CurrentSheetText, NewSheetText]) {
  const nameSheet = CurrentSheetText || '2021_transformed';
  const nameSheetNew = NewSheetText || '2021_theorys';
  console.log(`nameSheet: ${nameSheet} nameSheetNew: ${nameSheetNew}`);
  const workbook = await XlsxPopulate.fromFileAsync(DBAfterExcelParsing);

  for (let i = begin; i <= end; i++) {
    const A = workbook.sheet(nameSheet).cell(`A${i}`).value();
    if (A) workbook.sheet(nameSheetNew).cell(`A${i}`).value(A);
  }

  await workbook.toFileAsync(DBAfterExcelParsing);
  return 'Done'
}

const allTheoryWin = JSON.parse(fs.readFileSync(allTheoryWinJSON, 'utf8'));
const allTheoryTotal = JSON.parse(fs.readFileSync(allTheoryTotalJSON, 'utf8'));

module.exports.searchAllTheoryOnWin = searchAllTheoryOnWin;
module.exports.searchAllTheoryTotal = searchAllTheoryTotal;
module.exports.allTheoryWin = allTheoryWin;
module.exports.allTheoryTotal = allTheoryTotal;
