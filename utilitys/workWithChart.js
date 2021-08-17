const path = require('path');
const fs = require("fs");
const bestTheoryWinJSON = path.join(__dirname, '../excelDocuments/bestTheoryWin.json');
const bestTheoryTotalJSON = path.join(__dirname, '../excelDocuments/bestTheoryTotal.json');
const Chart = require('chart.js');
const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
// const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function labels(Length) {
  const numbers = [];
  for (let i = 0; i < Length; i++){
    numbers.push(i);
  }
  return numbers
}

async function addChart(datas, info) {
  const currentTheory = await datas;
  const transformTheory = currentTheory.map((item) => {
    item.counters = transformedLines(item.counters)
    return item
  });
  console.dir(transformTheory);
  const filterTheory = transformTheory.filter((item) => {
    const dataArr = item.counters;
    let x = 0, yHorizon = 0, yPrev = 0, z = 0;
    if ((item.total >= 100) && (Math.ceil(item.totalWin / item.total * 100) > 65)) {
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i] > x) {
          x = dataArr[i];
          yHorizon = 0;
          yPrev = 0;
          z = 0;
        } else if (dataArr[i] === x) {
          yHorizon = 0;
          yPrev = 0;
          z += 1;
        } else if (dataArr[i] < x) {
          yHorizon += 1;
          yPrev = x;
        }
        // console.log(`${item.theory} current= ${dataArr[i]} x= ${x} yPrev= ${yPrev} yHorizon= ${yHorizon}`);
        if (((yPrev - dataArr[i]) > 4) || yHorizon > 8 || z > 5) {
          return false
        }
      }
    } else return false
    return true
  })
  console.dir(filterTheory);

  function transformedLines(item) {
    const transformedLines = [];
    item.reduce((sum, currentItem) => {
      const res = sum + currentItem;
      transformedLines.push(res);
      return res;
    }, 0)
    return transformedLines
  }

  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        // labels: labels(filterTheory[0].total),
        labels: labels(400),
        datasets: filterTheory.map((item) => {
          const tempNumb_1 = randomInteger(0, 255);
          const tempNumb_2 = randomInteger(0, 255);
          const tempNumb_3 = randomInteger(0, 255);
          return {
            label: item.theory.join(' '),
            data: item.counters,
            backgroundColor: [
              `rgba(${tempNumb_1}, ${tempNumb_2}, ${tempNumb_3}, 0.2)`,
            ],
            borderColor: [
              `rgba(${tempNumb_1}, ${tempNumb_2}, ${tempNumb_3}, 1)`,
            ],
            borderWidth: 1
          }
        }),
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: false,
    }
  });








  const filterTheory2 = transformTheory.filter((item) => {
    const dataArr = item.counters;
    let x = 0, yHorizon = 0, yPrev = 0, z = 0;
    if ((item.total >= 35) && (Math.ceil(item.totalWin / item.total * 100) > 76)) {
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i] > x) {
          x = dataArr[i];
          yHorizon = 0;
          yPrev = 0;
          z = 0;
        } else if (dataArr[i] === x) {
          yHorizon = 0;
          yPrev = 0;
          z += 1;
        } else if (dataArr[i] < x) {
          yHorizon += 1;
          yPrev = x;
        }
        // console.log(`${item.theory} current= ${dataArr[i]} x= ${x} yPrev= ${yPrev} yHorizon= ${yHorizon}`);
        if (((yPrev - dataArr[i]) > 4) || yHorizon > 8 || z > 2) {
          return false
        }
      }
    } else return false
    return true
  })
  console.dir(filterTheory2)
  const myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        // labels: labels(filterTheory[0].total),
        labels: labels(250),
        datasets: filterTheory2.map((item) => {
          const tempNumb_1 = randomInteger(0, 255);
          const tempNumb_2 = randomInteger(0, 255);
          const tempNumb_3 = randomInteger(0, 255);
          return {
            label: item.theory.join(' '),
            data: item.counters,
            backgroundColor: [
              `rgba(${tempNumb_1}, ${tempNumb_2}, ${tempNumb_3}, 0.2)`,
            ],
            borderColor: [
              `rgba(${tempNumb_1}, ${tempNumb_2}, ${tempNumb_3}, 1)`,
            ],
            borderWidth: 1
          }
        }),
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: false,
    }
  });

  if (info === 'Win') fs.writeFileSync(bestTheoryWinJSON, JSON.stringify([...filterTheory, ...filterTheory2]));
  if (info === 'Total') fs.writeFileSync(bestTheoryTotalJSON, JSON.stringify([...filterTheory, ...filterTheory2]));

  return "Done"
}
module.exports.addChart2 = addChart;