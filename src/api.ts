import { createPluginAPI, createUIAPI } from "figma-jsonrpc";

export const pluginApi = createPluginAPI({
  exit() {
    figma.closePlugin();
  },
  notify(message: string) {
    figma.notify(message);
  },
  getTextStyles(frameId: string) {
    const frame = figma.getNodeById(frameId) as FrameNode;
    if (!frame || frame.type !== "FRAME") {
      return [];
    }

    const textStyles = new Set();
    const traverseNodes = (node: SceneNode) => {
      if (node.type === "TEXT") {
        const style = figma.getStyleById(node.textStyleId as string);
        if (style) {
          textStyles.add({ id: style.id, name: style.name });
        }
      }
      if ("children" in node) {
        node.children.forEach(traverseNodes);
      }
    };

    traverseNodes(frame);
    return Array.from(textStyles);
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

    const colors = new Set<string>();

    function traverseNode(node) {
      if ("fills" in node) {
        node.fills.forEach((fill) => {
          if (fill.type === "SOLID") {
            const { r, g, b } = fill.color;
            const hexColor = rgbToHex(r, g, b);
            colors.add(hexColor);
          }
        });
      }
      if ("children" in node) {
        node.children.forEach(traverseNode);
      }
    }

    traverseNode(frame);

    return { colors: Array.from(colors) };
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
