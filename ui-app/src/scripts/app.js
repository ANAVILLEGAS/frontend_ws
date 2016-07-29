//El argumento de una función es una variable interna definida.

/*Patrón módulo*/
(

function (exportCheckout){
	var checkout={};
	checkout.pagar=function(){ console.log("test console"); window.alert("test alert");};
	checkout.paymentMethods=["VISA","AMEX","MASTER"]; // si lo genero asi me lo podrían sobre escribir, mejor ponerlo privado
	exportCheckout.cho1=checkout;
}

(this));


/*Patrón módulo + single var pattern*/
(

function (exportCheckout){
	var checkout={}, _payment_methods=["VISA","AMEX","MASTER"];
	
	checkout.pay=function(){ console.log("test console"); window.alert("test alert");};
	checkout.getPaymentMethods=function(){return _payment_methods;};
	
	exportCheckout.cho2=checkout;

}(this));



/* namespace */
(
function (exports, namespace){
	var mp=namespace || {};
	exports.mp=mp;

}(this, this.mp));

(
function (exports, namespace){
	var checkout={}, _payment_methods=["VISA","AMEX","MASTER"];
	
	checkout.pay=function(){ console.log("test console"); window.alert("test alert");};
	checkout.getPaymentMethods=function(){return _payment_methods;};
	
	namespace.cho3=checkout;

}(this, mp));

(
function (exports, namespace){
	var mp_front={}, _movements=["1","2","3"];
	
	mp_front.getMovements=function(){return _movements;};
	
	namespace.mp_front=mp_front;

}(this, mp));

//otro
(
function (namespace, exports){
	var mp_front2={}, 
		_movements=["1","2","3"],
		_envios=exports.me,
		_ap=exports.ap,
		_cho=namespace.cho3;
	
	mp_front2.getEnvios=function(){return _envios;};
	
	namespace.mp_front2=mp_front2;

}(this.mp, this));

// Operation recibe parametro de tipo
// 3 metodos execute, cancel, refund
// tipo es de la instancia, getType()

function Operation (type){
	this.type = type;

	this.getType = function(){
		return type;
	}

	this.execute = function(){
		console.log(this.type + " execute");
	}

	this.cancel = function (){
		console.log(this.type + " cancel");
	}

	this.refund =function(){
		console.log(this.type + " refund");
	}
}

Operation.prototype.approve = function(){
		console.log(this.type + " approve");
}


var operation1= new Operation("1");
var operation2= new Operation("2");


// Inserto hijos
// var ul = document.createElement("ul"); 
// ul.innerHTML="02 de abril"

// var itemsArray=["Item 1","Item 3","Item 3"];
// itemsArray.forEach(function(entry) {
//   var li = document.createElement("li");   
//   var text = document.createTextNode(entry);   
//   li.appendChild(text);   
//   ul.appendChild(li);     
                        
// }, this);

// document.body.appendChild(ul); 

(
function (exports){
	var operationsSection=document.querySelector('#operation-list');


	var operationData= {};
	operationData['day']='02 de abril';

	var operation1={};
	operation1['type']='Envío de Dinero';
	operation1['amount']='100';
	operation1['status']='approved';
	operation1['description']='Pepe';

	var operation2={};
	operation2['type']='Pago de Artículo';
	operation2['amount']='200';
	operation2['status']='rejected';
	operation2['description']='Zapatillas';

	operationData['operation_list']=[operation1,operation2];

	var data =[operationData];


	data.forEach(function(entry) {
	   
	   /*Add section*/
	   var section = document.createElement("section");   
	   section.classList.add('operations-day');
	   
	   /*Add day tittle*/
	   var tittle = document.createElement("h2");   
	   tittle.innerHTML=entry.day;
	   section.appendChild(tittle)

	   /*Add operation list*/
	   var operations=entry.operation_list;
	   

	   operations.forEach(function(operationEntry) {

	   		var article = document.createElement("article");   
	   		article.classList.add('operation')

	   		/*checkbox*/
	   		var inputCheckbox = document.createElement("input"); 
	   		inputCheckbox.type="checkbox" ;
	   		inputCheckbox.classList.add("input-checkbox");
	   		article.appendChild(inputCheckbox);
	   		
	   		/*div operation-type*/
	   		var divOT = document.createElement("div"); 
	   		divOT.classList.add('operation-type');
	   		divOT.innerHTML=operationEntry.type;
	   		article.appendChild(divOT);

	   		/*div operation-status*/
	   		var divSt = document.createElement("div"); 
	   		divSt.classList.add('operation-status');
	   		divSt.innerHTML=operationEntry.status;
	   		article.appendChild(divSt);

	   		/*div operation-amount*/
	   		var divAmount = document.createElement("div"); 
	   		divAmount.classList.add('operation-amount');
	   		divAmount.innerHTML=operationEntry.amount;
	   		article.appendChild(divAmount);

	   		/*div operation-description*/
	   		var divDesc = document.createElement("div"); 
	   		divDesc.classList.add('operation-description');
	   		divDesc.innerHTML=operationEntry.description;
	   		article.appendChild(divDesc);

	   		section.appendChild(article);      
	   });

	             
	   /* operationsSection.appendChild(section); */
	   operationsSection.insertAdjacentHTML('beforeend', section.outerHTML);
	});

	/*ver de usar query selector*/

	operationsSection.insertAdjacentHTML('beforeend', '<section class="operations-day"> <h2>01 de mayo</h2> <article  class="operation"> <input type="checkbox" class="input-checkbox"> <div class="operation-type">Envío de dinero</div><div class="operation-amount">500</div><div class="operation-status">rejected</div><div class="operation-description">Cumpleaños</div></article></section>');

}(this.document));



document.querySelectorAll('#archivar').forEach(function(buttonElement){
	buttonElement.addEventListener('click',function(e){
		var checkboxes=document.querySelectorAll('.input-checkbox');
		checkboxes.forEach(function(i){
			if (i.checked) {
				var parent=i.parentNode;
				var parentBis=parent.parentNode;
				parentBis.removeChild(parent);

				if (parentBis.querySelectorAll('.input-checkbox').length == 0 ){
					var parentBisBis=parentBis.parentNode;
					parentBisBis.removeChild(parentBis);
				}

				var checkbox=parent.querySelector('.input-checkbox');
				parent.removeChild(checkbox);

				var archivedSection=document.querySelector('#archive-operation-section');
				if (archivedSection==null){
					document.body.insertAdjacentHTML('beforeend', "<div class=\"archived-div\"><h2 class=\"archive-tittle\">Listado de Operaciones Archivadas</h2><div class=\"archive-operations-div\" ><section class=\"operation-list\" id=\"archive-operation-section\"> </section>  </div></div>");
					archivedSection=document.querySelector('#archive-operation-section');

				}
				parent.classList.add('archive')
				archivedSection.insertAdjacentHTML('beforeend',parent.outerHTML);

			}
		});
		
	});
});

document.querySelectorAll('#borrar').forEach(function(buttonElement){
	buttonElement.addEventListener('click',function(e){
		var checkboxes=document.querySelectorAll('.input-checkbox');
		checkboxes.forEach(function(i){
			if (i.checked) {
				var parent=i.parentNode;
				var parentBis=parent.parentNode;
				parentBis.removeChild(parent);

				if (parentBis.querySelectorAll('.input-checkbox').length == 0 ){
					var parentBisBis=parentBis.parentNode;
					parentBisBis.removeChild(parentBis);
				}


			}
		});
		
	});
});



