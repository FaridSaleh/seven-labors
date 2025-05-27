var name = "farid";

var obj1 = {
  name: "vahid",
  getName: function () {
    console.log(this.name);
  },
};

var obj2 = {
  name: "saeed",
  getName: obj1.getName,
};

var getName = obj1.getName;

obj1.getName();
obj2.getName();
getName();
