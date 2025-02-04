function calcularImpuestos() {
  const ingreso = parseFloat(document.getElementById("ingresoMensual").value);
  const deducibles = parseFloat(document.getElementById("deducibles").value) || 0;

  if (!ingreso || ingreso <= 0) {
      document.getElementById("resultadoImpuestos").innerHTML = "<strong>Por favor, ingresa un monto válido.</strong>";
      return;
  }

  const baseDeducibles = deducibles / 1.16;
  const ingresoNeto = ingreso - baseDeducibles;

  let isr = 0;
  const tarifasMensuales = [
      { limiteInferior: 0.01, limiteSuperior: 746.04, cuota: 0, tasa: 1.92 },
      { limiteInferior: 746.05, limiteSuperior: 6332.05, cuota: 14.32, tasa: 6.4 },
      { limiteInferior: 6332.06, limiteSuperior: 11128.01, cuota: 371.83, tasa: 10.88 },
      { limiteInferior: 11128.02, limiteSuperior: 12935.82, cuota: 893.63, tasa: 16 },
      { limiteInferior: 12935.83, limiteSuperior: 15487.71, cuota: 1182.88, tasa: 17.92 },
      { limiteInferior: 15487.72, limiteSuperior: 31236.49, cuota: 1640.18, tasa: 21.36 },
      { limiteInferior: 31236.50, limiteSuperior: 49233.00, cuota: 5004.12, tasa: 23.52 },
      { limiteInferior: 49233.01, limiteSuperior: 93993.90, cuota: 9236.89, tasa: 30 },
      { limiteInferior: 93993.91, limiteSuperior: 125325.20, cuota: 22665.17, tasa: 32 },
      { limiteInferior: 125325.21, limiteSuperior: 375975.61, cuota: 32691.18, tasa: 34 },
      { limiteInferior: 375975.62, limiteSuperior: Infinity, cuota: 117912.32, tasa: 35 },
  ];

  for (const tramo of tarifasMensuales) {
      if (ingresoNeto >= tramo.limiteInferior && ingresoNeto <= tramo.limiteSuperior) {
          const excedente = ingresoNeto - tramo.limiteInferior;
          const impuestoExcedente = (excedente * tramo.tasa) / 100;
          isr = tramo.cuota + impuestoExcedente;
          break;
      }
  }

  const tasasRESICO = [
      { limite: 25000.00, tasa: 1.0 },
      { limite: 50000.00, tasa: 1.1 },
      { limite: 83333.33, tasa: 1.5 },
      { limite: 208333.33, tasa: 2.0 },
      { limite: 3500000.00, tasa: 2.5 },
  ];

  let resico = 0;
  for (const tramo of tasasRESICO) {
      if (ingreso <= tramo.limite) {
          resico = ingreso * (tramo.tasa / 100);
          break;
      }
  }

  const tasaIVA = 0.16;
  const subtotal = ingreso / 1.16;
  const ivaDelPeriodo = subtotal * tasaIVA;
  const ivaDeducible = deducibles * tasaIVA / 1.16;
  const ivaPagar = ivaDelPeriodo - ivaDeducible;

  const totalImpuestoActividadEmpresarial = isr + ivaPagar;
  const totalImpuestoRESICO = resico + ivaPagar;
  const ahorroAnual = (isr - resico) * 12;

  // Calcular Ahorro Mensual
  const ahorroMensual = totalImpuestoActividadEmpresarial - totalImpuestoRESICO;

  // Función para redondear sin decimales
  function redondear(valor) {
      return Math.round(valor); // Redondear al entero más cercano
  }

  // Asignación de valores redondeados
  document.getElementById("ingresoMensualValor").innerText = "$" + redondear(ingreso);
  document.getElementById("ingresoMensualRESICO").innerText = "$" + redondear(ingreso);
  document.getElementById("gastosMensualesValor").innerText = "$" + redondear(deducibles);
  document.getElementById("gastosMensualesRESICO").innerText = "$" + redondear(deducibles);
  document.getElementById("ivaActividadEmpresarial").innerText = "$" + redondear(ivaPagar);
  document.getElementById("ivaRESICO").innerText = "$" + redondear(ivaPagar);
  document.getElementById("isrActividadEmpresarial").innerText = "$" + redondear(isr);
  document.getElementById("isrRESICO").innerText = "$" + redondear(resico);
  document.getElementById("totalImpuestosActividadEmpresarial").innerText = "$" + redondear(totalImpuestoActividadEmpresarial);
  document.getElementById("totalImpuestosRESICO").innerText = "$" + redondear(totalImpuestoRESICO);
  document.getElementById("ahorroAnual").innerText = "Ahorro estimado anual: $" + redondear(ahorroAnual);
  document.getElementById("ahorroMensual").innerText = "Ahorro estimado mensual: $" + redondear(ahorroMensual);

  document.getElementById("comparativaImpuestos").style.display = "block";
}
