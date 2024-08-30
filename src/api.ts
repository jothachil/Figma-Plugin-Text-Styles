import { createPluginAPI, createUIAPI } from "figma-jsonrpc";
import { LP_VARIABLES } from "./variables";
export const pluginApi = createPluginAPI({
  exit() {
    figma.closePlugin();
  },
  notify(message: string) {
    figma.notify(message);
  },
  getColorsFromSelection() {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      return { error: "No frame selected" };
    }

    const frame = selection[0];
    if (frame.type !== "FRAME") {
      return { error: "Selected item is not a frame" };
    }

    const colors = new Set<{
      hex: string;
      variableName: string | null;
      type: string;
    }>();

    function traverseNode(node) {
      if ("fills" in node) {
        node.fills.forEach((fill) => {
          if (fill.type === "SOLID") {
            addColor(fill.color, fill.boundVariables?.color, "fill");
          }
        });
      }
      if ("strokes" in node) {
        node.strokes.forEach((stroke) => {
          if (stroke.type === "SOLID") {
            addColor(stroke.color, stroke.boundVariables?.color, "stroke");
          }
        });
      }
      if ("children" in node) {
        node.children.forEach(traverseNode);
      }
    }

    function addColor(color, boundVariable, type) {
      const { r, g, b } = color;
      const hexColor = rgbToHex(r, g, b);
      let variableName = null;

      if (boundVariable) {
        const variableId = boundVariable.id;
        const variable = LP_VARIABLES.find((v) => v.id === variableId);
        if (variable) {
          variableName = variable.name;
        }
      }

      colors.add({ hex: hexColor, variableName, type });
    }

    traverseNode(frame);
    console.log(Array.from(colors));
    return { colors: Array.from(colors) };
  },
  selectElementsByColor(hex: string) {
    const selection = [];

    function traverseNode(node) {
      if ("fills" in node) {
        node.fills.forEach((fill) => {
          if (
            fill.type === "SOLID" &&
            rgbToHex(fill.color.r, fill.color.g, fill.color.b) === hex
          ) {
            selection.push(node);
          }
        });
      }
      if ("strokes" in node) {
        node.strokes.forEach((stroke) => {
          if (
            stroke.type === "SOLID" &&
            rgbToHex(stroke.color.r, stroke.color.g, stroke.color.b) === hex
          ) {
            selection.push(node);
          }
        });
      }
      if ("children" in node) {
        node.children.forEach(traverseNode);
      }
    }

    traverseNode(figma.currentPage);
    figma.currentPage.selection = selection;
    figma.viewport.scrollAndZoomIntoView(selection);

    return {
      message: `Selected ${selection.length} elements with color ${hex}`,
    };
  },
});

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

let eventCallback = {
  selectionChanged: (selection) => {},
  pageChanged: (page) => {},
};

export const setEventCallback = (name: string, callback: Function) => {
  eventCallback[name] = callback;
};

export const uiApi = createUIAPI({
  selectionChanged(selection) {
    eventCallback.selectionChanged(selection);
  },
  pageChanged(page) {
    eventCallback.pageChanged(page);
  },
});
