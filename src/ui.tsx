import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { pluginApi } from "./api";
import { Button, Label, Icon } from "react-figma-plugin-ds";
import "react-figma-plugin-ds/figma-plugin-ds.css";

interface ColorInfo {
  hex: string;
  variableName: string | null;
  type: string;
}

function App() {
  const [colors, setColors] = React.useState<ColorInfo[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const onListColors = async () => {
    try {
      const result = await pluginApi.getColorsFromSelection();
      if ("error" in result) {
        setError(result.error);
        setColors([]);
      } else {
        setColors(result.colors as ColorInfo[]);
        setError(null);
      }
    } catch (err) {
      setError("An error occurred");
      setColors([]);
    }
  };

  const onSelectColor = async (hex: string) => {
    try {
      await pluginApi.selectElementsByColor(hex);
    } catch (err) {
      setError("An error occurred while selecting elements");
    }
  };

  return (
    <main className="bg-white h-[100vh] relative ">
      {error && <Error error={error} />}
      {colors.length === 0 && (
        <Error error="No colors found in the selected frame" />
      )}
      {colors.length > 0 && (
        <div>
          <div className="bg-neutral-100 w-full py-1 px-2">
            <Label size="small" weight="medium">
              Colors in Selected Frame
            </Label>
          </div>
          <div className="w-full overflow-scroll h-[400px]">
            <div className="flex flex-col pb-16">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 px-2 py-2 pr-4 border-t border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="text-xss text-neutral-800">
                      {color.hex.toUpperCase()}
                    </div>
                    <div className="text-xss text-neutral-400">
                      {color.type}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {color.variableName ? (
                      <span className="text-green-600 text-xss flex items-center gap-1">
                        <span>✓</span>
                        {color.variableName}
                      </span>
                    ) : (
                      <span className="text-red-500 text-xss flex items-center gap-1">
                        <span className="">✗</span> No variable
                      </span>
                    )}
                    <div className="cursor-pointer">
                      <Icon
                        color="black3"
                        name="visible"
                        onClick={() => onSelectColor(color.hex)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 w-full left-0 p-2 border-t border-gray-200 bg-white">
        <Button className="w-full flex justify-center" onClick={onListColors}>
          Show all colors
        </Button>
      </div>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));

export default function Error({ error }: { error: string }) {
  return (
    <div className="flex justify-center items-start h-full p-4 bg-neutral-100 ">
      <div className="border border-gray-200 px-4 py-6 rounded-md bg-white w-full">
        <div className="text-center text-gray-500 flex  flex-col items-center gap-2">
          <svg
            width="60"
            height="20"
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
          >
            <rect
              x="0"
              y="0"
              width="20"
              height="20"
              fill="#10B981"
              rx="4"
            ></rect>
            <rect
              x="30"
              y="0"
              width="20"
              height="20"
              fill="#FFD7D9"
              rx="4"
            ></rect>
            <rect
              x="60"
              y="0"
              width="20"
              height="20"
              fill="#FA4D56"
              rx="4"
            ></rect>
          </svg>
          <div className="text-xs text-gray-500">{error}</div>
        </div>
      </div>
    </div>
  );
}
