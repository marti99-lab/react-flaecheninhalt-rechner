import { useState } from "react";
import "./styles.css";

function App() {
    const [shape, setShape] = useState("");
    const [dimensions, setDimensions] = useState({ a: "", b: "", c: "" });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        setDimensions({ ...dimensions, [e.target.name]: e.target.value });
    };

    const calculateResult = () => {
        const a = parseFloat(dimensions.a);
        const b = parseFloat(dimensions.b);
        const c = parseFloat(dimensions.c);

        if (isNaN(a) || a <= 0 || (["rectangle", "cuboid", "triangle", "pyramid"].includes(shape) && (isNaN(b) || b <= 0)) ||
            (["cuboid", "pyramid"].includes(shape) && (isNaN(c) || c <= 0))) {
            setResult("Bitte gültige Werte eingeben! (Nur positive Zahlen)");
            return;
        }

        let calculation = 0;
        let unit = "";

        switch (shape) {
            case "Rechteck":
                calculation = a * b;
                unit = "cm²";
                break;
            case "Quader":
                calculation = a * b * c;
                unit = "cm³";
                break;
            case "Dreieck":
                calculation = (a * b) / 2;
                unit = "cm²";
                break;
            case "Pyramide":
                calculation = (a * b * c) / 3;
                unit = "cm³";
                break;
            default:
                calculation = 0;
        }

        setResult(`${calculation.toFixed(2)} ${unit}`);
    };



    return (
        <div className="container">
            <h1>Flächeninhalt & Volumen Rechner</h1>
            <label htmlFor="shape">Wähle eine Form:</label>
            <select id="shape" value={shape} onChange={(e) => setShape(e.target.value)}>
                <option value="">-- Bitte eine Form wählen --</option>
                <option value="Rechteck">Rechteck (Flächeninhalt)</option>
                <option value="Quader">Quader (Volumen)</option>
                <option value="Dreieck">Dreieck (Flächeninhalt)</option>
                <option value="Pyramide">Pyramide (Volumen)</option>
            </select>

            {shape && (
                <div>
                    <h2>Gewählte Form: {shape}</h2>
                    {shape === "Rechteck" && (
                        <div>
                            <label>Länge (a in cm):</label>
                            <input type="number" name="a" value={dimensions.a} onChange={handleInputChange} />
                            <label>Breite (b in cm):</label>
                            <input type="number" name="b" value={dimensions.b} onChange={handleInputChange} />
                        </div>
                    )}

                    {shape === "Quader" && (
                        <div>
                            <label>Länge (a in cm):</label>
                            <input type="number" name="a" value={dimensions.a} onChange={handleInputChange} />
                            <label>Breite (b in cm):</label>
                            <input type="number" name="b" value={dimensions.b} onChange={handleInputChange} />
                            <label>Höhe (c in cm):</label>
                            <input type="number" name="c" value={dimensions.c} onChange={handleInputChange} />
                        </div>
                    )}

                    {shape === "Dreieck" && (
                        <div>
                            <label>Grundseite (a in cm):</label>
                            <input type="number" name="a" value={dimensions.a} onChange={handleInputChange} />
                            <label>Höhe (b in cm):</label>
                            <input type="number" name="b" value={dimensions.b} onChange={handleInputChange} />
                        </div>
                    )}

                    {shape === "Pyramide" && (
                        <div>
                            <label>Grundseite (a in cm):</label>
                            <input type="number" name="a" value={dimensions.a} onChange={handleInputChange} />
                            <label>Grundhöhe (b in cm):</label>
                            <input type="number" name="b" value={dimensions.b} onChange={handleInputChange} />
                            <label>Höhe (c in cm):</label>
                            <input type="number" name="c" value={dimensions.c} onChange={handleInputChange} />
                        </div>
                    )}

                    <button onClick={calculateResult}>Berechnen</button>

                    {result && (
                        <h3 className={result.includes("Bitte") ? "error" : "result"}>Ergebnis: {result}</h3>
                    )}

                </div>
            )}
        </div>
    );
}

export default App;
