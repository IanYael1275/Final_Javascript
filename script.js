var balance = 23000;
var totalIngresos = 0;
var totalEgresos = 0;

function registrarOperacion() {
    var tipoOperacion = document.getElementById("tipoOperacion").value;
    var nombreActividad = document.getElementById("nombreActividad").value;
    var monto = parseFloat(document.getElementById("montoInput").value);

    if (!isNaN(monto)) {
        if (tipoOperacion === "ingreso") {
            balance += monto;
            totalIngresos += monto;
            mostrarRegistroActividades(nombreActividad, monto, "registroIngresos");
        } else if (tipoOperacion === "egreso") {
            balance -= monto;
            totalEgresos += monto;
            mostrarRegistroActividades(nombreActividad, monto, "registroEgresos");
        }

        actualizarBalance();
        agregarBotonEliminar(nombreActividad, monto, tipoOperacion);
        actualizarTotales(); 
    } else {
        alert("Por favor, rellene los espacios correspondientes.");
    }
}

function mostrarRegistroActividades(nombreActividad, monto, listaId) {
    var registroActividades = document.getElementById(listaId);
    var listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${nombreActividad}:</strong> $${monto.toLocaleString('es-ES')}`;
    registroActividades.appendChild(listItem);
}

function agregarBotonEliminar(nombreActividad, monto, tipoOperacion) {
    var registroActividadesId = (tipoOperacion === "ingreso") ? "registroIngresos" : "registroEgresos";
    var registroActividades = document.getElementById(registroActividadesId);

    
    var existeActividad = Array.from(registroActividades.children).some(item => item.textContent.includes(nombreActividad));

    if (!existeActividad) {
        var listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${nombreActividad}:</strong> $${monto.toLocaleString('es-ES')} <button onclick="eliminarOperacion('${nombreActividad}', ${monto}, '${tipoOperacion}', '${registroActividadesId}')">Eliminar</button>`;
        registroActividades.appendChild(listItem);
    }
}

function eliminarOperacion(nombreActividad, monto, tipoOperacion, registroActividadesId) {
    if (tipoOperacion === "ingreso") {
        balance -= monto;
        totalIngresos -= monto;
    } else if (tipoOperacion === "egreso") {
        balance += monto;
        totalEgresos -= monto;
    }

    actualizarBalance();
    actualizarTotales();

    var registroActividades = document.getElementById(registroActividadesId);
    var listItem = registroActividades.querySelector(`li:contains(${nombreActividad})`);
    
    if (listItem) {
        registroActividades.removeChild(listItem);
    }
}

function actualizarTotales() {
    document.getElementById("totalIngresos").innerText = totalIngresos.toLocaleString('es-ES');
    document.getElementById("totalEgresos").innerText = totalEgresos.toLocaleString('es-ES');
}

function actualizarBalance() {
    document.getElementById("balance").innerText = `Presupuesto: $${balance.toLocaleString('es-ES')}`;
}
