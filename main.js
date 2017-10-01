//Obtener el campo de datos
function obtenerDatos() {
  return {
    info: document.getElementById('result').value
  };
};
//Genera un objeto Blob con los datos en un archivo TXT
function generarTexto(datos) {
  var texto = [];
  texto.push('Datos Guardados:\n');
  texto.push('Info: ');
  texto.push(datos.info);
  return new Blob(texto, {
    type: 'text/plain'
  });
};

function descargarArchivo(contenidoEnBlob, nombreArchivo) {
  //creamos un FileReader para leer el Blob
  var reader = new FileReader();
  //Definimos la función que manejará el archivo
  //una vez haya terminado de leerlo
  reader.onload = function (event) {
    //Usaremos un link para iniciar la descarga
    var save = document.createElement('a');
    save.href = event.target.result;
    save.target = '_blank';
    //Truco: así le damos el nombre al archivo
    save.download = nombreArchivo || 'archivo.txt';
    var clicEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    //Simulamos un clic del usuario
    //no es necesario agregar el link al DOM.
    save.dispatchEvent(clicEvent);
    //Y liberamos recursos...
    (window.URL || window.webkitURL).revokeObjectURL(save.href);
  };
  //Leemos el blob y esperamos a que dispare el evento "load"
  reader.readAsDataURL(contenidoEnBlob);
};
function calcularDiaSemana( x_nMonth, x_nDay, x_nYear) {

	if(x_nMonth >= 3){	
		x_nMonth -= 2;
	}
	else {
		x_nMonth += 10;
	}

	if( (x_nMonth == 11) || (x_nMonth == 12) ){
		x_nYear--;
	}

	var nCentNum = parseInt(x_nYear / 100);
	var nDYearNum = x_nYear % 100;

	var g = parseInt(2.6 * x_nMonth - .2);

	g +=  parseInt(x_nDay + nDYearNum);
	g += nDYearNum / 4;	
	g = parseInt(g);
	g += parseInt(nCentNum / 4);
	g -= parseInt(2 * nCentNum);
	g %= 7;
	
	if(x_nYear >= 1700 && x_nYear <= 1751) {
		g -= 3;
	}
	else {
		if(x_nYear <= 1699) {
			g -= 4;
		}
	}
	
	if(g < 0){
		g += 7;
	}
	var r;
	if(g == 0) {
		r = "Domingo";
	}
	else if(g == 1) {
		r = "Lunes";
	}
	else if(g == 2) {
		r = "Martes";
	}
	else if(g == 3) {
		r = "Miércoles";
	}
	else if(g == 4) {
		r = "Jueves";
	}
	else if(g == 5) {
		r = "Viernes";
	}
	else if(g == 6) {
		r = "Sábado";
	}
	return r;
}

function calcularEdad(x_nMonth, x_nDay, x_nYear) {
	var fs = new Date();
	
	var a = fs.getFullYear() - x_nYear; //diferencia annos
	var b = fs.getMonth() - x_nMonth +1; //diferencia mes
	var c = fs.getDate() - x_nDay; //diferencia dia
	
	if( b == 0 && c < 0) {
	    a = a-1;
	    b = 12;
	}
	else if (b < 0) { //si aun no hemos llegado al mes del cumpleaños, restamos un año al cumpleaños, y calculamos el mes en el que estamos
		a = a -1;
		b = 12 + b;
	}
	if (c < 0) { //si el día actual, es menor al dia del cumpleaños, le restamos 1 al mes
		b = b - 1;
		switch (fs.getMonth()) {
			case 2:
				var anno = fs.getFullYear();
				if ((anno % 4 == 0) && ((anno % 100 != 0) || (anno % 400 == 0)))
					c = 29 + c;
				else
					c = 28 + c;
				break;
			case 4:
			case 6:
			case 9:
			case 10:
			case 11: c = 30 + c;
				break;
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 12: c = 31 + c;
				break;
		}
	}
	var resultado = "Tienes " + a + " años, " + b + " meses y " + c + " dias "; 
	
	return resultado;
}
function calcularAnno(x_nMonth, x_nDay, x_nYear) {
  var resultado;
  var fs = new Date();
  if((x_nMonth < fs.getMonth()+1) || ((x_nMonth == fs.getMonth()+1) && (x_nDay < fs.getDate()))) {
    resultado = "2015"+"-"+x_nMonth+"-"+x_nDay+" 00:00:00";
  }
  else {
    resultado = "2014"+"-"+x_nMonth+"-"+x_nDay+" 00:00:00";
  }
  return resultado;
}

$(document).ready(function () {
  $("#botonCalcular").click(function () {
    try {
      var parseado = jFecha.parse($("#entrada").val());
      var separado = parseado[0].split(" ");
      var resultado1 = calcularDiaSemana(parseInt(separado[1]), parseInt(separado[0]), parseInt(separado[2]));
      var resultado2 = calcularEdad(parseInt(separado[1]), parseInt(separado[0]), parseInt(separado[2]));
      $("#result").val(resultado2 + "y naciste un "+resultado1);
      $("#DateCountdown").remove();
      $("body").append('<center> <div id="DateCountdown" data-date="" style="width: 80%;"></div> </center>');
      console.log(calcularAnno(separado[1], separado[0], separado[2]));
      $("#DateCountdown").attr("data-date", calcularAnno(separado[1], separado[0], separado[2])); 
      $("#DateCountdown").TimeCircles({
	"animation": "smooth",
	"bg_width": 0.3,
	"fg_width": 0.03333333333333333,
	"circle_bg_color": "#60686F",
	"time": {
	    "Days": {
		"text": "Días",
		"color": "#FFCC66",
		"show": true
	    },
	    "Hours": {
		"text": "Horas",
		"color": "#99CCFF",
		"show": true
	    },
	    "Minutes": {
		"text": "Minutos",
		"color": "#BBFFBB",
		"show": true
	    },
	    "Seconds": {
		"text": "Segundos",
		"color": "#FF9999",
		"show": true
	    }
	}
    });
    } catch (e) {
      $("#result").html(String(e));
    }
  });
  
  document.getElementById('botonGuardar').addEventListener('click', function () {
  var datos = obtenerDatos();
  descargarArchivo(generarTexto(datos), 'archivo.txt');
}, false);
  
});
