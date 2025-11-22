export default function HeroBanner() {
  return (
    <div className="relative w-full h-96 overflow-hidden">
      <img src="/featured-donut.jpg" alt="Featured donut" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  )
}
