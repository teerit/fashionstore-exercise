// @ts-nocheck
import Quiz1 from "@/components/Quiz1";
import Quiz2 from "@/components/Quiz2";
import Quiz3 from "@/components/Quiz3";
import Quiz4 from "@/components/Quiz4";

export default function Home() {
  return (
    <>
      <b>Instruction:</b> Open file <code>pages/index.jsx</code>
      {/* Uncomment the code below to start quiz */}
      <Quiz1 />
      <Quiz2 />
      <Quiz3 />
      <Quiz4 />
    </>
  );
}
