interface Props {
  name: string;
  ads: string;
  bannerUrl: string;
}

export function GameCard({ ads, name, bannerUrl }: Props) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{name}</strong>
        <span className="text-zinc-300 text-small block">{ads} anuncios</span>
      </div>
    </a>
  );
}
