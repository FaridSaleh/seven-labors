a();
b();
c();
d();

function a() {
  console.log("a");
}

var b = function () {
  console.log("c");
};

let c = function () {
  console.log("d");
};

const d = () => {
  console.log("b");
};
