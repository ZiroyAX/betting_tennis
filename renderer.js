const pars = require('./nightmare');
const { objMatches } = require('./testing');
const { 
        sortDataToArr, 
        sortDataToSplitOnSubarr, 
        addForPage,
        clearDataInDom, 
        currentBtn,
        sortDataFromBL,
        addOnPageBL,
        sortDataFromAccurateScoreAndWL,
} = require('./utilitys/utilitys');
const { 
        exportToDBFull, 
        exportToProTennis, 
        exportToTenUltimate, 
        exportToTool, 
        exportToP,
        exportToP_original,
        openSecondaryExcel,
        openMainExcel,
        transformationUnderTheory,
      } = require('./utilitys/workWithXlsx');
const { 
        searchAllTheoryOnWin, 
        searchAllTheoryTotal, 
        allTheoryWin, 
        allTheoryTotal, 
      } = require('./utilitys/workWithTheorys');
const { addChart2 } = require('./utilitys/workWithChart');

let url = '';
let dataAll = false;
let transformInputBeginNum = 0, transformInputEndNum = 0;
let transformInputCurrentSheetText = '', transformInputNewSheetText = '';
let inputUpdateTheorysTotalBeginNum = 0, inputUpdateTheorysTotalEndNum = 0;
let inputUpdateTheorysWinBeginNum = 0, inputUpdateTheorysWinEndNum = 0;
const urlForPars = document.getElementById('urlForPars')
const btnParsing = document.getElementById('btnParsing');
const btnSaveToDBFullExcel = document.getElementById('btnSaveToDBFullExcel');
const btnOpenSecondaryExcel = document.getElementById('btnOpenSecondaryExcel');
const btnOpenMainExcel = document.getElementById('btnOpenMainExcel');
const transformInputBegin = document.getElementById('transformInputBegin');
const transformInputEnd = document.getElementById('transformInputEnd');
const transformInputCurrentSheet = document.getElementById('transformInputCurrentSheet');
const transformInputNewSheet = document.getElementById('transformInputNewSheet');
const btnTransformationUnderTheory = document.getElementById('btnTransformationUnderTheory');
const inputUpdateTheorysTotalBegin = document.getElementById('inputUpdateTheorysTotalBegin');
const inputUpdateTheorysTotalEnd = document.getElementById('inputUpdateTheorysTotalEnd');
const btnUpdateTheorysTotal = document.getElementById('btnUpdateTheorysTotal');
const inputUpdateTheorysWinBegin = document.getElementById('inputUpdateTheorysWinBegin');
const inputUpdateTheorysWinEnd = document.getElementById('inputUpdateTheorysWinEnd');
const btnUpdateTheorysWin = document.getElementById('btnUpdateTheorysWin');
const btnOpenChartTotal = document.getElementById('btnOpenChartTotal');
const btnOpenChartWin = document.getElementById('btnOpenChartWin');

const btnMain = document.getElementById('btnMain');
const btnGround = document.getElementById('btnGround');
const btnGrass = document.getElementById('btnGrass');
const btnHard = document.getElementById('btnHard');
const btnWL = document.getElementById('btnWL');
const btnBL = document.getElementById('btnBL');
const btnAccurateScore = document.getElementById('btnAccurateScore');

const btnMatchesGroundOne = document.getElementById('btnMatchesGroundOne');
const btnMatchesGroundTwo = document.getElementById('btnMatchesGroundTwo');
const btnMatchesGroundJoint = document.getElementById('btnMatchesGroundJoint');

const btnMatchesGrassOne = document.getElementById('btnMatchesGrassOne');
const btnMatchesGrassTwo = document.getElementById('btnMatchesGrassTwo');
const btnMatchesGrassJoint = document.getElementById('btnMatchesGrassJoint');

const btnMatchesHardOne = document.getElementById('btnMatchesHardOne');
const btnMatchesHardTwo = document.getElementById('btnMatchesHardTwo');
const btnMatchesHardJoint = document.getElementById('btnMatchesHardJoint');

