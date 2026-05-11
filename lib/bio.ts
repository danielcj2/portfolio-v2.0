export type BioRowCellType = "number" | "text" | "heading";

export type BioRow = Array<{
  type: BioRowCellType;
  content: string;
}>;

export const experience: BioRow[] = [
  [
    { type: "number", content: "2024—2025" },
    { type: "text", content: "UI/UX Designer & Frontend Developer" },
    { type: "heading", content: "quickQR" },
  ],
  [
    { type: "number", content: "2024" },
    { type: "text", content: "Frontend Developer" },
    { type: "heading", content: "Bluewave Labs" },
  ],
  [
    { type: "number", content: "2023" },
    { type: "text", content: "Frontend Developer" },
    { type: "heading", content: "Professional development" },
  ],
];

export const education: BioRow[] = [
  [
    { type: "number", content: "2018—2022" },
    {
      type: "text",
      content: "Bachelors (Honours) in Computer Science",
    },
    { type: "heading", content: "Trent University" },
  ],
];

export const services: BioRow[] = [
  [
    { type: "number", content: "01" },
    { type: "heading", content: "Web Development" },
    {
      type: "text",
      content:
        "Building React apps from the ground up—focused on performance, structure, and getting the details right.",
    },
  ],
  [
    { type: "number", content: "02" },
    { type: "heading", content: "Web Design" },
    {
      type: "text",
      content:
        "Designing clean, modern interfaces that feel good to use without overcomplicating things.",
    },
  ],
  [
    { type: "number", content: "03" },
    { type: "heading", content: "UI/UX" },
    {
      type: "text",
      content:
        "Designing interfaces that are clear, consistent, and easy to navigate.",
    },
  ],
  [
    { type: "number", content: "04" },
    { type: "heading", content: "Motion & Interaction" },
    {
      type: "text",
      content:
        "Adding subtle motion and feedback that make the interface feel smoother, guide attention, and improve usability.",
    },
  ],
  [
    { type: "number", content: "05" },
    { type: "heading", content: "API Integration" },
    {
      type: "text",
      content:
        "Connecting frontends to APIs—handling data, edge cases, and loading states.",
    },
  ],
];

export const techstack = ["UI", "Data", "Workflow"] as const;
