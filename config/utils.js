const sleep = async (time) =>
  new Promise((res) => setTimeout(() => res(), time));

module.exports = { sleep };