const currentContentGround = document.getElementById('currentContentGround');
const currentContentGrass = document.getElementById('currentContentGrass');
const currentContentHard = document.getElementById('currentContentHard');

const matchesGround = document.getElementById('matchesGround');
const matchesGrass = document.getElementById('matchesGrass');
const matchesHard = document.getElementById('matchesHard');
const ratioWL = document.getElementById('ratioWL');
const ratioBL = document.getElementById('ratioBL');
const ratioAccurateScore = document.getElementById('ratioAccurateScore');

const isBtnPlayers = {
  _isHiddenGround: true,
  _isHiddenGrass: true,
  _isHiddenHard: true,

  get isHiddenGround() {
    return this._isHiddenGround;
  },
  set isHiddenGround(value) {
    if (value) {
      matchesGround.classList.add('isHidden');
    } else matchesGround.classList.remove('isHidden');
    this._isHiddenGround = value;
  },

  get isHiddenGrass() {
    return this._isHiddenGrass;
  },
  set isHiddenGrass(value) {
    if (value) {
      matchesGrass.classList.add('isHidden');
    } else matchesGrass.classList.remove('isHidden');
    this._isHiddenGrass = value;
  },

  get isHiddenHard() {
    return this._isHiddenHard;
  },
  set isHiddenHard(value) {
    if (value) {
      matchesHard.classList.add('isHidden');
    } else matchesHard.classList.remove('isHidden');
    this._isHiddenHard = value;
  },
}


async function addToScreen(url) {
  const content = await pars.mainParsing(url);
  // const content = objMatches;

  const dataMatches = sortDataToArr(content);

  const mainInfo = dataMatches.mainInfo.filter(Boolean);
  const tournament = dataMatches.tournament;

  const matchesPlayerOneGround = sortDataToSplitOnSubarr(dataMatches.playerOneGround);
  const matchesPlayerTwoGround = sortDataToSplitOnSubarr(dataMatches.playerTwoGround);
  const matchesPlayerJointGround = sortDataToSplitOnSubarr(dataMatches.playerJointGround, 5);

  const matchesPlayerOneGrass = sortDataToSplitOnSubarr(dataMatches.playerOneGrass);
  const matchesPlayerTwoGrass = sortDataToSplitOnSubarr(dataMatches.playerTwoGrass);
  const matchesPlayerJointGrass = sortDataToSplitOnSubarr(dataMatches.playerJointGrass, 5);

  const matchesPlayerOneHard = sortDataToSplitOnSubarr(dataMatches.playerOneHard);
  const matchesPlayerTwoHard = sortDataToSplitOnSubarr(dataMatches.playerTwoHard);
  const matchesPlayerJointHard = sortDataToSplitOnSubarr(dataMatches.playerJointHard, 5);


  const matchesRatioWL = sortDataToSplitOnSubarr(sortDataFromAccurateScoreAndWL(dataMatches.bookmakerRatioWL), 2);
  const matchesRatioBL = sortDataFromBL(dataMatches.bookmakerRatioBL);
  const matchesRatioAccurateScore = sortDataToSplitOnSubarr(sortDataFromAccurateScoreAndWL(dataMatches.bookmakerRatioAccurateScore), 2);
  
  return { 
           url,
           mainInfo,
           tournament,
           matchesPlayerOneGround, 
           matchesPlayerTwoGround, 
           matchesPlayerJointGround,
           matchesPlayerOneGrass,
           matchesPlayerTwoGrass,
           matchesPlayerJointGrass,
           matchesPlayerOneHard,
           matchesPlayerTwoHard,
           matchesPlayerJointHard,
           matchesRatioWL, 
           matchesRatioBL, 
           matchesRatioAccurateScore,
  }
}

urlForPars.onchange = () => {
  url = urlForPars.value;
}

urlForPars.addEventListener('keyup', () => {
  url = urlForPars.value;
})

btnParsing.addEventListener('click', async () => {
  dataAll = await addToScreen(url);
  console.log('dataAll\n', dataAll);
});

