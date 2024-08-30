import { createPluginAPI, createUIAPI } from "figma-jsonrpc";
const LP_VARIABLES = [
  {
    id: "VariableID:5432:369",
    name: "background/primary",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:429",
    name: "background/secondary",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:430",
    name: "background/Inverse/primary",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:431",
    name: "background/Inverse/secondary",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:432",
    name: "background/brand",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:434",
    name: "background/negative",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:435",
    name: "background/postive",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:436",
    name: "background/light/brand",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:437",
    name: "background/light/negative",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:438",
    name: "background/light/postive",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:439",
    name: "background/light/warning",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:440",
    name: "background/overlay",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:442",
    name: "background/pressed/primary-button",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:443",
    name: "background/pressed/secondary-button",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:444",
    name: "border/primary",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:445",
    name: "border/selected",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:446",
    name: "border/inverse",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:447",
    name: "border/brand",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:448",
    name: "border/negative",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:450",
    name: "border/postive",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:451",
    name: "content/primary",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:452",
    name: "content/secondary",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:453",
    name: "content/tertiary",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:456",
    name: "content/inactive",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:457",
    name: "content/inverse-primary",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:459",
    name: "content/negative",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:460",
    name: "content/warning",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5432:461",
    name: "content/postive",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
  {
    id: "VariableID:5434:478",
    name: "background/warning",
    description: "",
    type: "COLOR",
    scopes: ["ALL_SCOPES"],
    hiddenFromPublishing: false,
    codeSyntax: {},
  },
];
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
