interface DividerLineProps {
  text?: string;
}

export default function DividerLine({ text }: DividerLineProps) {
  return (
    <div className="w-full flex items-center gap-1 px-0.5">
      {text && (
        <span className="font-pokemon-pixel text-2xl whitespace-nowrap uppercase select-none">
          {text}
        </span>
      )}
      <div className="w-full flex items-center">
        <img src="/logonotext.svg" alt="" className="h-[12px] rotate-90" />
        <div className="flex-1 h-[1px] bg-border mx-[-14px]" />
        <img src="/logonotext.svg" alt="" className="h-[12px] -rotate-90" />
      </div>
    </div>
  );
}
