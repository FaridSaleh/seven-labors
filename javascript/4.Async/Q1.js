async function example() {
  console.log("1");
  const data = await Promise.resolve("2");
  console.log(data);
  Promise.resolve("3").then(console.log);
  console.log("4");
}

example();
