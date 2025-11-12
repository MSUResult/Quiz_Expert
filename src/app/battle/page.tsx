import BattlePage from "@/components/(Battle)/Battle";

export function generateMetadata() {
  return {
    title: "Battle with other students",
    description:
      "Take a battle with your friend and  other student so that you know who is best",

      keywords:["Playe a quiz game with friend"]
  };
}

export default function Battle() {
  return (
    <>
      <BattlePage />
    </>
  );
}
