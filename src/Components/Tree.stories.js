import { Tree } from "./Tree";

export default {
  title: "main/Tree",
};

const types = ["directory", "directory", "txt", "jpeg", "mp4"];

function generateData(depth = 0, maxWide = 1) {
  const data = [];

  for (let i = Math.ceil(Math.random() * maxWide); i > 0; i--) {
    const type = types[Math.floor(Math.random() * types.length)];
    const children =
      depth - 1 > 0 && type === "directory"
        ? generateData(depth - 1, maxWide)
        : null;
    data.push({
      name: `${type}_${i}`,
      type,
      children,
    });
  }
  return data;
}

export const tree = () => (
  <>
    <h1>tree 1</h1>
    <Tree hierarchy={generateData(3, 5)} />
    {/* <h1>tree 2</h1> */}
    {/* <Tree hierarchy={generateData(3, 5)} /> */}
  </>
);