btnOpenSecondaryExcel.addEventListener('click', () => {
  openSecondaryExcel();
});

btnOpenMainExcel.addEventListener('click', () => {
  openMainExcel();
});

transformInputBegin.addEventListener('keyup', () => {
  transformInputBeginNum = +transformInputBegin.value;
})

transformInputEnd.addEventListener('keyup', () => {
  transformInputEndNum = +transformInputEnd.value;
})

transformInputCurrentSheet.addEventListener('keyup', () => {
  transformInputCurrentSheetText = transformInputCurrentSheet.value;
})

transformInputNewSheet.addEventListener('keyup', () => {
  transformInputNewSheetText = transformInputNewSheet.value;
})

btnTransformationUnderTheory.addEventListener('click', async () => {
  const res = await transformationUnderTheory([transformInputBeginNum, transformInputEndNum], [transformInputCurrentSheetText, transformInputNewSheetText]);
  console.log(res);
});

inputUpdateTheorysTotalBegin.addEventListener('keyup', () => {
  inputUpdateTheorysTotalBeginNum = +inputUpdateTheorysTotalBegin.value;
});

inputUpdateTheorysTotalEnd.addEventListener('keyup', () => {
  inputUpdateTheorysTotalEndNum = +inputUpdateTheorysTotalEnd.value;
});

btnUpdateTheorysTotal.addEventListener('click', () => {
  searchAllTheoryTotal([inputUpdateTheorysTotalBeginNum, inputUpdateTheorysTotalEndNum]);

  // addChart2(allTheoryWin);
  // addChart2(allTheoryTotal);

  // addChart2([{
  //   counters: [1,2,3,4,3,2,1,2,3,2,3,4,5],
  //   theory: ['t', 'est']
  // },{
  //   counters: [1,2,3,4,3,2,1,2,3,2,3,2,3,4,5],
  //   theory: ['error', '']
  // },]);
});

inputUpdateTheorysWinBegin.addEventListener('keyup', () => {
  inputUpdateTheorysWinBeginNum = +inputUpdateTheorysWinBegin.value;
});

inputUpdateTheorysWinEnd.addEventListener('keyup', () => {
  inputUpdateTheorysWinEndNum = +inputUpdateTheorysWinEnd.value;
});

btnUpdateTheorysWin.addEventListener('click', () => {
  searchAllTheoryOnWin([inputUpdateTheorysWinBeginNum, inputUpdateTheorysWinEndNum]);
});

btnOpenChartTotal.addEventListener('click', () => {
  addChart2(allTheoryTotal, 'Total');
});

btnOpenChartWin.addEventListener('click', () => {
  addChart2(allTheoryWin, 'Win');
});

btnSaveToDBFullExcel.addEventListener('click', () => {
  if (dataAll) {
    exportToDBFull(dataAll);
    if (dataAll.tournament[0].includes('трава')) {
      exportToProTennis(dataAll, 'Grass');
      exportToTenUltimate(dataAll, 'Grass');
      exportToP(dataAll, 'Grass');
      exportToP_original(dataAll, 'Grass');
      exportToTool(dataAll, 'Grass'); //Возможно лучше последним держать, из-за преобразования основного массива
    }
    if (dataAll.tournament[0].includes('грунт')) {
      exportToProTennis(dataAll, 'Ground');
      exportToTenUltimate(dataAll, 'Ground');
      exportToP(dataAll, 'Ground');
      exportToP_original(dataAll, 'Ground');
      exportToTool(dataAll, 'Ground');
    }
    if (dataAll.tournament[0].includes('хард')) {
      exportToProTennis(dataAll, 'Hard');
      exportToTenUltimate(dataAll, 'Hard');
      exportToP(dataAll, 'Hard');
      exportToP_original(dataAll, 'Hard');
      exportToTool(dataAll, 'Hard');
    }
  }
})

