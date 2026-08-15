// 7-Ray Radial Geometry & Color-Matching Manifest

export const radialNodes = [
  // 1. Top Ray (~80° to 85° - near vertical top)
  {
    id: "node-top",
    title: "The Loop of Being",
    angleDeg: -82,
    dotColor: "#7C3AED", // Purple
    url: "https://theloopofbeing.vercel.app/",
    category: "Philosophical & Cybernetic Loops",
    distance: 510
  },
  // 2. Top-Right Ray (~35° to 40° - northeast)
  {
    id: "node-top-right",
    title: "Technosomatic Writings",
    angleDeg: -38,
    dotColor: "#0D9488", // Teal / Cyan
    url: "https://technosomatic-writings.vercel.app/",
    category: "Essays & Research Papers",
    distance: 530
  },
  // 3. Right Ray (0° - horizontal east)
  {
    id: "node-right",
    title: "Technosomatic Architecture",
    angleDeg: 0,
    dotColor: "#059669", // Emerald Green
    url: "https://technosomaticarchitecture.vercel.app/",
    category: "Spatial Infrastructure & Systems",
    distance: 520
  },
  // 4. Bottom-Right Ray (~50° - southeast)
  {
    id: "node-bottom-right",
    title: "Technosomatic — Rendered",
    angleDeg: 52,
    dotColor: "#2563EB", // Blue
    url: "https://technosomatic-rendered.vercel.app/",
    category: "Visualizations & Generative Space",
    distance: 525
  },
  // 5. Bottom Ray (~95° to 100° - near vertical bottom)
  {
    id: "node-bottom",
    title: "Technosomatic — NUDE",
    angleDeg: 98,
    dotColor: "#E11D48", // Crimson / Red
    url: "https://technosomatic-nude.vercel.app/",
    category: "Raw Biological Substrate",
    distance: 510
  },
  // 6. Bottom-Left Ray (~155° to 160° - southwest)
  {
    id: "node-bottom-left",
    title: "Holoscene",
    angleDeg: 158,
    dotColor: "#4F46E5", // Indigo / Cobalt
    url: "https://technosomatic-holoscene.vercel.app/",
    category: "Data Flow & Spatial Telemetry",
    distance: 530
  },
  // 7. Top-Left Ray (~160° to 165° - northwest)
  {
    id: "node-top-left",
    title: "Technosomatic Real",
    angleDeg: -162,
    dotColor: "#D97706", // Amber / Orange
    url: "https://technosomaticreal.vercel.app/",
    category: "Physical-Digital Convergence",
    distance: 530
  }
].map(node => {
  const rad = (node.angleDeg * Math.PI) / 180;
  const x = Math.round(Math.cos(rad) * node.distance);
  const y = Math.round(Math.sin(rad) * node.distance);
  return {
    ...node,
    color: node.dotColor,
    coords: { x, y }
  };
});

export const technosomaticNodes = radialNodes;
export default radialNodes;
