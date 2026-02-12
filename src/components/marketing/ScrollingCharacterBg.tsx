import { useEffect, useRef } from "react";
import peopleFamily from "@/assets/people-family.png";
import peopleYoga from "@/assets/people-yoga.png";
import peopleHiker from "@/assets/people-hiker.png";
import peopleCafe from "@/assets/people-cafe.png";

const characters = [peopleFamily, peopleYoga, peopleHiker, peopleCafe];

const ScrollingCharacterBg = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    let direction = 1;
    const speed = 0.3;
    let raf: number;

    const animate = () => {
      pos += speed * direction;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (pos >= maxScroll) direction = -1;
      if (pos <= 0) direction = 1;
      el.scrollTop = pos;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[hsl(var(--primary)/0.15)] via-[hsl(var(--primary)/0.08)] to-transparent" />
      <div
        ref={scrollRef}
        className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="flex flex-wrap justify-around items-start gap-6 p-8 opacity-[0.12]" style={{ minHeight: '200%' }}>
          {[...characters, ...characters, ...characters].map((src, i) => (
            <img key={i} src={src} alt="" className="w-[200px] md:w-[260px] object-contain" />
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollingCharacterBg;
