"use client";

export default function Benefits() {
  const Item = ({
    icon,
    title,
    desc,
  }: {
    icon: string;
    title: string;
    desc: string;
  }) => (
    <div className="flex items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
      <i className={`${icon} text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white`}></i>
      <div className="flex flex-col">
        <h2 className="font-semibold Unbounded">{title}</h2>
        <p className="text-gray-700">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="px-[8%] lg:px-[12%] py-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Item
          icon="bi bi-egg-fried"
          title="Recetas auténticas"
          desc="Platillos mexicanos con ingredientes y pasos claros."
        />
        <Item
          icon="bi bi-funnel"
          title="Filtros dietarios"
          desc="Vegana, Vegetariana, Sin gluten, Sin lácteos y más."
        />
        <Item
          icon="bi bi-list-check"
          title="Paso a paso"
          desc="Instrucciones sencillas y ordenadas para cocinar sin estrés."
        />
        <Item
          icon="bi bi-robot"
          title="SaborBot 24/7"
          desc="Resuelve dudas y recibe tips al instante."
        />
      </div>
    </div>
  );
}
