const sleep = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
      console.log(`${ms} ms elapsed.`);
    }, ms);
  });
};

// without default export
// sleep(1500);

// with default export
export default sleep(1500);
