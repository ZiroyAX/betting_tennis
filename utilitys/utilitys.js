function sortDataToArr(data = {}) {
  const newData = {};
  for (let key in data) {
    newData[key] = data[key].split('\n')
  }
  console.log(newData);
  return newData
}

function sortDataToSplitOnSubarr(arr = [], step = 6) {
  const result = [];
  for (let i = 0; i < arr.length; i += step) {
    const tempArr6 = [];
    for (let j = 0; j < step; j++) {
      if (!!arr[i+j]) {
        tempArr6.push(arr[i + j])
      }
    }
    tempArr6.length != 0 ? result.push(tempArr6) : null;
  }
  return result
}

function sortDataFromAccurateScoreAndWL(arr = []) {
  return arr.filter((item) => {
      return item.includes(':', 0) || item.includes('.', 0);
    })
}

function addOnPageBL(obj = {}) {
  const {Sets, Games} = obj;
  const div = document.createElement('div');
  
  div.style.display = 'grid';
  div.style.gridTemplateColumns = '100px 60px 60px';
  div.style.width = '220px';
  div.style.backgroundColor = 'black';
  div.style.gap = '1px';
  
  const p_1 = document.createElement('p');
  const p_2 = document.createElement('p');
  const p_3 = document.createElement('p');

  p_1.innerText = 'Тотал';
  p_2.innerText = 'Больше';
  p_3.innerText = 'Меньше';

  div.append(p_1);
  div.append(p_2);
  div.append(p_3);

  for (let key in Sets) {
    if ( Sets[key].More.length === Sets[key].Less.length ) {
      for (let i = 0; i < Sets[key].More.length; i++) {
        const p_1 = document.createElement('p');
        const p_2 = document.createElement('p');
        const p_3 = document.createElement('p');
  
        p_1.innerText = key;
        p_2.innerText = Sets[key].More[i];
        p_3.innerText = Sets[key].Less[i];

        div.append(p_1);
        div.append(p_2);
        div.append(p_3);
      }
    }
  }
  for (const key in Games) {
    if ( Games[key].More.length === Games[key].Less.length ) {
      for (let i = 0; i < Games[key].More.length; i++) {
        const p_1 = document.createElement('p');
        const p_2 = document.createElement('p');
        const p_3 = document.createElement('p');
  
        p_1.innerText = key;
        p_2.innerText = Games[key].More[i];
        p_3.innerText = Games[key].Less[i];

        div.append(p_1);
        div.append(p_2);
        div.append(p_3);
      }
    }
  }
  return div
}

function sortDataFromBL(arr = []) {
  const template = {
    Bookmaker: '-',
    Sets: {'3.5': {More: [], Less: []}, '4.5': {More: [], Less: []}},
    Games: {'31.5': {More: [], Less: []}, '32.5': {More: [], Less: []}},
  }

  const mainResult = {Sets: {}, Games: {}};
  const newArr = [];
  let newSubarr = [];

  for (let i = 0; i < arr.length; i++){
      if ((i + 1) === arr.length) {
        newArr.push(newSubarr);
        break;
      }
      if (arr[i] === '') continue;
      if (arr[i] === 'Букмекер'){
      if (i === 0) {
        newSubarr.push(arr[i]);
        continue;
      };
      newArr.push(newSubarr);
      newSubarr = [];
    }

    newSubarr.push(arr[i]);
  }

  newArr.map((item) => {
    if (item[1] === 'Сеты') {
      let Key = [], More = [], Less = [];
      for (let i = 4; i < item.length; i += 3) {
        Key.push('Сет\t' + item[i]);
        More.push(item[i + 1]);
        Less.push(item[i + 2]);
      }
      Key = [...new Set(Key)];
      if (Key.length === 1) {
        mainResult.Sets[Key[0]] = {More, Less};
      }
    }
    if (item[1] === 'Геймы') {
      let Key = [], More = [], Less = [];
      for (let i = 4; i < item.length; i += 3) {
        Key.push('Гейм\t' + item[i]);
        More.push(item[i + 1]);
        Less.push(item[i + 2]);
      }
      Key = [...new Set(Key)];
      if (Key.length === 1) {
        mainResult.Games[Key[0]] = {More, Less};
      }
    }
  })
  return mainResult
}

function addForPage(data = [], title = []) {
  const div = document.createElement('div');
  
  div.style.display = 'grid';
  div.style.backgroundColor = 'black';
  div.style.gap = '1px';

  title.forEach((item) => {
    const p = document.createElement('p');
    p.innerText = item;
    div.append(p);
  })
  data.forEach((item) => {
    switch (item.length) {
      case 2:
        div.style.gridTemplateColumns = '50px 100px';
        div.style.width = '150px';
        break;
      case 3:
        div.style.gridTemplateColumns = '50px 50px 50px';
        div.style.width = '150px';
        break;
      case 5:
        div.style.gridTemplateColumns = '80px 50px 1fr 1fr 50px';
        div.style.width = '400px';
        break;
      case 8:
        div.style.gridTemplateColumns = '100px '.repeat(data.length);
        break;
      default:
        div.style.gridTemplateColumns = '80px 50px 1fr 1fr 50px 20px';
        div.style.width = '500px';
        break;
    }
    item.forEach((item) => {
      const p = document.createElement('p');
      // p.style.backgroundColor = 'white';
      p.innerText = item;
      div.append(p);
    });
  })
  return div
}

function clearDataInDom(...args) {
  args.forEach((item) => {
    item.innerText = '';
  })
}

function currentBtn(currentButton, ...args) {
  currentButton.style.backgroundColor = 'green';
  args.forEach((item) => {
    item.style.backgroundColor = '';
  })
}

module.exports.sortDataToArr = sortDataToArr;
module.exports.sortDataToSplitOnSubarr = sortDataToSplitOnSubarr;
module.exports.addForPage = addForPage;
module.exports.clearDataInDom = clearDataInDom;
module.exports.currentBtn = currentBtn;
module.exports.sortDataFromBL = sortDataFromBL;
module.exports.addOnPageBL = addOnPageBL;
module.exports.sortDataFromAccurateScoreAndWL = sortDataFromAccurateScoreAndWL;
