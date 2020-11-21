module.exports = {
  getBarChart2D: (data) => {
    return [
      ["Element", "Density", { role: "style" }].toString(),
      ["Copper", 8.94, "#b87333"],
      ["Silver", 10.49, "silver"],
      ["Gold", 19.3, "gold"],
      ["Platinum", 21.45, "color: #e5e4e2"],
    ].toString();
  },
};