btnMain.addEventListener('click', () => {
  clearDataInDom (
    ratioWL,
    ratioBL,
    ratioAccurateScore
  );
  isBtnPlayers.isHiddenGround = true;
  isBtnPlayers.isHiddenGrass = true;
  isBtnPlayers.isHiddenHard = true;
  currentBtn (
    btnMain,
    btnGround,
    btnGrass,
    btnHard,
    btnWL,
    btnBL,
    btnAccurateScore,
  )
})
btnGround.addEventListener('click', () => {
  clearDataInDom (
    ratioWL,
    ratioBL,
    ratioAccurateScore
  );  

  isBtnPlayers.isHiddenGround = false;
  isBtnPlayers.isHiddenGrass = true;
  isBtnPlayers.isHiddenHard = true;
  // matchesGround.append(addForPage(dataAll.matchesPlayerOneGround))
  currentBtn (
    btnGround,
    btnMain,
    btnGrass,
    btnHard,
    btnWL,
    btnBL,
    btnAccurateScore,
  )
})

btnGrass.addEventListener('click', () => {
  clearDataInDom (
    ratioWL,
    ratioBL,
    ratioAccurateScore
  );  

  isBtnPlayers.isHiddenGround = true;
  isBtnPlayers.isHiddenGrass = false;
  isBtnPlayers.isHiddenHard = true;
  // matchesGround.append(addForPage(dataAll.matchesPlayerOneGround))
  currentBtn (
    btnGrass,
    btnGround,
    btnMain,
    btnHard,
    btnWL,
    btnBL,
    btnAccurateScore,
  )
})

btnHard.addEventListener('click', () => {
  clearDataInDom (
    ratioWL,
    ratioBL,
    ratioAccurateScore
  );  

  isBtnPlayers.isHiddenGround = true;
  isBtnPlayers.isHiddenGrass = true;
  isBtnPlayers.isHiddenHard = false;
  // matchesGround.append(addForPage(dataAll.matchesPlayerOneGround))
  currentBtn (
    btnHard,    
    btnMain,
    btnGround,
    btnGrass,
    btnWL,
    btnBL,
    btnAccurateScore,
  )
})

btnMatchesGroundOne.addEventListener('click', () => {
  clearDataInDom (
    currentContentGround,
  );  
  currentContentGround.append(addForPage(dataAll.matchesPlayerOneGround))
  currentBtn (
    btnMatchesGroundOne,    
    btnMain,
    btnGrass,
    btnHard,
    btnWL,
    btnBL,
    btnAccurateScore,
    btnMatchesGroundTwo,
    btnMatchesGroundJoint,
  )
});
btnMatchesGroundTwo.addEventListener('click', () => {
  clearDataInDom (
    currentContentGround,
  );  
  currentContentGround.append(addForPage(dataAll.matchesPlayerTwoGround))
  currentBtn (
    btnMatchesGroundTwo,    
    btnMain,
    btnGrass,
    btnHard,
    btnWL,
    btnBL,
    btnAccurateScore,
    btnMatchesGroundOne,
    btnMatchesGroundJoint,
  )
});
btnMatchesGroundJoint.addEventListener('click', () => {
  clearDataInDom (
    currentContentGround,
  );  
  currentContentGround.append(addForPage(dataAll.matchesPlayerJointGround))
  currentBtn (
    btnMatchesGroundJoint,    
    btnMain,
    btnGrass,
    btnHard,
    btnWL,
    btnBL,
    btnAccurateScore,
    btnMatchesGroundOne,
    btnMatchesGroundTwo,
  )
});

