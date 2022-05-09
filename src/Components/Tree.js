import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";

export const Tree = ({ hierarchy = [] }) => (
  <TreeContextProvider>
    {hierarchy.map((item, index, list) => (
      <Node item={item} isLast={index === list.length - 1} key={item.name} />
    ))}
  </TreeContextProvider>
);

Tree.propTypes = {
  hierarchy: PropTypes.array.isRequired,
};

const Node = ({ item, path = "", prepend = [] }) => {
  const { name, children } = item;
  const { registNode, unregistNode } = useRegister();
  const { toggleSelect } = useSelect();
  const { nodePath, isSelected, isChildSelected, isParentSelected } =
    useNodeParams(item, path);

  const nextPerpend = [...prepend, <Prepend key={path} />];

  useEffect(() => {
    registNode(nodePath);

    return () => {
      unregistNode(nodePath);
    };
  }, []);

  return (
    <>
      <div title={nodePath} onClick={() => toggleSelect(nodePath)}>
        {prepend}
        {isSelected || isParentSelected ? (
          <Prepend key={path}>☑</Prepend>
        ) : isChildSelected ? (
          <Prepend key={path}>☒</Prepend>
        ) : (
          <Prepend key={path}>☐</Prepend>
        )}
        {name}
        {isSelected ? (
          <Badge style={{ background: "red", color: "white" }}>S</Badge>
        ) : null}
        {isParentSelected ? (
          <Badge style={{ background: "green", color: "white" }}>P</Badge>
        ) : null}
        {isChildSelected ? (
          <Badge style={{ background: "blue", color: "white" }}>C</Badge>
        ) : null}
      </div>
      {children?.map((item, index, list) => {
        const childeNodeKey =
          `${nodePath}${item.name}` + (item.type === "directory" ? "/" : "");
        return (
          <Node
            item={item}
            isLast={index === list.length - 1}
            path={nodePath}
            prepend={nextPerpend}
            key={childeNodeKey}
          />
        );
      })}
    </>
  );
};

Node.propTypes = {
  item: PropTypes.object.isRequired,
  isLast: PropTypes.bool,
  path: PropTypes.string,
  prepend: PropTypes.array,
};

const Prepend = styled.div`
  font-size: 20px;
  display: inline-flex;
  width: 20px;
  align-items: center;
  justify-content: center;
`;

const Badge = styled.div`
  font-size: 12px;
  display: inline-flex;
  padding: 0 10px;
  border-radius: 5px;
  margin-left: 5px;
  opacity: 0.6;
`;

const TreeContext = createContext({});

const TreeContextProvider = ({ children }) => {
  const [selected, setSelected] = useState([]);
  const [registered, setRegisterd] = useState([]);

  const toggleSelect = (path) => {
    if (selected.includes(path)) {
      setSelected(selected.filter((item) => item !== path));
    } else {
      const removeChilds = selected.filter(
        (selectedPath) => !RegExp(`^${path}.+`).test(selectedPath)
      );
      setSelected([...removeChilds, path]);
    }
  };

  const registNode = (path) => {
    setRegisterd((previousRegistered) => [...previousRegistered, path]);
  };

  const unregistNode = (path) => {
    setRegisterd((previousRegistered) =>
      previousRegistered.filter((item) => item !== path)
    );
  };

  return (
    <TreeContext.Provider
      value={{
        selected,
        toggleSelect,
        registered,
        registNode,
        unregistNode,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

const useRegister = () => {
  const { registered, registNode, unregistNode } = useContext(TreeContext);
  return { registered, registNode, unregistNode };
};

const useSelect = () => {
  const { selected, toggleSelect } = useContext(TreeContext);
  return { selected, toggleSelect };
};

const useNodeParams = (item, path) => {
  const { type, name } = item;
  const { selected } = useContext(TreeContext);

  const nodePath = `${path}${name}` + (type === "directory" ? "/" : "");
  const isSelected = selected.includes(nodePath);
  const isChildSelected = selected.some((selectedPath) => {
    return RegExp(`^${nodePath}.+`).test(selectedPath);
  });

  let selectedParent = null;
  const parentPathList = getParentPathList(path);
  const isParentSelected = selected.some((selectedPath) => {
    const result = parentPathList.includes(selectedPath);
    if (result === true) selectedParent = selectedPath;
    return result;
  });

  return {
    nodePath,
    isSelected,
    isChildSelected,
    isParentSelected,
    selectedParent,
  };
};

function getParentPathList(path) {
  const _tmpPath = path.replace(/\/$/, "");
  let _tmp = [];
  const parentPaths = [];

  if (_tmpPath) {
    _tmpPath.split("/").forEach((node) => {
      _tmp.push(node);
      parentPaths.push(_tmp.join("/") + "/");
    });
  }

  return parentPaths;
}
