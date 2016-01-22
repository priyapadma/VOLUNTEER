require.config({
		baseUrl : "js",
		paths : {
			jquery: "plugin/jquery",
			bootstrap: "plugin/bootstrap",
			hashchange: "plugin/jquery-hashchange",
			countries: "plugin/countries.min"
		},
		shim : {
			jquery: {
				exports: "$"
			},
			bootstrap: {
				deps: ["jquery"]
			},
			hashchange:  {
				deps: ["jquery"],
				exports: "hashchange"
			},
			countries: {
				deps: ["jquery"],
				exports: "countries"
			}
		},
	    urlArgs:"p=" + (document.getElementById("requirejs").getAttribute("data-p"))
});

 require(["jquery", "bootstrap","hashchange","countries"], function($, bootstrap, hashchange,Countries){
	$('.carousel').carousel();
	$("*[data-toggle='tooltip']").tooltip({container:"body", delay: { show: 750, hide: 100 }});
	
	/**
	 * Click event to show/hide the search box
	  ---------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on("click", function(){
	  var tktpopover = $('.searchInputBox').is(':visible');
	  if(tktpopover == false){
		$("#searchTxtInptdiv").animate({width: "0px"},{complete: function() {
        	$("#searchTxtInptdiv").addClass("hide");
			$("#searchEnable").removeClass("hide");
		}});
	 }
	});

	/**
	 * Click event to search box
	  ---------------------------------------------------------------------------------------------------------------------------------------------------*/
	$("#searchEnable").on("click",function(event){
		event.stopPropagation();
        $("#searchTxtInptdiv").css("width","0px");
		$("#searchEnable").addClass("hide");
		$("#searchTxtInptdiv").removeClass("hide");   
		$("#searchTxtInptdiv").animate({width: '+=207px'});	
	})

	$(document).on("click","#searchTxtInptdiv", function(event){
		event.stopPropagation();
	});

	/**
	 * Click event to submit volunteer form
	  ---------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on("click","#volunteerFormSub",function(event){
	var isValidForm = checkIsValidForm();
	if(isValidForm){
		$("#voluteerForm").submit();
		console.log("---Submitted Values---"+$("#voluteerForm").serialize());
		}
	});

	/**
	 * Method to validate the form values
	  ---------------------------------------------------------------------------------------------------------------------------------------------------*/
	function checkIsValidForm(){
		var isValid = true;
		$(".form-group").removeClass("has-error");
		$(".help-block").addClass("hide");
		if($("#fstName").val()==""){
			$("#fstName").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		else if(!isVaildName($("#fstName").val())){
			$("#fstName").closest(".form-group").addClass("has-error").find(".help-block").text("Please Enter Valid Name").removeClass("hide");
			isValid = false;
		}
		else if($("#email").val()==""){
			$("#email").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		else if(!isValidEmail($("#email").val())){
			$("#email").closest(".form-group").addClass("has-error").find(".help-block").text("Please Enter Valid Email Address").removeClass("hide");
			isValid = false;
		}
		else if($("#mobile").val()==""){
			$("#mobile").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		else if(!isPhoneNumber($("#mobile").val())){
			$("#mobile").closest(".form-group").addClass("has-error").find(".help-block").text("Please Enter Valid Mobile Number").removeClass("hide");
			isValid = false;
		}
		else if(!$(".gender").is(":checked")){
			$(".gender").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		else if(!$(".interest").is(":checked")){
			$(".interestGrp").addClass("has-error").removeClass("hide");
			isValid = false;
		}
		else if($("#vlnCountrySel").val()==-1){
			$("#vlnCountrySel").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		else if($("#vlnStateSel").val()==""){
			$("#vlnStateSel").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		else if($("#address").val()==""){
			$("#address").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		else if($("#city").val()==""){
			$("#city").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		else if($("#zipCode").val()==""){
			$("#zipCode").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		else if($("#comment").val()==""){
			$("#comment").closest(".form-group").addClass("has-error").find(".help-block").removeClass("hide");
			isValid = false;
		}
		return isValid;
	}

	/**
	 * To show/hide the pages
	  ---------------------------------------------------------------------------------------------------------------------------------------------------*/
	if(window.top.location.href="demo.html#volunteer"){
		$(".navHead").removeClass("active");
		$(".navHead[data-type='volunteer']").addClass("active");
		$("#commonDiv").removeClass("hide");
		populateCountries("vlnCountrySel", "vlnStateSel");
		$("#volunteerBody").removeClass("hide");
	}
	else if(window.top.location.href="demo.html#home"){
		$(".navHead").removeClass("active");
		$("#commonDiv").removeClass("hide");
		$(".navHead[data-type='home']").addClass("active");
	}
	else if(window.top.location.href="demo.html#aboutus"){
		$(".navHead").removeClass("active");
		$("#commonDiv").removeClass("hide");
		$(".navHead[data-type='aboutus']").addClass("active");
	}
	else if(window.top.location.href="demo.html#contact"){
		$("#commonDiv").addClass("hide");
		$(".navHead").removeClass("active");
		$("#contactBody").removeClass("hide");
		$(".navHead[data-type='contact']").addClass("active");
	}

	$(window).hashchange([
	 {
		hash:"volunteer",
		regex: true,
		onSet: function(hash){
			$(".navHead").removeClass("active");
			$("#commonDiv,#volunteerBody").removeClass("hide");
			populateCountries("vlnCountrySel", "vlnStateSel");
			$(".navHead[data-type='volunteer']").addClass("active");
		},
		onRemove: function()
		{
			$(".form-group").removeClass("has-error");
			$(".help-block").addClass("hide");
			$("#volunteerBody").addClass("hide");
			$(".navHead[data-type='volunteer']").removeClass("active");
		}
	 },
	 {
		hash:"home",
		regex: true,
		onSet: function(hash){
			$(".navHead").removeClass("active");
			$("#commonDiv").removeClass("hide");
			$(".navHead[data-type='home']").addClass("active");
		},
		onRemove: function()
		{
			$(".navHead[data-type='home']").removeClass("active");
		},
	 },
	 {
		hash:"aboutus",
		regex: true,
		onSet: function(hash){
			$(".navHead").removeClass("active");
			$("#commonDiv").removeClass("hide");
			$(".navHead[data-type='aboutus']").addClass("active");
		},
		onRemove: function()
		{
			$(".navHead[data-type='aboutus']").removeClass("active");
		},
	 },
	 {
		hash:"contact",
		regex: true,
		onSet: function(hash){
			$(".navHead").removeClass("active");
			$("#commonDiv").addClass("hide");
			$("#contactBody").removeClass("hide");
			$(".navHead[data-type='contact']").addClass("active");
		},
		onRemove: function()
		{
			$(".form-group").removeClass("has-error");
			$(".help-block").addClass("hide");
			$("#contactBody").addClass("hide");
			$(".navHead[data-type='contact']").removeClass("active");
		},
	 }
	]);

	/**
	 * To check whether the given email is valid one or not
	 ---------------------------------------------------------------------------------------------------------------------------------------------------*/
	function isValidEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}

	/**
	 * To test whether the given string has any special characters or not
	 ---------------------------------------------------------------------------------------------------------------------------------------------------*/
	function isVaildName(name)
	{
		if(emptyNullToString(name, "") != "")
		{
			return /^[a-zA-Z0-9- ]*$/.test(name);
		}
		else
		{
			return false
		}
	}

	/**
     * To check for the valid phone number using the regular expression
     ------------------------------------------------------------------------------------------------------------------------------------------------*/
	 function isPhoneNumber(number) {
		var regex = /^[0-9()+ -]*$/;
		return regex.test(number);
	    }

	/**
     * To Convert the empty or null string to given string
     -----------------------------------------------------------------------------------------------------------------------------------------------*/
	 function emptyNullToString(stringToCheck, charToReturn) {
	    	try
	    	{
	    		if (stringToCheck == null || stringToCheck.toLowerCase() == 'null' || stringToCheck.trim() == "" 
	    			|| stringToCheck == "undefined" || stringToCheck == undefined)
	    		{
	    			stringToCheck = charToReturn;
	    		}
	    	}
	    	catch (e)
	    	{
	    		stringToCheck = charToReturn;
	    	}
	    	return stringToCheck;
	    }
	
 
});