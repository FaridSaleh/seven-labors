async function foo() {
  setTimeout(() => {
    return "done";
  }, 1000);
}

foo().then((res) => console.log(res));
