import * as ml5 from "ml5";

export function getTagsFromImage(image): Promise<string[]> {
  const classifier = ml5.imageClassifier("MobileNet");

  return new Promise((resolve) => {
    classifier.classify(image, (results: Array<{ label: string }>) => {
      resolve([...new Set(
        results.flatMap(r => r.label.split(/\W+/)).map(t => t.trim().toLowerCase()).filter(t => t.length > 2)
      )]);
    });
  });
}