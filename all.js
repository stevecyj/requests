// 请求列表
const requestList = [];

// 为了方便查看，i从1开始计数
// for (let i = 1; i <= 100; i++) {
//   requestList.push(
//     () =>
//       new Promise(resolve => {
//         setTimeout(() => {
//           console.log('done', i);
//           resolve(i);
//         }, Math.random() * 1000);
//       }),
//   );
// }

for (let i = 1; i <= 100; i++) {
  requestList.push(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (i === 92) {
            reject(new Error('出错了，出错请求：' + i));
          } else {
            console.log('done', i);
            resolve(i);
          }
        }, Math.random() * 1000);
      }),
  );
}

const parallelRun = async max => {
  const requestSliceList = [];
  for (let i = 0; i < requestList.length; i += max) {
    requestSliceList.push(requestList.slice(i, i + max));
  }

  for (let i = 0; i < requestSliceList.length; i++) {
    const group = requestSliceList[i];
    try {
      const res = await Promise.allSettled(group.map(fn => fn()));
      console.log('接口返回值为：', res);
    } catch (error) {
      console.error(error);
    }
  }
};

parallelRun(10);