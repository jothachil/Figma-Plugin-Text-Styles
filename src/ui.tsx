import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { pluginApi } from "./api";
import { Button, Label } from "react-figma-plugin-ds";
import "react-figma-plugin-ds/figma-plugin-ds.css";

function App() {
  const [colors, setColors] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  // Predefined array of colors to match against
  const predefinedColors = [
    "#F2E6FF",
    "#ECFDF5",
    "#FFEBF0",
    "#F2E6FF",
    "#F5F5F5",
    "#EEEEEE",
    "#E5E5E5",
    "#D4D4D4",
    "#A3A3A3",
    "#737373",
    "#525252",
    "#404040",
    "#262626",
    "#171717",
    "#FFF0F4",
    "#FFD6E0",
    "#FFAFC3",
    "#FF7E9E",
    "#EE537A",
    "#DB2855",
    "#9F183A",
    "#740924",
    "#510216",
    "#2A0A12",
    "#F2E6FF",
    "#CCA2FC",
    "#A973F0",
    "#8649E3",
    "#6422D6",
    "#4400C9",
    "#3100A3",
    "#21007D",
    "#140057",
    "#0A0030",
    "#000000",
    "#FFFFFF",
    "#ECFDF5",
    "#D1FAE5",
    "#A7F3D0",
    "#6EE7B7",
    "#34D399",
    "#10B981",
    "#05A372",
    "#047555",
    "#05523C",
    "#042E23",
    "#FFF1F1",
    "#FFD7D9",
    "#FFB3B8",
    "#FF8389",
    "#FA4D56",
    "#DA1E28",
    "#A2191F",
    "#750E13",
    "#520408",
    "#2D0709",
    "#FFFBEB",
    "#FEF3C7",
    "#FDE68A",
    "#FCD34D",
    "#FBBF24",
    "#F59E0B",
    "#C46C05",
    "#8C4107",
    "#5E2909",
    "#301306",
  ];

  const onListColors = async () => {
    try {
      const result = await pluginApi.getColorsFromSelection();
      if ("error" in result) {
        setError(result.error);
        setColors([]);
      } else {
        setColors(result.colors as string[]);
        setError(null);
      }
    } catch (err) {
      setError("An error occurred");
      setColors([]);
    }
  };

  return (
    <main className="bg-white h-[100vh] relative ">
      {error && <div className="text-red-500">{error}</div>}

      {colors.length > 0 && (
        <div>
          <div className="bg-neutral-100 w-full py-1 px-2">
            <Label size="small" weight="medium">
              Colors in Selected Frame
            </Label>
          </div>
          <div className="w-full overflow-scroll h-[400px]">
            <div className="flex flex-col pb-10">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 px-2 py-2 pr-4 border-t border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md border border-gray-200"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="text-xss">{color.toUpperCase()}</div>
                  </div>
                  {predefinedColors.includes(color.toUpperCase()) ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-red-500">✗</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 w-full left-0 p-2 border-t border-gray-200 bg-white">
        <Button className="w-full flex justify-center" onClick={onListColors}>
          List Colors
        </Button>
      </div>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
