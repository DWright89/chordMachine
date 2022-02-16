import React, { useRef, useEffect } from "react";
import VexFlow from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF;

const clefAndTimeWidth = 60;

export function Score({
    staves = [],
    clef = "treble",
    timeSignature = "4/4",
    keySignature = null,
    width = 450,
    height = 150
}) 


{
    const container = useRef();
    const rendererRef = useRef();


//use callback???


    useEffect(() => {
        console.log('renderer 1:', renderer)
        if (rendererRef.current == null) {
            rendererRef.current = new Renderer(
                container.current,
                Renderer.Backends.SVG
            );
        }
        console.log('renderer 2:', renderer)
        const renderer = rendererRef.current;
        console.log('renderer 3:', renderer)
        renderer.resize(width, height);
        const context = renderer.getContext();
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        const staveWidth = (width - clefAndTimeWidth) / staves.length;
        //debugger
        let currX = 0;
        staves.forEach((notes, i) => {
            const stave = new Stave(currX, 0, staveWidth);
            if (i === 0) {
                stave.setWidth(staveWidth + clefAndTimeWidth);
                stave.addClef(clef).addTimeSignature(timeSignature);
                if (keySignature) {
                    stave.addKeySignature(keySignature);
                }
            }
            //debugger
            currX += stave.getWidth();
            stave.setContext(context).draw();
            //debugger
            const processedNotes = notes
                .map((note) => (typeof note === "string" ? { key: note } : note))
                .map((note) =>
                    Array.isArray(note) ? { key: note[0], duration: note[1] } : note
                )
                .map(({ key, ...rest }) =>
                    typeof key === "string"
                        ? {
                            key: key.includes("/") ? key : `${key[0]}/${key.slice(1)}`,
                            ...rest
                        }
                        : rest
                )
                .map(
                    ({ key, keys, duration = "q" }) =>
                        new StaveNote({
                            keys: key ? [key] : keys,
                            duration: String(duration)
                        })
                );
                //debugger
            Formatter.FormatAndDraw(context, stave, processedNotes, {
                auto_beam: true
            });
        });
    }, [staves]);
    //debugger
    return <div id="svgContainer" ref={container} />;
}
