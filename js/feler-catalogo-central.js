/* FELER V47 — punto de acceso único a productos históricos y nuevos.
   Los archivos de origen se mantienen intactos para preservar los datos. */
window.FELER_CATALOGO_CENTRAL={
  antiguos:{
    ninos:window.FELER_CATALOGO_NUEVO?.ninos||[],
    belleza:window.FELER_CATALOGO_NUEVO?.belleza||[],
    aspiradoras:window.FELER_PRODUCTOS_CA||window.PRODUCTOS_CA||[]
  },
  nuevos:Array.isArray(window.FELER_BLACK_FRIDAY)?window.FELER_BLACK_FRIDAY:[]
};