btnMatchesGrassOne.addEventListener('click', () => {
  clearDataInDom (
    currentContentGrass,
  );  
  currentContentGrass.append(addForPage(dataAll.matchesPlayerOneGrass))
  currentBtn (
    btnMatchesGrassOne,    
    btnMain,
    btnGround,
    btnHard,
    btnWL,
    btnBL,
    btnAccurateScore,
    btnMatchesGrassTwo,
    btnMatchesGrassJoint,
  )
});
btnMatchesGrassTwo.addEventListener('click', () => {
  clearDataInDom (
    currentContentGrass,
  );  
  currentContentGrass.append(addForPage(dataAll.matchesPlayerTwoGrass))
  currentBtn (
    btnMatchesGrassTwo,    
    btnMain,
    btnGround,
    btnHard,
    btnWL,
    btnBL,
    btnAccurateScore,
    btnMatchesGrassOne,
    btnMatchesGrassJoint,
  )
});
btnMatchesGrassJoint.addEventListener('click', () => {
  clearDataInDom (
    currentContentGrass,
  );  
  currentContentGrass.append(addForPage(dataAll.matchesPlayerJointGrass))
  currentBtn (
    btnMatchesGrassJoint,    
    btnMain,
    btnGround,
    btnHard,
    btnWL,
    btnBL,
    btnAccurateScore,
    btnMatchesGrassOne,
    btnMatchesGrassTwo,
  )
});

btnMatchesHardOne.addEventListener('click', () => {
  clearDataInDom (
    currentContentHard,
  );  
  currentContentHard.append(addForPage(dataAll.matchesPlayerOneHard))
  currentBtn (
    btnMatchesHardOne,
    btnMain,
    btnGround,
    btnGrass,
    btnWL,
    btnBL,
    btnAccurateScore,
    btnMatchesHardTwo,
    btnMatchesHardJoint,
  )
});
btnMatchesHardTwo.addEventListener('click', () => {
  clearDataInDom (
    currentContentHard,
  );  
  currentContentHard.append(addForPage(dataAll.matchesPlayerTwoHard))
  currentBtn (
    btnMatchesHardTwo,
    btnMain,
    btnGround,
    btnGrass,
    btnWL,
    btnBL,
    btnAccurateScore,
    btnMatchesHardOne,
    btnMatchesHardJoint,
  )
});
btnMatchesHardJoint.addEventListener('click', () => {
  clearDataInDom (
    currentContentHard,
  );  
  currentContentHard.append(addForPage(dataAll.matchesPlayerJointHard))
  currentBtn (
    btnMatchesHardJoint,
    btnMain,
    btnGround,
    btnGrass,
    btnWL,
    btnBL,
    btnAccurateScore,
    btnMatchesHardOne,
    btnMatchesHardTwo,
  )
});

btnWL.addEventListener('click', () => {
  clearDataInDom (
    ratioWL,
    ratioBL,
    ratioAccurateScore
  );
  isBtnPlayers.isHiddenGround = true;
  isBtnPlayers.isHiddenGrass = true;
  isBtnPlayers.isHiddenHard = true;
  ratioWL.append(addForPage(dataAll.matchesRatioWL, ['П1', 'П2']));
  currentBtn (
    btnWL,    
    btnMain,
    btnGround,
    btnGrass,
    btnHard,
    btnBL,
    btnAccurateScore,
  )
})

btnBL.addEventListener('click', () => {
  clearDataInDom (
    ratioWL,
    ratioBL,
    ratioAccurateScore
  );
  isBtnPlayers.isHiddenGround = true;
  isBtnPlayers.isHiddenGrass = true;
  isBtnPlayers.isHiddenHard = true;
  ratioBL.append(addOnPageBL(dataAll.matchesRatioBL));
  currentBtn (
    btnBL,    
    btnMain,
    btnGround,
    btnGrass,
    btnHard,
    btnWL,
    btnAccurateScore,
  )
})

btnAccurateScore.addEventListener('click', () => {
  clearDataInDom (
    ratioWL,
    ratioBL,
    ratioAccurateScore
  );
  isBtnPlayers.isHiddenGround = true;
  isBtnPlayers.isHiddenGrass = true;
  isBtnPlayers.isHiddenHard = true;
  ratioAccurateScore.append(addForPage(dataAll.matchesRatioAccurateScore, ['Счёт', 'Коэфициент']));
  currentBtn (
    btnAccurateScore,    
    btnMain,
    btnGround,
    btnGrass,
    btnHard,
    btnWL,
    btnBL,
  )
})